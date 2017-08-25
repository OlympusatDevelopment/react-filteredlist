import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FooterActions from './actions';

class Footer extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <footer className="dl__footer">
            </footer>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        footer : state.footer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(FooterActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);