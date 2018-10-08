import React, { Component } from 'react';
import Promise from 'bluebird';
import Select from 'react-super-select';

export default class PropertySearch extends Component{
    constructor(props) {
        super(props);
        const options = this.props.options;
        this.state = {
          searchValue: null,
          selectedProperty: null,
          _selectOptionsKeys: {
            k: (options && options.key) ? options.key : 'k',
            v: (options && options.value) ? options.value : 'v'
          }
        };
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange(prop){
      this.setState({selectedProperty:prop[this.state._selectOptionsKeys.k]});
      // Update filter request here, if there is a search value only
    }

    onSearchSubmit(e){
      e.preventDefault();
      // Set state to filter change
      console.log("SUBMIT ", this.state);
    }
    bindSearch(e){
      const searchValue = e.target.value;
      this.setState({searchValue});
    }
    onSearchClear(){
      this.setState({searchValue: null});
    }

    render() {
        const { multi, value, options, initialValue, selectedView } = this.props;
        const self = this;
      console.log("PS ", options, initialValue, selectedView);

        return (<div>
          <div className="dl__search">
            <form onSubmit={this.onSearchSubmit.bind(this)}>
              <input data-lpignore="true" id={`dl-search--${this.props.id}`} className="dl__searchInput" autoFocus type="text" name="dl-search" placeholder={"Search on property"} value={this.state.searchValue || value || ''} onChange={this.bindSearch.bind(this)} />

              <span className="dl__searchClearButton" onClick={this.onSearchClear.bind(this)}> </span>
              
              <input type="submit" value="Search" style={{ background: selectedView.searchButton.background, color: selectedView.searchButton.text }} />
            </form>
          </div>
          <Select
            ajaxDataFetch={(options && options.getOptions) 
              || (() => Promise.resolve(selectedView.props.map(prop => 
                ({
                  [this.state._selectOptionsKeys.k]: prop.key,// assign the view prop key as the collection key value to match format of the react-select
                  [this.state._selectOptionsKeys.v]: prop.key
                }))) 
              || [])}
            optionLabelKey={this.state._selectOptionsKeys.v}
            optionValueKey={this.state._selectOptionsKeys.k}
            multiple={multi}
            initialValue={initialValue.length > 0 ? initialValue : null}
            placeholder="Property to search on"
            onChange={self.onSelectChange}
            searchable={false}
          />
        </div>);
    }
}
