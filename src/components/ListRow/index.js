import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListRowActions from './actions';
import TextItem from '../TextItem';
import DisplayItem from '../DisplayItem';
import CustomItem from '../CustomItem';

class ListRow extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
  }

  makeListItem(item, selectedView, props) {
    switch (selectedView.displayType) {
      case 'custom':
        const CustomDisplayItem = selectedView.customDisplayTypeComponent;

        return (<CustomItem CustomDisplayItem={CustomDisplayItem} item={item} selectedView={selectedView} parentProps={props} />);
      case 'display':
        return (<DisplayItem item={item} selectedView={selectedView} />);
      case 'text':
      default:
        return (<TextItem item={item} selectedView={selectedView} />);
    }
  }

  render() {
    const { config, item, selectedView } = this.props;
    const listItem = this.makeListItem(item, selectedView, this.props);

    return (
      <li className="dl__listRow">
        {listItem}
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