import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as exportsActions from './actions';

class Exports extends Component{
    constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    _onSubmit(e) {

    }

    render() {
        const { } = this.props;
      
        return (
          <div className="exports__outer">
            <div className="exports__inner">
              <h1>Export Dataset</h1>
              <form onSubmit={this._onSubmit}>
                <label>Include all pages <small>(otherwise only the current page will be exported)</small>
                  <input type="checkbox" name="exports.pages"/>
                </label>
                <label>Include files <small>(if there are files associated with entries they will be included in the download)</small>
                  <input type="checkbox" name="exports.files"/>
                </label>

                <label>Email <small>(Where should we send the download?)</small>
                  <input type="email" name="exports.email" />
                </label>

                <input type="submit" value="Download" />
              </form>

            </div>
          </div>
        );
    }
}

function mapStateToProps(state,ownProps) {
  return {
      
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(exportsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exports);
