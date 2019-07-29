import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TextItemActions from './actions';
import utils, {makeHumanDate} from '../../utils';
import { makeCssGridLayout } from "src/utils/helpers";
import copy from 'copy-to-clipboard';
import Checkbox from '../Checkbox';
import Lightbox from 'react-images';

class TextItem extends Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		
		this.state ={
			imgIsOpen : false,
			currentImage : 0,
			imgError: false
		};
		
		this.copyToClipboard = this.copyToClipboard.bind(this);
		this._highlightSearchTerm = this._highlightSearchTerm.bind(this);
	}
	
	copyToClipboard(val) {
		copy(val);
		
		this.props.config.notify(`Copied ${val} to the clipboard`, 'success', 'br');
	}
	
	onLinkClick(e) {
		e.stopPropagation();
		const {selectedView, item, config} = this.props;
		const link = selectedView.link;
		const tagName =  e.target.tagName.toLowerCase();
		const enabledLightbox = selectedView.enableGalleryLightbox;
		const routePath = link.row && link.row(item) || '/';
		
		// Prevent linking when the copy icon is clicked...
		if (e.target.classList.contains('dl__textItem-item--copy') ||
			e.target.classList.contains('dl__checkbox')) {
			e.preventDefault();
		} else {
			
			// Prevents linking if lightbox is enabled
			// element is an image
			if (tagName === 'input' || tagName === 'img' && enabledLightbox) {
				return false;
			}
			
			let _shouldBreak = false;
			if(config.hooks.onRowClick) {
				_shouldBreak = config.hooks.onRowClick(e, routePath);
				if(_shouldBreak) {
					return false;
				}
			}
			
			window.open(routePath, link.target !== '' ? link.target : '_self');
		}
	}
	
	onChecked(e) {
		const {updateWorkspace, item, config, workspace} = this.props,
			state = e.target.checked,
			workspaceAction = state ? 'add' : 'remove';
		
		if (state) {
			updateWorkspace({
				Item: item,
				workspace,
				workspaceAction
			});
		} else {
			updateWorkspace({
				Item: item,
				workspace,
				workspaceAction
			});
		}
	}
	
	renderHTML(_html, prop) {
		let html = _html;
		
		if (prop.isImage) {
			let imageProps = {
				src: html,
				alt: prop.label,
				onError: (e) => {
					this.setState({ imgError: true})
					if(prop.fallbackImageSrc) {
						e.target.src = prop.fallbackImageSrc;
						e.target.classList.add('fallback-image');
					} else {
						e.target.style.display = 'none';
					}
				}
			};
			
			if(this.props.selectedView.enableGalleryLightbox) {
				imageProps.onClick = () => {
					if(!this.state.imgError) {
						this.setState({imgIsOpen: true})
					}
				}
			}
				
			return <img {...imageProps} />;
		}
		
		if (this.props.selectedView.highlightSearchTermInText) {
			html = this._highlightSearchTerm(html)
		}
		
<<<<<<< HEAD
		return(<span dangerouslySetInnerHTML={{__html: html}}
								 title={(html || '').toString().replace(/(<([^>]+)>)/ig," ")}></span>);
=======
		return(<span dangerouslySetInnerHTML={{__html: html}} title={html}></span>);
>>>>>>> origin/master
	}
	
	makeLightboxImages (prop, item, items){
		const _items = items.filter(i => i.id !== item.id);
		const lightboxImages = prop.lightboxImages(item, _items);
		return lightboxImages;
	}

// Wrap search term in Mark element if present
	_highlightSearchTerm(_text) {
		let text = _text;
		const {searchTerm} = this.props;
		
		if (typeof searchTerm !== 'undefined') {
			const index = text.toLowerCase().indexOf(searchTerm);
			
			if (index > -1) {
				const termLength = searchTerm.length;
				let _tmpText = text.split('');
				_tmpText.splice(index, 0, '<mark>');
				_tmpText.splice(index + termLength + 1, 0, '</mark>');
				text = _tmpText.join('');
			}
		}
		
		return text;
	}
	
	render() {
		const {item, items=[], selectedView, preferencedProps, searchTerm} = this.props;
		const props = preferencedProps,
			enableRowChecks = selectedView.enableRowChecks || false,
			listCssGridLayout = makeCssGridLayout(props, enableRowChecks),
			check = enableRowChecks ? (
				<span key={-1} className="dl__textItem-item check">
          <Checkbox onChecked={this.onChecked.bind(this)} id={item[selectedView.itemIdProp]}> </Checkbox>
        </span>) : '';
		
		return (
			<div className="dl__textItem">
				<div className={`dl__listGridContainer ${enableRowChecks ? 'withCheck' : ''}`}
						 style={{ gridTemplateColumns: listCssGridLayout }}
					  onClick={this.onLinkClick.bind(this)}>
					{check}
					
					{
						props.map(prop => {
							const id = item[prop.idKey];
							const val = item[prop.key];
							let lightboxPreview = '';
							let hookedVal = prop.hasOwnProperty('before')
								? prop.before(val, item)
								: val;
							
							const parsedVal = prop.isDate
								? makeHumanDate(hookedVal)
								: this.renderHTML(hookedVal, prop);
							
							
							const copyIcon = prop.hasCopy
								? (
									<span className="dl__textItem-item--copy"
												onClick={this.copyToClipboard.bind(this, hookedVal)}> </span>)
								: '';
							
							if(this.state.imgIsOpen && selectedView.enableGalleryLightbox && prop.hasOwnProperty('lightboxImages')) {
								const lightboxImages = this.makeLightboxImages(prop, item, items);
								lightboxPreview = (<Lightbox
									images={lightboxImages}
									isOpen={this.state.imgIsOpen}
									currentImage={this.state.currentImage}
									onClickPrev={() => this.setState({currentImage:this.state.currentImage-1 < 0 ? lightboxImages.length-1 : this.state.currentImage-1})}
									onClickNext={() => this.setState({currentImage:this.state.currentImage+1 > lightboxImages.length-1 ? 0 : this.state.currentImage+1})}
									onClose={() => {
										// component has a bug that leaves overflow hidden on the body tag after close, preventing scroll. This is the fix
										document.getElementsByTagName("body")[0].style = {};
										return this.setState({imgIsOpen: false})
									}}
									backdropClosesModal={true}
									spinnerColor={'#999'}
									spinnerSize={150}
									theme={{
										container: {
											background: 'rgba(255,255,255,0.95)'
										},
										arrow: {
											fill: '#000'
										},
										close: {
											fill: '#000'
										},
										footer: {
											color: 'black',
										}
									}}
								/>)
							}
							
							if (prop.display) {
								return (
									<span key={prop.key} data-id={id}
												className={`dl__textItem-item dl__textItem-${prop.key}`}>
                    {copyIcon}
										{parsedVal}
										{lightboxPreview}
                  </span>
								);
							}
						})
					}
				</div>
			</div>
		);
	}
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
	return {
		config: state.app.config,
		workspace: state.app.workspace,
		force: state.app.force,
		searchTerm: state.app.queryObject.search
			? Array.isArray(state.app.queryObject.search)
				? state.app.queryObject.search[0]
				: state.app.queryObject.search
			: undefined
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(TextItemActions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TextItem);