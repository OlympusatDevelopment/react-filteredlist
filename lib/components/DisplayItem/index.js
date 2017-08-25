'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var DisplayItemActions = _interopRequireWildcard(_actions);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _copyToClipboard = require('copy-to-clipboard');

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noImageAvailable = 'http://declangourley.com/wp-content/themes/fusion/img/no-image.png';

var DisplayItem = function (_Component) {
    _inherits(DisplayItem, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function DisplayItem(props) {
        _classCallCheck(this, DisplayItem);

        var _this = _possibleConstructorReturn(this, (DisplayItem.__proto__ || Object.getPrototypeOf(DisplayItem)).call(this, props));

        _this.state = {
            imgIsOpen: false,
            currentImage: 0
        };
        return _this;
    }

    _createClass(DisplayItem, [{
        key: 'onLinkClick',
        value: function onLinkClick(e) {
            // Prevent linking when the copy icon is clicked
            if (e.target.classList.contains('dl__featuredImg')) {
                e.preventDefault();
            }
        }
    }, {
        key: 'onChecked',
        value: function onChecked(e) {
            var _props = this.props,
                updateWorkspace = _props.updateWorkspace,
                item = _props.item,
                config = _props.config,
                workspaceItems = _props.workspaceItems,
                state = e.target.checked,
                workspaceAction = state ? 'add' : 'remove';


            if (state) {
                updateWorkspace({
                    Item: config.hooks.onCheck({ item: item, workspaceItems: workspaceItems }),
                    workspaceAction: workspaceAction
                });
            } else {
                updateWorkspace({
                    Item: config.hooks.onUnCheck({ item: item, workspaceItems: workspaceItems }),
                    workspaceAction: workspaceAction
                });
            }
        }
    }, {
        key: 'onAddToWatchlistClick',
        value: function onAddToWatchlistClick(e) {
            e.preventDefault();
        }
    }, {
        key: 'onAddToCartClick',
        value: function onAddToCartClick(e) {
            e.preventDefault();
        }
    }, {
        key: 'makeLightboxImages',
        value: function makeLightboxImages(item) {
            var images = [];

            if (item.assets && item.assets.artwork.length > 0) {
                var _images;

                (_images = images).push.apply(_images, _toConsumableArray(item.assets.artwork.map(function (art) {
                    return { src: art.url, caption: art.filename };
                })));
            }

            if (item.assets && item.assets.still.length > 0) {
                var _images2;

                (_images2 = images).push.apply(_images2, _toConsumableArray(item.assets.still.map(function (art) {
                    return { src: art.url, caption: art.filename };
                })));
            }

            if (item.assets && item.assets.video.length > 0) {
                var _images3;

                (_images3 = images).push.apply(_images3, _toConsumableArray(item.assets.video.map(function (art) {
                    return { src: art.url, caption: art.filename };
                })));
            }

            if (images.length === 0) {
                //images = [{src:require(`/lib/images/no-image-available.png`)}];
                images = [{ src: '#' }];
            }

            return images.filter(function (img) {
                return typeof img.src !== 'undefined';
            });
        }
    }, {
        key: 'renderHTMLTitle',
        value: function renderHTMLTitle(html) {
            return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: html }, title: html });
        }

        //@todo when We get time, clean up this code. It was rushed.

    }, {
        key: 'makeDisplayItem',
        value: function makeDisplayItem(item, selectedView, props) {
            var _this2 = this;

            var languageFlag = item.languageLabel ? _react2.default.createElement(
                'span',
                { className: 'dl__displayItemFlag flag flag-us' },
                ' '
            ) : '',
                language = item.languageLabel ? _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                    'span',
                    { className: 'dl__displayItem--label' },
                    'Language ',
                    languageFlag
                )
            ) : '',
                check = selectedView.enableRowChecks ? _react2.default.createElement(
                'span',
                { style: { width: '33px' }, className: 'dl__displayItemCheck' },
                _react2.default.createElement(
                    _Checkbox2.default,
                    { onChecked: this.onChecked.bind(this), id: item[selectedView.itemIdProp] },
                    ' '
                )
            ) : '',
                cast = item.cast && item.cast.length > 0 ? _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                    'span',
                    { className: 'dl__displayItem--label' },
                    'Starring: '
                ),
                ' ',
                _react2.default.createElement(
                    'span',
                    { className: 'dl__displayItem--link' },
                    item.cast.toString()
                )
            ) : '',
                director = item.director && item.director.length > 0 ? _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                    'span',
                    { className: 'dl__displayItem--label' },
                    'Directed By: '
                ),
                ' ',
                _react2.default.createElement(
                    'span',
                    { className: 'dl__displayItem--link' },
                    item.director.toString()
                )
            ) : '',
                seasons = item.entityType === 'olyplat-entity-series' ? _react2.default.createElement(
                'p',
                { style: { fontSize: '18px' } },
                'Seasons: 1 - 3'
            ) : _react2.default.createElement(
                'span',
                { style: { height: '21px', display: 'inline-block' } },
                ' '
            ),
                etProp = props.filter(function (prop) {
                return prop.key === 'entityType';
            }),
                etPropHooked = etProp ? etProp[0].before(item.entityType) : false,
                entityType = etPropHooked ? etPropHooked.charAt(0).toUpperCase() + etPropHooked.slice(1) : '',
                //COnnect to the prop hook in the view props

            artwork = item.assets && item.assets.artwork.length > 0 ? item.assets.artwork[0].url : false,
                still = item.assets && item.assets.still.length > 0 ? item.assets.still[0].url : false,
                featuredImage = artwork ? artwork : still ? still : noImageAvailable,
                featuredImageDisplayClass = artwork ? 'dl__featuredImg dl__imgMaxWidth' : 'dl__featuredImg',
                lightboxImages = this.makeLightboxImages(item);

            return _react2.default.createElement(
                'div',
                { className: 'dl__displayItemInner' },
                _react2.default.createElement(
                    'div',
                    { className: 'dl__displayItemImgWrapper' },
                    check,
                    _react2.default.createElement(
                        'span',
                        { className: 'dl__featuredImgWrapper' },
                        _react2.default.createElement('img', { onClick: function onClick() {
                                return _this2.setState({ imgIsOpen: true, currentImage: 0 });
                            }, className: featuredImageDisplayClass, src: featuredImage, alt: item.title })
                    ),
                    featuredImage !== noImageAvailable && this.state.imgIsOpen && selectedView.enableGalleryLightbox && _react2.default.createElement(_reactImages2.default, {
                        images: lightboxImages,
                        isOpen: this.state.imgIsOpen,
                        onClickPrev: function onClickPrev() {
                            return _this2.setState({ currentImage: _this2.state.currentImage - 1 < 0 ? lightboxImages.length - 1 : _this2.state.currentImage - 1 });
                        },
                        onClickNext: function onClickNext() {
                            return _this2.setState({ currentImage: _this2.state.currentImage + 1 > lightboxImages.length - 1 ? 0 : _this2.state.currentImage + 1 });
                        },
                        currentImage: this.state.currentImage,
                        onClose: function onClose() {
                            // component has a bug that leaves overflow hidden on the body tag after close, preventing scroll. This is the fix
                            document.getElementsByTagName("body")[0].style = {};
                            return _this2.setState({ imgIsOpen: false });
                        },
                        backdropClosesModal: true,
                        theme: {
                            container: {
                                background: 'rgba(255,255,255,0.95)'
                            },
                            arrow: {
                                fill: '#000'
                            },
                            close: {
                                fill: '#000'
                            }
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'dl__displayItemInnerCol' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            this.renderHTMLTitle(item.title)
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Olympusat'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'dl__displayItemMetaGroup' },
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    { className: 'dl__displayItem--label' },
                                    item.primaryGenreLabel
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    { className: 'dl__displayItem--label' },
                                    'Rating: '
                                ),
                                ' ',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'dl__displayItem--link' },
                                    'PG-TV'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'dl__displayItemMetaGroup' },
                            language,
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    { className: 'dl__displayItem--label' },
                                    'Subtitles ',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'dl__displayItemFlag flag flag-us' },
                                        ' '
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'dl__displayItemInnerCol' },
                        _react2.default.createElement(
                            'div',
                            { className: 'dl__displayItem--pinBottom' },
                            _react2.default.createElement(
                                'p',
                                { style: { fontSize: '18px' } },
                                entityType
                            ),
                            _react2.default.createElement(
                                'p',
                                { style: { fontSize: '16px', color: '#cdcccd', lineHeight: '0.7', padding: '5px 0' } },
                                item.year,
                                languageFlag,
                                ' ',
                                _react2.default.createElement(
                                    'span',
                                    { style: { color: '#333', paddingLeft: '9px', fontWeight: '700' } },
                                    'HD'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'dl__displayItemMetaGroup' },
                        cast,
                        director,
                        _react2.default.createElement(
                            'div',
                            { className: 'dl__displayItem--pinBottom' },
                            seasons,
                            _react2.default.createElement(
                                'form',
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { onClick: this.onAddToWatchlistClick, style: { marginRight: '9px' }, className: 'dl__displayItemButton dl__displayItemButton--stripe' },
                                    'Add to Watchlist'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { onClick: this.onAddToCartClick, className: 'dl__displayItemButton' },
                                    'Add to Cart'
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                item = _props2.item,
                selectedView = _props2.selectedView;

            var props = selectedView.props,
                displayItem = this.makeDisplayItem(item, selectedView, props);

            return _react2.default.createElement(
                'div',
                { className: 'dl__displayItem' },
                _react2.default.createElement(
                    'a',
                    { target: selectedView.link.target, href: selectedView.link.row(item), onClick: this.onLinkClick.bind(this) },
                    displayItem
                )
            );
        }
    }]);

    return DisplayItem;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        workspaceItems: state.app.workspaceItems,
        force: state.app.force
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(DisplayItemActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DisplayItem);

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