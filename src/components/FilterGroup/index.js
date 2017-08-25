import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FilterGroupActions from './actions';
import FilterItem from '../FilterItem';
import SaveFilterset from '../SaveFilterset';

class FilterGroup extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)
    }

    toggleFilterAccordian(e){
        const elem = e.target,
            node = elem.parentNode,
            cls = 'dl__filterGroup--open';

        if(node.classList.contains(cls)){
            node.classList.remove(cls);
        }else{
            node.classList.add(cls);
        }

        if(elem.classList.contains(cls)){
            elem.classList.remove(cls);
        }else{
            elem.classList.add(cls);
        }
    }

    render() {
        const {options,config,isSingle,selectedView}=this.props; 
        const classNames = options.defaultOpen ? `dl__filterGroup dl__filterGroup--open ${options.id}`: `dl__filterGroup ${options.id}`,
        filtersets = options.hasOwnProperty('id') && options.id === 'filterset' && selectedView.showSaveFiltersInterface ? (<SaveFilterset selectedView={selectedView} key={Math.random()*10000}/>) : '';  

        return (
            <div className={classNames} style={{color: options.accordian.color.text}} data-issingle={isSingle} onClick={this.toggleFilterAccordian.bind(this)}>
                <div className="dl__filterGroupLabel" style={{background: options.accordian.color.background}}>
                    <span style={{color: options.accordian.color.text}}>{options.label}</span>
                </div>
                <div className="dl__filterGroupFilters">
                    {options.filters.map((filter,i)=>{
                        return (<FilterItem key={i} options={filter} selectedView={selectedView}> </FilterItem>);
                    })}

                    {filtersets}
                </div>
            </div>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        filterGroup : state.filterGroup
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(FilterGroupActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterGroup);