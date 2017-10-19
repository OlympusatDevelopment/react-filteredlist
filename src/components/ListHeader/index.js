import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListHeaderActions from './actions';
import ColumnSelector from '../ColumnSelector';
import Checkbox from '../Checkbox';

class ListHeader extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.state = {
      showColumnSelector: false,
      showDetachedSort: false,
      sortAsc: {}
    };

    this.onSettingsClick = this.onSettingsClick.bind(this);
  }

  toggleSort(e) {
    const { selectedView, filterChange } = this.props,
      elem = e.currentTarget,
      cls = 'dl__listHeader--sort--desc',
      key = e.currentTarget.getAttribute('data-key');

    if (selectedView.enableListSort) {

      // if(elem.classList.contains(cls)){
      if (this.state.sortAsc[key]) {
        elem.classList.remove(cls);

        filterChange({
          id: `sort-${key}`,
          view: selectedView.id,
          value: 'DESC'
        });

        this.setState({ sortAsc: { [key]: false } });
      } else {
        elem.classList.add(cls);

        filterChange({
          id: `sort-${key}`,
          view: selectedView.id,
          value: 'ASC'
        });

        this.setState({ sortAsc: { [key]: true } });
      }
    }
  }

  onSettingsClick() {
    this.setState({ showColumnSelector: !this.state.showColumnSelector });
  }

  onChecked(e) {
    const { Items, config, workspaceItems, updateWorkspace } = this.props,
      selectAll = e.target.checked,
      workspaceAction = selectAll ? 'add' : 'remove';

    [...document.querySelectorAll('.dl__listRow')].forEach(row => {
      const check = row.getElementsByTagName('input')[0];

      if (check.type == "checkbox") {
        check.checked = selectAll;
      }
    });

    if (selectAll) {
      Items.forEach(item => {
        updateWorkspace({
          Item: config.hooks.onCheck({ item, workspaceItems }),
          workspaceAction
        });
      });
    } else {
      Items.forEach(item => {
        updateWorkspace({
          Item: config.hooks.onUnCheck({ item, workspaceItems }),
          workspaceAction
        });
      });
    }
  }

  makeDetachedSort(props) {
    // props = the sortable items
    return (<div className="dl__detachedSort">
      detached sort
        </div>);
  }

  render() {
    const { selectedView, config, item } = this.props;
    const props = selectedView.props;
    const settingsIcon = selectedView.showListSettings ? (<span className="dl__listHeader-listSettings" onClick={this.onSettingsClick}> </span>) : '',
      columnSelector = this.state.showColumnSelector ? (<ColumnSelector selectedView={selectedView} currentViewProps={props} item={item}> </ColumnSelector>) : '',
      check = selectedView.enableRowChecks ? (
        <span key={-1} style={{ width: '33px' }} className="dl__listHeader-item">
          <Checkbox onChecked={this.onChecked.bind(this)} id={'dl-select-all'}> </Checkbox>
        </span>) : '',
      classNames = config.pinPagination ? 'dl__pinPagination dl__listHeader' : 'dl__listHeader',
      sortIcon = (selectedView.enableListSort && selectedView.detachSort) ? (<span className="dl__listHeader-listSort" onClick={() => this.setState({ showDetachedSort: !this.state.showDetachedSort })}> </span>) : '',
      detachedSort = this.state.showDetachedSort || selectedView.alwaysShowDetachedSort ? this.makeDetachedSort(props) : '';

    return (
      <div className={classNames} style={{ ...selectedView.listHeaderStyles }}>
        {check}

        {props.map(prop => {
          const sortClasses = (selectedView.enableListSort && !selectedView.detachSort && prop.isSortable)
            ? (this.state.sortAsc[prop.key] ? 'dl__listHeader--sort' : 'dl__listHeader--sort dl__listHeader--sort--desc')
            : (this.state.sortAsc[prop.key] ? 'dl__listHeader--sort dl__listHeader--sort--disabled' : 'dl__listHeader--sort dl__listHeader--sort--disabled dl__listHeader--sort--desc');

          if (prop.display) {
            return (<span key={Math.random() * 100000} data-key={prop.key} style={{ ...Object.assign({}, { width: prop.width }, selectedView.listHeaderItemStyles) }} className="dl__listHeader-item" onClick={this.toggleSort.bind(this)}>{prop.label} <span className={sortClasses}> </span></span>);
          }
        })}

        {settingsIcon}
        {sortIcon}
        {columnSelector}
        {detachedSort}
      </div>
    );
  }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    force: state.app.force,
    listHeader: state.listHeader,
    Items: state.app.Items,
    workspaceItems: state.app.workspaceItems
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListHeaderActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListHeader);