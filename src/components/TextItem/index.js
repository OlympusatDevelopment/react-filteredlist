import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TextItemActions from './actions';
import utils, { makeHumanDate } from '../../utils';
import copy from 'copy-to-clipboard';
import Checkbox from '../Checkbox';

class TextItem extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this._highlightSearchTerm = this._highlightSearchTerm.bind(this);
  }

  copyToClipboard(val) {
    copy(val);

    this.props.config.notify(`Copied ${val} to the clipboard`, 'success', 'br');
  }

  onLinkClick(e) {
    // Prevent linking when the copy icon is clicked...
    if (e.target.classList.contains('dl__textItem-item--copy')) {
      e.preventDefault();
    }
  }

  onChecked(e) {
    const { updateWorkspace, item, config, workspace } = this.props,
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
      return (<img className="dl__textItemImage" src={html} alt={prop.label} />);
    }

    if (this.props.selectedView.highlightSearchTermInText){
      html = this._highlightSearchTerm(html)
    }

    return (<span dangerouslySetInnerHTML={{ __html: html }} title={html} className={prop.cssClass}></span>);
  }

  // Wrap search term in Mark element if present
  _highlightSearchTerm(_text){
    let text = _text;
    const { searchTerm } = this.props;
    
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
    const { item, selectedView, preferencedProps, searchTerm } = this.props;
    const props = preferencedProps,
      enableRowChecks = selectedView.enableRowChecks || false,
      check = enableRowChecks ? (
        <span key={-1} style={{ width: '33px' }} className="dl__textItem-item check">
          <Checkbox onChecked={this.onChecked.bind(this)} id={item[selectedView.itemIdProp]}> </Checkbox>
        </span>) : '';
 
    return (  
      <div className="dl__textItem">
        <a className={`dl__listGridContainer ${enableRowChecks ? 'withCheck': ''}`} target={selectedView.link.target} href={selectedView.link.row(item)} onClick={this.onLinkClick.bind(this)}>
          {check}

          {
            props.map(prop => {
              const id = item[prop.idKey];
              const val = item[prop.key];
              let hookedVal = prop.hasOwnProperty('before')
                ? prop.before(val, item)
                : val;

              const parsedVal = prop.isDate
                ? makeHumanDate(hookedVal)
                : this.renderHTML(hookedVal, prop);

              const copyIcon = prop.hasCopy
                ? (<span className="dl__textItem-item--copy" onClick={this.copyToClipboard.bind(this, hookedVal)}> </span>)
                : '';

              if (prop.display) {
                return (
                  <span key={prop.key} data-id={id} data-style={{ width: prop.width }} className="dl__textItem-item" >
                    {copyIcon}
                    {parsedVal}
                  </span>
                );
              }
            })
          }
        </a>
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