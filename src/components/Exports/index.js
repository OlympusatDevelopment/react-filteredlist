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
              <h1>Export Dataset as CSV</h1>
              <form onSubmit={this._onSubmit}>
                <label title="Otherwise only the current page will be exported">Include all pages in csv
                  <input type="checkbox" name="exports.pages"/> &nbsp;
                </label>
                <label title="If there are files associated with entries they will not be included in the download">Only metadata
                  <input type="checkbox" name="exports.files"/> &nbsp;
                </label>

                <label title="Where should we send the download?">Email
                  <input type="email" name="exports.email" placeholder="Email"/>
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
