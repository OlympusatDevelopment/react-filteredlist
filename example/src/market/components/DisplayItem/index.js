import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DisplayItemActions from './actions';
import utils from '../../_utils';

import copy from 'copy-to-clipboard';
import Lightbox from 'react-images';

const noImageAvailable = 'http://image.ibb.co/bPUTDQ/no_image.png';
const flagSprite = 'http://ibb.co/dj0of5';// used in flags.scss

class DisplayItem extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)

        this.state ={
            imgIsOpen : false,
            currentImage : 0
        };
    }

    onItemClick(e){
        const classList = e.target.classList;

        console.log('CLICK',e, e.target, classList);
        //href={selectedView.link.row(item)} target={selectedView.link.target}  
        if(classList.contains('ms__displayItemImgWrapper') || classList.contains('ms__displayItemButton')){
            e.preventDefault();
        }
    }

    makeLightboxImages(item){
        let images = [];

        if(item.assets && item.assets.artwork.length > 0){
            images.push(...item.assets.artwork.map(art=>{return {src:art.url,caption:art.filename};}));
        }

        if(item.assets && item.assets.still.length > 0){
            images.push(...item.assets.still.map(art=>{return {src:art.url,caption:art.filename};}));
        }

        if(item.assets && item.assets.video.length > 0){
            images.push(...item.assets.video.map(art=>{return {src:art.url,caption:art.filename};}));
        }

        if(images.length === 0){
            //images = [{src:require(`/lib/images/no-image-available.png`)}];
            images = [{src:'#'}];
        }

        return images.filter(img=>typeof img.src !== 'undefined');
    }

    renderHTMLTitle(html,seasons){
        return (<span><span dangerouslySetInnerHTML={{__html: html}} title={html}></span></span>);
    }

    makeSubhead(item){
        let str = '';

        if(item.year){
            str = decidePiping(str,item.year)
        }

        if(item.primaryGenreLabel){
            str += str = decidePiping(str,item.primaryGenreLabel)
        }

        if(true){
            str += str = decidePiping(str,'HD');
        }

        // Pipe logic
        function decidePiping(str, val){
            return str.length > 0 ? ` | ${val}` : val;
        }

        return str;
    }

    onMakeOfferClick(e,item){
        e.preventDefault();
       console.log('Send update to make offer on an item',item);
    }

    onAddToWatchlistClick(e,item){
        e.preventDefault();
       console.log('Send update to add item to watchlist',item);
    }

    render() {
        const {item,selectedView} = this.props;
        const self = this,
            props = selectedView.props;

        const languageFlag = item.languageLabel ? (<span className={`ms__displayItemFlag flag flag-us`}> </span>) : '',
            language = item.languageLabel ? (<p ><span className="ms__displayItem--label">Language {languageFlag}</span></p>) : '',

            // cast = (item.cast && item.cast.length > 0) ? (<p><span className="ms__displayItem--label">Starring: </span> <span className="ms__displayItem--link">{item.cast.toString()}</span></p>) : '',
            // director = (item.director && item.director.length > 0) ? (<p><span className="ms__displayItem--label">Directed By: </span> <span className="ms__displayItem--link">{item.director.toString()}</span></p>) : '',
            // seasons = item.entityType === 'olyplat-entity-series' ? (<p style={{fontSize:'18px'}}>Seasons: 1 - 3</p>) : (<span style={{height:'21px', display:'inline-block'}}> </span>),
            seasons = item.entityType === 'olyplat-entity-series' ? 'Seasons: 1 - 3' : '',

            // entityType
            etProp = props.filter(prop=>prop.key === 'entityType'),
            etPropHooked = etProp ? etProp[0].before(item.entityType) : false,
            entityType = etPropHooked ?  etPropHooked.charAt(0).toUpperCase() + etPropHooked.slice(1) : '',//COnnect to the prop hook in the view props

            //images
            artwork = item.assets && item.assets.artwork.length > 0 ? item.assets.artwork[0].url  : false,
            still = item.assets && item.assets.still.length > 0 ? item.assets.still[0].url  : false,
            featuredImage = artwork ? artwork : ( still ? still : noImageAvailable),
            featuredImageDisplayClass = artwork ? 'ms__featuredImg ms__imgMaxWidth' : 'ms__featuredImg',

            // Better entity type image logic
            // featuredImage = (entityType.toLowerCase() === 'movie' ? artwork : still) ||  noImageAvailable,
            // featuredImageDisplayClass = entityType.toLowerCase() === 'movie' ? 'ms__featuredImg ms__imgMaxWidth' : 'ms__featuredImg',
            lightboxImages = this.makeLightboxImages(item),
            subhead = this.makeSubhead(item);
// console.log('ITEM', item)

        return (
            <div className="ms__displayItem">
                <div className="ms__displayItemInner">
                    <div className="ms__displayItemImgWrapper">
                                <span className="ms__featuredImgWrapper">
                                    <img onClick={() => this.setState({imgIsOpen:true,currentImage:0})} className={featuredImageDisplayClass} src={featuredImage} alt={item.title}/>
                                </span>
                        {featuredImage !== noImageAvailable && this.state.imgIsOpen && selectedView.enableGalleryLightbox &&
                        <Lightbox
                            images={lightboxImages}
                            isOpen={this.state.imgIsOpen}
                            onClickPrev={() => this.setState({currentImage:this.state.currentImage-1 < 0 ? lightboxImages.length-1 : this.state.currentImage-1})}
                            onClickNext={() => this.setState({currentImage:this.state.currentImage+1 > lightboxImages.length-1 ? 0 : this.state.currentImage+1})}
                            currentImage={this.state.currentImage}
                            onClose={()=>{
                                            // component has a bug that leaves overflow hidden on the body tag after close, preventing scroll. This is the fix
                                            document.getElementsByTagName("body")[0].style={};
                                            return this.setState({ imgIsOpen: false })
                                        }}
                            backdropClosesModal={true}
                            theme={{
                                container:{
                                    background: 'rgba(255,255,255,0.95)'
                                },
                                arrow:{
                                    fill:'#000'
                                },
                                close:{
                                    fill:'#000'
                                }
                            }}
                        />
                        }
                    </div>
                    <a href={selectedView.link.row(item)} target={selectedView.link.target} onClick={e=>self.onItemClick.bind(self,e)}> 
                        <div className="ms__displayItemInnerCol">
                            <h2 >{this.renderHTMLTitle(item.title,seasons)} <span className='ms__titleAddon'>{seasons}</span></h2>
                            <h3>{subhead}</h3>

                            <div className="ms__displayItemMetaGroup">
                                
                            </div>
                            <div className="ms__displayItemMetaGroup">
                                <p><span className="ms__displayItem--label">Rating: </span> <span className="ms__displayItem--bold">PG-TV</span></p>
                                {language}
                                {/*<p><span className="ms__displayItem--label">Subtitles <img className="ms__displayItemFlag" src="/lib/images/flag_icons/gif/us.gif" alt="English"/></span></p>*/}
                                <p><span className="ms__displayItem--label">Subtitles <span className={`ms__displayItemFlag flag flag-us`}> </span></span></p>
                                {/*<p><span className="ms__displayItem--label">Subtitles <img className="ms__displayItemFlag" src="#" alt="English"/></span></p>*/}
                            </div>
                        </div>
                        <div className="ms__displayItemInnerCol">
                            <div className="ms__displayItem--pinBottom">
                                {/*<p style={{fontSize:'18px'}}>{entityType}</p>*/}
                            </div>
                        </div>
                    </a>
                    <a href={selectedView.link.row(item)} target={selectedView.link.target} onClick={e=>self.onItemClick(e)}>
                        <div className="ms__displayItemMetaGroup">
                            <p><span className="ms__displayItem--label">Added <span> {utils.convertUNIXToHumanDate(item.entityCreated,true)}</span></span></p>

                            <div className="ms__displayItem--pinBottom">
                                <button onClick={e=>self.onAddToWatchlistClick(e,item)} className="ms__displayItemButton ms__displayItemButton--black">Add to Watchlist</button>  
                                <button onClick={e=>self.onMakeOfferClick(e,item)} className="ms__displayItemButton ms__displayItemButton--black">Make Offer</button>  
                            </div>
                        </div>
                    </a>
                </div>
            </div>);
    }
}

export default DisplayItem;