import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewInfoActions from './actions';
import Pagination from '../Pagination';
import copy from 'copy-to-clipboard';
import Exports from '../Exports';

class ViewInfo extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this._controlExportsUI = this._controlExportsUI.bind(this);
        this.makeViewInfo = this.makeViewInfo.bind(this);
    }

    _copyToClipboard() {
        const path = window.location.href;
        copy(path);

        this.props.config.notify(`Copied ${path} to the clipboard`,'success','br');
    }

    _controlExportsUI(e, options) {
      const settings = options.infoDisplaySettings

      if(settings.showExport) {
        if (!settings.hasOwnProperty('exports')) { settings.exports = {}}// Default a missing export config

        let _Component = settings.exports.Component 
          ? (<settings.exports.Component exportsSettings={settings.exports} selectedView={options} parentProps={this.props}/>) 
          : (<Exports exportsSettings={settings.exports}/>); 

        this.props.controlModal({show: true, Component: _Component });
      }
    }

    updatePagingDisplay(s,ta,to) {
        const skip = parseInt(s,10),
              take = parseInt(ta,10),
              total = parseInt(to,10);

        // Update display
        let num = skip+ 1,
            of = (skip + take) > total
                ? total
                : skip + take;

        // Notify the user after Render
        if(total <= 0){
            //appUtils.message('0 Results','warning');
            num = 0;
            of = 0;
        }

        return `${num}-${of} of ${total || 'loading...'} ${total ? 'items' : ''}`;
    }

    makeViewInfo(){
      const {options, config, pagination, selectedView, app, modal} = this.props;
      const settings = options.infoDisplaySettings;
      const self = this;
      let lines = [];

      if(settings.showIconStrip){
          let icons = [];

          if(settings.showShareLink){
              icons.push((<div title="Share" className="dl__viewInfo--share" key={Math.random()*10000} onClick={this._copyToClipboard.bind(this)}> </div>))
          }

          if(settings.showExport){
              icons.push((<div key={Math.random()*10000} title="Export" className="exportIcon" onClick={e => {
                if(!modal.show) {
                  self._controlExportsUI(e, options);
                }
              }}></div>))
          }

          if(settings.iconComponents.length > 0){
              settings.iconComponents.forEach(Icon=>{
                  icons.push((<Icon key={Math.random()*10000}/>));
              });
          }

          lines.push((<li key={Math.random()*10000} className="dl__viewInfoIconStrip">{icons}</li>));
      }

      if(settings.showPaginationData){
          lines.push((<li key={Math.random()*10000} className="dl__viewInfoPaginationData"><span className="label">Displaying</span> <span>{this.updatePagingDisplay(pagination.skip,pagination.take,pagination.total)}</span></li>))
      }

      //if(settings.showPagination){//Can't use two for now
      //    lines.push((<Pagination key={Math.random()*10000}> </Pagination>));
      //}

      return lines; 
    }

    render() {
        const {options,config}=this.props,
              viewInfo = this.makeViewInfo();

        return (
            <ul className="dl__viewInfo">
                {viewInfo}
            </ul>
        );
    }
}

function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        force: state.app.force,
        pagination: state.app.pagination,
        app: state.app,
        modal: state.app.modal
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ViewInfoActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewInfo);