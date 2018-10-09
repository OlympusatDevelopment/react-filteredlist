import React, { Component } from 'react';
import Promise from 'bluebird';
import Select from 'react-super-select';

export default class PropertySearch extends Component{
    constructor(props) {
        super(props);
        const options = this.props.options;
        this.state = {
          searchValue: null,
          initialValue: [],
          selectedProperty: null,
          _selectOptionsKeys: {
            k: (options && options.key) ? options.key : 'k',
            v: (options && options.value) ? options.value : 'v'
          }
        };
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    static getDerivedStateFromProps(props, state){
      let values = {prop: '', query: ''};
      let initialValue = [];

      if(Array.isArray(props.value) && props.value[0]){
        try{
          values = JSON.parse(decodeURIComponent(props.value.join(',')));
            if(values.query){ 
              initialValue = [{
                [state._selectOptionsKeys.v]: values.prop,
                [state._selectOptionsKeys.k]: values.prop
              }
          ];}

          return Object.assign({}, state, {searchValue: values.query, initialValue});
        }catch(e){}
      }

      return Object.assign({}, state, {initialValue});
    }

    onSelectChange(prop){
      if (prop) {
        this.setState({selectedProperty:prop[this.state._selectOptionsKeys.k]});
      }
      // Update filter request here, if there is a search value only
    }

    onSearchSubmit(e){
      e.preventDefault();
      const {filterChange, selectedView, id} = this.props;

      filterChange({
        id,
        view: selectedView.id,
        value: [JSON.stringify({
          prop: this.state.selectedProperty,
          query: this.state.searchValue
        })]
      });
    }

    bindSearch(e){
      const searchValue = e.target.value;
      this.setState({searchValue});
    }

    onSearchClear(){
      const {filterChange, selectedView, id} = this.props;

      filterChange({
        id,
        view: selectedView.id,
        value: null
      });
    }

    render() {
        let { multi, options, selectedView } = this.props;
        const self = this;

      return (<div>
          <div className="dl__search">
            <form onSubmit={this.onSearchSubmit.bind(this)}>
              <input data-lpignore="true" id={`dl-search--${this.props.id}`} className="dl__searchInput" autoFocus type="text" name="dl-search" placeholder={"Search on property"} value={this.state.searchValue || ''} onChange={this.bindSearch.bind(this)} />

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
            initialValue={this.state.initialValue.length > 0 ? this.state.initialValue : null}
            placeholder="Property to search on"
            onChange={self.onSelectChange}
            searchable={false}
          />
        </div>);
    }
}
