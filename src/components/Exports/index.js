import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as exportsActions from './actions';
import queries from '../../utils/queries';

class Exports extends Component{
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          ignorePagination: false,
          success: false
        };
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    _onSubmit(e) {
      e.preventDefault();
      const { _state, exportsSettings } = this.props;
      let _opts = _state.app.selectedView;
      _opts.requestType = 'export';

      if (exportsSettings) {

        // OVERRIDE the apiUrl being called, if it was provided separately
        if (exportsSettings.apiUrl) {
          _opts.api.url = exportsSettings.apiUrl;
        }
      }
      _state.app.exportData = {
        email: this.state.email.split(','),
        ignorePagination: this.state.ignorePagination
      };

      queries.makeXHRRequest(_state.app, _opts)
        .then(res => this.setState({success: true}));
    }

    makeForm() {
      return (<form onSubmit={this._onSubmit}>
        <label title="Otherwise only the current page will be exported">Include all pages in csv
          <input type="checkbox" name="exports.pages" onChange={e => this.setState({ ignorePagination: e.target.value })} value={this.state.ignorePagination}/> &nbsp;
        </label>

        <label title="Where should we send the download?">Email <small>(comma separate recipients to send to multiple)</small>
          <input type="text" name="exports.email" required placeholder="email@example.com" onChange={e => this.setState({ email: e.target.value })} value={this.state.email}/>
        </label>

        <input type="submit" value="Download" />
      </form>);
    }

    makeSuccess() {
      return (
        <div className="exports__success">
          <h3>Your request is being processed.</h3>
          <p>When your data is ready it will be emailed to <em>{this.state.email}.</em></p>
          <p>Please check your email.</p>

          <button onClick={() => this.props.controlModal({show: false, Component: false})}>Done</button>
        </div>
      )
    }

    render() {
        const {success, email} = this.state;
        const innerHTML = success ? this.makeSuccess() : this.makeForm();

        return (
          <div className="exports__outer">
            <div className="exports__inner">
              <h1>Export Dataset as CSV</h1>
              {innerHTML}
            </div>
          </div>
        );
    }
}

function mapStateToProps(state,ownProps) {
  return {
      _state: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(exportsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exports);
