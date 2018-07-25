import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from './actions';

class Modal extends Component{
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        const { component } = this.props;
      console.log("RENDERED");
        return (
          <div className="modal__outer">
            <div className="modal__inner">
              <div className="modal--close" onClick={() => this.props.controlModal({show: false, Component: false})}></div>
              {component}
            </div>
          </div>);
    }
}

function mapStateToProps(state,ownProps) {
  return {
      modal: state.app.modal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(modalActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
