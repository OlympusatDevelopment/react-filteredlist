import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListRowActions from './actions';
import TextItem from '../TextItem';
import DisplayItem from '../DisplayItem';
import CustomItem from '../CustomItem';

class ListRow extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            renderDropdown: false
        };
    }

    makeListItem(item,selectedView,props){
        switch(selectedView.displayType){
            case 'custom':
                const CustomDisplayItem = selectedView.customDisplayTypeComponent;

                return (<CustomItem CustomDisplayItem={CustomDisplayItem} item={item} selectedView={selectedView} parentProps={props}/>);
            case 'display':
                return (<DisplayItem item={item} selectedView={selectedView} />);
            case 'text':
            default:
                return (<TextItem item={item} selectedView={selectedView} />);
        }
    }
    
    /**
     * Renders dropdown on chevron click
     * @param {Event} e 
     */
    onChevronClick(e) {
        e.preventDefault();

        this.setState({renderDropdown:!this.state.renderDropdown})
        return false;
    }

    render() {
        const {config,item,selectedView} = this.props;
        const listItem = this.makeListItem(item,selectedView,this.props);
        const DropdownComponent = selectedView.rowDropdownComponent; // Component for dropdown details
        const dropdownClassList = selectedView.dropdownClassList;

        return (
            <li className={`dl__listRow ${selectedView.enableRowDropdown ? dropdownClassList : ''}`}>
                {selectedView.enableRowDropdown &&
                    <span onClick={e=>{this.onChevronClick(e)}} className={`chevron--open-${this.state.renderDropdown}`}></span>
                }
                {listItem}
                {selectedView.enableRowDropdown && this.state.renderDropdown &&               
                    <DropdownComponent item={item} selectedView={selectedView} />
                }
            </li>
        );
    }
  }

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    listRow: state.listRow
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListRowActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRow);