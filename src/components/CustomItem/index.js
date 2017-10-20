import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CustomItemActions from './actions';
import Checkbox from '../Checkbox';

class CustomItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imgIsOpen: false,
      currentImage: 0
    };
  }

  onChecked(e) {
    const { updateWorkspace, item, config, workspaceItems } = this.props,
      state = e.target.checked,
      workspaceAction = state ? 'add' : 'remove';

    if (state) {
      updateWorkspace({
        Item: config.hooks.onCheck({ item, workspaceItems }),
        workspaceAction
      });
    } else {
      updateWorkspace({
        Item: config.hooks.onUnCheck({ item, workspaceItems }),
        workspaceAction
      });
    }
  }

  onLinkClick(e) {
    // Prevent linking when the copy icon is clicked
    if (e.target.classList.contains('dl__featuredImg')) {
      e.preventDefault();
    }
  }

  makeCustomItem(item, selectedView, CustomDisplayItem, props, parentProps, preferencedProps) {
    const check = selectedView.enableRowChecks ? (
      <span style={{ width: '33px' }} className="dl__customItemCheck">
        <Checkbox onChecked={this.onChecked.bind(this)} id={item[selectedView.itemIdProp]}> </Checkbox>
      </span>) : '';

    return (<div className="dl__customItemInner">
      {check}
      <CustomDisplayItem preferencedProps={preferencedProps} item={item} selectedView={selectedView} parentProps={parentProps} />
    </div>);
  }

  render() {
    const { item, selectedView, CustomDisplayItem, parentProps, preferencedProps } = this.props;
    const props = selectedView.props,
      customItem = this.makeCustomItem(item, selectedView, CustomDisplayItem, props, parentProps, preferencedProps);

    return (
      <div className="dl__customItem">
        {customItem}
      </div>
    );
  }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    workspaceItems: state.app.workspaceItems,
    force: state.app.force,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CustomItemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomItem);