import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SaveFiltersetActions from './actions';
import Select from 'react-super-select';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class SaveFilterset extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {
      force: 0,
      showDeleteSelect: false,
      selectValue: {
        name: 'Make Your Selection',
        filterset: ''//@todo read the url on load and set this initial state to the currently run query string if it matches one of the user's saved filtersets
      }
    };
  }

  toggleDeleteInterface() {
    this.setState({ showDeleteSelect: !this.state.showDeleteSelect });
  }

  formSubmit(e) {
    e.preventDefault();

    if (this.props.config.hooks.onSaveFilterset) {
      this.props.config.hooks.onSaveFilterset(
        {
          name: e.target.getElementsByClassName("filterset.name")[0].value,
          queryString: window.location.href,
          queryObject: this.props.app.queryObject
        }
      );
    }

    // Refresh the page in order to ensure saved data has propogated the system 
    // and can be included in the options list. react-super-select caches the component 
    // click and doesn't refresh the ajax call to populate options.
    setTimeout(function(){
      window.location.href = window.location.href;  
    },1000);
  }

  onSavedFiltersChange(data) {
    if (data) {
      window.location.href = data.filterset;
      this.setState({ selectValue: data });
    }
  }

  onSavedFiltersDelete(data) {
    if (data && this.props.config.hooks.onDeleteFilterset) {
      this.props.config.hooks.onDeleteFilterset(data);

      this.setState({ showDeleteSelect: false });
    }
  }

  render() {
    const { selectedView, config } = this.props,
      self = this,
      showDeleteSelect = this.state.showDeleteSelect ? (<Select
        ajaxDataFetch={selectedView.usersSavedFiltersets || { then: () => [] }}
        optionLabelKey={'name'}
        optionValueKey={'filterset'}
        placeholder="Make Your Selection"
        initialValue={self.state.selectValue}
        onChange={self.onSavedFiltersDelete.bind(self)}
        onOpenDropdown={() => { }}
        onCloseDropdown={() => { }}
        searchable={false}
      />) : '';

    return (
      <div className="dl__saveFilterset">
        <div className="dl__saveFiltersetForm">
          <form onSubmit={this.formSubmit.bind(this)}>
            <label>
              <FormattedMessage {...messages.inputLabel} />
              <input type="text" className="filterset.name" placeholder={messages.inputPlaceholder.defaultMessage} />
              <input type="submit" value={messages.formSubmitValue.defaultMessage} />
            </label>
          </form>
        </div>
        <div className="dl__saveFiltersetDelete">
          <span className="dl__saveFiltersetDeleteButton" onClick={this.toggleDeleteInterface.bind(this)}>
            <FormattedMessage {...messages.deleteFilterset} />
          </span>
          {showDeleteSelect}
        </div>
        <label>
          <FormattedMessage {...messages.selectLabel} />
          <Select
            ajaxDataFetch={selectedView.usersSavedFiltersets || { then: () => [] }}
            optionLabelKey={'name'}
            optionValueKey={'filterset'}
            placeholder="Make Your Selection"
            initialValue={self.state.selectValue}
            onChange={self.onSavedFiltersChange.bind(self)}
            onOpenDropdown={() => { }}
            onCloseDropdown={() => { }}
            searchable={false}
          />
        </label>
      </div>
    );
  }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SaveFiltersetActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveFilterset);