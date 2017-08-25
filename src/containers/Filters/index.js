import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FiltersActions from './actions';
import View from '../../components/View';

class Filters extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)
    }

    onTabClick(id){
        this.props.updateCurrentTab(id);
    }

    render() {
        const {config,selectedView,views,className} = this.props,
        viewTabs =  selectedView.showTabsHeader ? (<div className="dl__viewTabs" style={{...selectedView.tabHeaderStyles}}>
                    { selectedView.showTabs ? views.map((view,i)=>{//Make the view tabs, if there are more than one
                        return (<span key={i} className="dl__viewTab" onClick={this.onTabClick.bind(this,view.id)} data-issingle={config.views.length === 1} data-active={view.id === selectedView.id}>{view.label}</span>);
                    }) : ''}
                </div>) : '',
                cNames = `dl__filters ${className}`;

        return (
            <div className={cNames}>
                <h3>{config.filtersLabel}</h3> 
                {viewTabs}

                {views.map((view,i)=>{
                    return (<View key={i} options={view} isSingle={config.views.length === 1} isActiveView={view.id === selectedView.id}> </View>);
                })}

            </div>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        views : state.app.views,
        selectedView : state.app.selectedView,
        filters : state.filters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(FiltersActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);