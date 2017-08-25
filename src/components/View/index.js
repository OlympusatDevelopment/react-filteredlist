import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewActions from './actions';
import FilterGroup from '../FilterGroup';
import Search from '../../components/Search';
import ViewInfo from '../../components/ViewInfo';

class View extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)
    }

    resetFilters(){
        this.props.resetFilters();
    }

    makeActiveView(options){
        let ar = [
            (<ViewInfo key={Math.random()*10000} options={options}> </ViewInfo>)
        ];   

        if(options.showSearch){
            ar.push((<Search key={Math.random()*10000} options={options}> </Search>));
        }

        ar.push((options.filterGroups.map((filterGroup,i)=>{
            return (<FilterGroup key={Math.random()*10000} selectedView={options} options={filterGroup} isSingle=               {options.filterGroups.length === 1}> </FilterGroup>);
        })));
 
        if(options.showResetFiltersButton){
            ar.push((<button key={Math.random()*10000} className="dl__reset" onClick={this.resetFilters.bind(this)}>Reset Filters</button>));
        }

        return ar;
    }

    render() {
        const {options,config,isActiveView,isSingle}=this.props,
              activeView = isActiveView ? this.makeActiveView(options) : '';

        return (
            <div className="dl__view" data-issingle={isSingle} data-active={isActiveView}>
                {activeView}
            </div>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        view : state.view
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ViewActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);