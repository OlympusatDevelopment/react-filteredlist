import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DataListActions from './actions';
import ListHeader from '../../components/ListHeader';
import ListFooter from '../../components/ListFooter';
import ListRow from '../../components/ListRow';
import Pagination from '../../components/Pagination';

class DataList extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.makeLoading = this.makeLoading.bind(this);
        this.makeContentPlaceholderLoading = this.makeContentPlaceholderLoading.bind(this);
    }

    makeDataList(Items,selectedView){
        return (Items.map((item,i)=>{
            return (<ListRow key={i} item={item} selectedView={selectedView}> </ListRow>);
        }));
    }

    makeNoResults(noResultsMessage){
        const message = noResultsMessage ? noResultsMessage : "No Results Found...";

        return (
            <li className="dl__dataList--noResults">
                <h1>{message}</h1>
                {/* <h3>Please try another query</h3> */}
            </li>
        );
    }

    makeLoading(){
        return (
            <li className="dl__dataList--loading">
                <h1>Loading...</h1>
                <div> </div>
            </li>
        );
    }

    makeContentPlaceholderLoading(Placeholder,total){
        let placeholders = [];
        
        for(let i=0;i<total;i++){ 
            placeholders.push((<Placeholder key={Math.random()*1000+i} />));
        }

        return placeholders;
    }

    render() {   
        const {config,selectedView,Items=[],showLoading,width} = this.props,  
            listItems = showLoading 
                ? selectedView.customContentPlaceholder ? this.makeContentPlaceholderLoading(selectedView.customContentPlaceholder,selectedView.customContentPlaceholderAmount) : this.makeLoading()
                : ((Items && Items.length > 0) ? this.makeDataList(Items,selectedView) : this.makeNoResults(selectedView.noResultsMessage)),

            classNames = config.pinPagination ? 'dl__dataList dl__pinPagination' : 'dl__dataList',
            listHeader = selectedView.showListHeader ? (<ListHeader selectedView={selectedView} item={Items[0]}> </ListHeader>) :'',
            pagination = (Items && Items.length > 0) ? (<Pagination bottom={config.dataList.paginationBottomPosition}> </Pagination>) : '';

        return (
            <div className={classNames} style={{height:config.dataList.height,width}}> 
                {listHeader}

                <div className="dl__dataListWrapper" style={{overflowY:config.dataList.overflowY}}> 
                    <ul className="dl__dataList-list">
                        {listItems} 
                    </ul>
                </div>
                {pagination}
                <ListFooter> </ListFooter>
            </div>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        selectedView: state.app.selectedView,
        force: state.app.force,
        dataList : state.dataList,
        showLoading :state.app.showLoading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(DataListActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataList);