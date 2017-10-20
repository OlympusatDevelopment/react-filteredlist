import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColumnSelectorActions from './actions';
import _ from 'underscore';
import utils from '../../utils';
import Checkbox from '../Checkbox';

class ColumnSelector extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
  }

  onChecked(e, prop) {
    const checked = e.target.checked,
      viewId = this.props.selectedView.id;
    //viewProp = {
    //    key:prop,
    //    label:utils.propToTitleCase(prop),
    //    hasCopy:false,// Assume false for these advanced settings
    //    isDate:prop.toLowerCase().indexOf('date') > -1,// Best guess. Looks for prop names that have date
    //    width:'125px'// @todo need to find a way to safely generate widths when props are added to the view. Could use property keys length as a divisor
    //};

    this.props.updateViewProps({ prop, checked, viewId });
  }

  render() {
    const { currentViewProps, config, item, selectedView } = this.props;
    const availableProps = currentViewProps.map(prop => prop.key);
    return (
      <div className="dl__columnSelector">
        <h4>Show</h4>
        {availableProps.map(prop => {
          let propObject = _.findWhere(currentViewProps, { key: prop }) || {};

          return (<span key={prop} data-key={prop}><Checkbox onChecked={this.onChecked.bind(this)} id={prop} checked={propObject.display} onChange={() => { }}> </Checkbox>{utils.propToTitleCase(prop)}</span>);
        })}

      </div>
    );
  }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    force: state.app.force,
    columnSelector: state.columnSelector
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ColumnSelectorActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnSelector);