import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListFooterActions from './actions';
import ColumnSelector from '../ColumnSelector';

class ListFooter extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)
    }

    render() {
        const {options,config} = this.props;

        return (
            <div className="dl__listFooter">

            </div>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        listFooter : state.listFooter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ListFooterActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListFooter);