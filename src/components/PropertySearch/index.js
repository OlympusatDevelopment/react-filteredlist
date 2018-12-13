import React, { Component } from 'react';
import Promise from 'bluebird';
import Select from 'react-super-select';
import { restricInptValidator } from '../../utils/helpers';

let documentEvent;
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
          },
          inputTypeError: false,
          isFocused: false
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
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
    
    componentDidMount() {
			document.addEventListener('click', this.onInputFocus);
    }
    componentWillUnmount() {
			document.removeEventListener('click', this.onInputFocus);
    }

    onSelectChange(prop){
      if (prop) {
        this.setState({selectedProperty:prop[this.state._selectOptionsKeys.k]});
      }
      // Update filter request here, if there is a search value only
    }

    onSearchSubmit(e){
      e.preventDefault();
      const {filterChange, selectedView, id, fixedKey} = this.props;

      filterChange({
        id,
        view: selectedView.id,
        value: [JSON.stringify({
          prop: fixedKey ? fixedKey : this.state.selectedProperty,
          query: this.state.searchValue
        })]
      });
    }

    bindSearch(e){
      const { inputType } = this.props;
      const searchValue = e.target.value;
      
      if (restricInptValidator(searchValue, inputType)) {
				this.setState({searchValue, inputTypeError: false});
      } else {
				this.setState({inputTypeError: true});
      }
      
    }

    onSearchClear(){
      const {filterChange, selectedView, id} = this.props;

      filterChange({
        id,
        view: selectedView.id,
        value: null
      });
    }
    
    onInputFocus(e) {
      const _self = this;
	    const containerId = `dl-search-property--${this.props.id}`;
      const closest = e.target.closest(`#${containerId}`);
      if(closest && closest.id === containerId) {
        _self.setState({isFocused: true});
      } else {
        _self.setState({isFocused: false});
      }
    }

    render() {
        let { multi, options, selectedView, fixedKey, inputType } = this.props;
        const { searchValue, isFocused, _selectOptionsKeys, initialValue, inputTypeError } = this.state;
        const self = this;
        const classNames = isFocused ? 'onFocus' : '';

      return (<div>
          <div id={`dl-search-property--${this.props.id}`} className="dl__propertySearch">
            <form onSubmit={this.onSearchSubmit.bind(this)}>
              <input data-lpignore="true" id={`dl-search--${this.props.id}`} className={`dl__propertySearchInput`} autoFocus type="text" name="dl-search" placeholder={"Search on property"} value={searchValue || ''} onChange={this.bindSearch.bind(this)} />
              { isFocused && <span className="dl__propertySearchButtonActions">
                <span className="dl__propertySearchClearButton" onClick={this.onSearchClear.bind(this)}> </span>
                <button type="submit" value="Search" className="propertySearchBtn"><i className="fa fa-check fa-lg"></i></button>
              </span> }
            </form>
						{inputTypeError && <div className="errorMessage">
              Please enter a {inputType} value
						</div>
						}
          </div>
				{!fixedKey &&
					<Select
						ajaxDataFetch={(options && options.getOptions)
						|| (() => Promise.resolve(selectedView.props.map(prop =>
								({
									[_selectOptionsKeys.k]: prop.key,// assign the view prop key as the collection key value to match format of the react-select
									[_selectOptionsKeys.v]: prop.key
								})))
							|| [])}
						optionLabelKey={_selectOptionsKeys.v}
						optionValueKey={_selectOptionsKeys.k}
						multiple={multi}
						initialValue={initialValue.length > 0 ? initialValue : null}
						placeholder="Property to search on"
						onChange={self.onSelectChange}
						searchable={false}
					/>
				}
        </div>);
    }
}
