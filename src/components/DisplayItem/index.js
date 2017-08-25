import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DisplayItemActions from './actions';
import utils,{makeHumanDate} from '../../utils';
import copy from 'copy-to-clipboard';
import Checkbox from '../Checkbox';
import Lightbox from 'react-images';

const noImageAvailable = 'http://declangourley.com/wp-content/themes/fusion/img/no-image.png';

class DisplayItem extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)

        this.state ={
            imgIsOpen : false,
            currentImage : 0
        };
    }

    onLinkClick(e){
        // Prevent linking when the copy icon is clicked
        if(e.target.classList.contains('dl__featuredImg')){
            e.preventDefault();
        }
    }

    onChecked(e){
        const {updateWorkspace,item,config,workspaceItems} = this.props,
              state = e.target.checked,
              workspaceAction = state ? 'add' : 'remove';

        if(state){
            updateWorkspace({
                Item: config.hooks.onCheck({item,workspaceItems}),
                workspaceAction
            });
        }else{
            updateWorkspace({
                Item:config.hooks.onUnCheck({item,workspaceItems}),
                workspaceAction
            });
        }
    }

    onAddToWatchlistClick(e){
        e.preventDefault();
    }

    onAddToCartClick(e){
        e.preventDefault();
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

    renderHTMLTitle(html){
        return (<span dangerouslySetInnerHTML={{__html: html}} title={html}></span>);
    }

    //@todo when We get time, clean up this code. It was rushed.
    makeDisplayItem(item,selectedView,props){
        const languageFlag = item.languageLabel ? (<span className={`dl__displayItemFlag flag flag-us`}> </span>) : '',
            language = item.languageLabel ? (<p ><span className="dl__displayItem--label">Language {languageFlag}</span></p>) : '',
            check = selectedView.enableRowChecks ? (
              <span style={{width:'33px'}} className="dl__displayItemCheck">
                <Checkbox onChecked={this.onChecked.bind(this)} id={item[selectedView.itemIdProp]}> </Checkbox>
            </span>) : '',
            cast = (item.cast && item.cast.length > 0) ? (<p><span className="dl__displayItem--label">Starring: </span> <span className="dl__displayItem--link">{item.cast.toString()}</span></p>) : '',
            director = (item.director && item.director.length > 0) ? (<p><span className="dl__displayItem--label">Directed By: </span> <span className="dl__displayItem--link">{item.director.toString()}</span></p>) : '',
            seasons = item.entityType === 'olyplat-entity-series' ? (<p style={{fontSize:'18px'}}>Seasons: 1 - 3</p>) : (<span style={{height:'21px', display:'inline-block'}}> </span>),

            etProp = props.filter(prop=>prop.key === 'entityType'),
            etPropHooked = etProp ? etProp[0].before(item.entityType) : false,
            entityType = etPropHooked ?  etPropHooked.charAt(0).toUpperCase() + etPropHooked.slice(1) : '',//COnnect to the prop hook in the view props

            artwork = item.assets && item.assets.artwork.length > 0 ? item.assets.artwork[0].url  : false,
            still = item.assets && item.assets.still.length > 0 ? item.assets.still[0].url  : false,
            featuredImage = artwork ? artwork : ( still ? still : noImageAvailable),
            featuredImageDisplayClass = artwork ? 'dl__featuredImg dl__imgMaxWidth' : 'dl__featuredImg',
            lightboxImages = this.makeLightboxImages(item);

        return (<div className="dl__displayItemInner">
                    <div className="dl__displayItemImgWrapper">
                        {check}
                        <span className="dl__featuredImgWrapper">
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
                    <div>
                        <div className="dl__displayItemInnerCol">
                            <h2 >{this.renderHTMLTitle(item.title)}</h2>
                            <h3>Olympusat</h3>

                            <div className="dl__displayItemMetaGroup">
                                <p><span className="dl__displayItem--label">{item.primaryGenreLabel}</span></p>
                                <p><span className="dl__displayItem--label">Rating: </span> <span className="dl__displayItem--link">PG-TV</span></p>
                            </div>
                            <div className="dl__displayItemMetaGroup">
                                {language}
                                {/*<p><span className="dl__displayItem--label">Subtitles <img className="dl__displayItemFlag" src="/lib/images/flag_icons/gif/us.gif" alt="English"/></span></p>*/}
                                <p><span className="dl__displayItem--label">Subtitles <span className={`dl__displayItemFlag flag flag-us`}> </span></span></p>
                                {/*<p><span className="dl__displayItem--label">Subtitles <img className="dl__displayItemFlag" src="#" alt="English"/></span></p>*/}
                            </div>
                        </div>
                        <div className="dl__displayItemInnerCol">
                            <div className="dl__displayItem--pinBottom">
                                <p style={{fontSize:'18px'}}>{entityType}</p>
                                <p style={{fontSize:'16px',color: '#cdcccd',lineHeight: '0.7',padding:'5px 0'}}>{item.year}{languageFlag} <span style={{color: '#333',paddingLeft:'9px',fontWeight:'700'}}>HD</span></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="dl__displayItemMetaGroup">
                            {cast}
                            {director}

                            <div className="dl__displayItem--pinBottom">
                                {seasons}
                                <form>
                                    <button onClick={this.onAddToWatchlistClick} style={{marginRight: '9px'}} className="dl__displayItemButton dl__displayItemButton--stripe">Add to Watchlist</button>
                                    <button onClick={this.onAddToCartClick} className="dl__displayItemButton">Add to Cart</button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>);
    }

    render() {
        const {item,selectedView} = this.props;
        const props = selectedView.props,
              displayItem = this.makeDisplayItem(item,selectedView,props);

        return (
            <div className="dl__displayItem">
                <a target={selectedView.link.target} href={selectedView.link.row(item)} onClick={this.onLinkClick.bind(this)}>
                    {displayItem}
                </a>
            </div>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        workspaceItems : state.app.workspaceItems,
        force: state.app.force,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(DisplayItemActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayItem);

/**
 props.map(prop=>{
                            const id = item[prop.idKey],
                                  val = item[prop.key],
                                  hookedVal = prop.hasOwnProperty('before') ? prop.before(val) : val,
                                  parsedVal = prop.isDate ? makeHumanDate(hookedVal) : this.renderHTML(hookedVal),
                                  copyIcon = prop.hasCopy ? (<span className="dl__textItem-item--copy" onClick={this.copyToClipboard.bind(this,parsedVal)}> </span>) : '';

                            if(prop.display){
                                return (<span key={prop.key} data-id={id} style={{width:prop.width}} className="dl__textItem-item" >{copyIcon}{parsedVal}</span>);
                            }
                        })
 **/