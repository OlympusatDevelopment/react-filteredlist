import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchActions from './actions';

class Search extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super()
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { options, filterChange } = this.props,
      input = document.getElementById(`dl-search--${options.id}`);

    filterChange({
      id: 'search',
      view: options.id,
      value: input.value
    });
  }

  onSearchClear(e) {
    e.preventDefault();

    this.props.filterChange({
      id: 'search',
      view: this.props.options.id,
      value: null
    });
  }

  bindSearch(e) {
    const { options, filterChange, updateSearch } = this.props,
      input = document.getElementById(`dl-search--${options.id}`);

    updateSearch({
      id: 'search',
      view: options.id,
      value: input.value
    });
  }

  render() {
    const { options, config, search, addons } = this.props;//options are the current view options
    const a = addons.map(addon => addon.id === 'search' ? addon : false)[0];
    const val = a ? decodeURIComponent(a.value) : '';
    const searchVal = (val == 'null' || val == null) ? '' : val;
    const searchButton = options.searchButton || {};

    return (
      <div className="dl__search">
        {/* could put options.label here if the search should have a label */}
        <form onSubmit={this.onSearchSubmit.bind(this)}>
          <input id={`dl-search--${options.id}`} className="dl__searchInput" autoFocus type="text" name="dl-search" placeholder="Search" value={searchVal} onChange={this.bindSearch.bind(this)} />
          <span className="dl__searchClearButton" onClick={this.onSearchClear.bind(this)}> </span>
          <input type="submit" value="Search" style={{ background: searchButton.background, color: searchButton.text }} />
        </form>
      </div>
    );
  }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    search: state.search,
    forceSearch: state.app.forceSearch,
    force: state.app.force,
    addons: state.app.selectedView.addons
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);