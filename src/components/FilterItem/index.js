import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FilterItemActions from './actions';
import Select from 'react-super-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import AutoCompleteSelect from '../AutoCompleteSelect';
import { CheckboxGroup, Checkbox } from 'react-checkbox-group';
import {RadioGroup, Radio} from 'react-radio-group';
import { SortItem } from '../SortItem';
import Promise from 'bluebird';;

class FilterItem extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {
      Filter: '',// the built filter item
      focusedInput: null,
      lastFocusedInput: null,
      startDate: null,
      endDate: null,
      radioValue: Array.isArray(props.options.value) ? props.options.value[0] : props.options.value
    };

    this.makeFilter = this.makeFilter.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
    this._onSortClick = this._onSortClick.bind(this);
    this.makeSelectInitialValue = this.makeSelectInitialValue.bind(this);
    this._onRangeChange = this._onRangeChange.bind(this);

    // Create the initial filter inner component
    this.makeFilter(props.options).then(Filter => this.setState({Filter}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.type === "radio") {
      this.setState({radioValue: Array.isArray(nextProps.options.value) ? nextProps.options.value[0] : nextProps.options.value});
    }

    if(nextProps.options.range) {
      const dateRange = nextProps.options.range;
      if(dateRange.start) {
          this.setState({startDate: moment(dateRange.start * 1)});
      }
      if(dateRange.end) {
          this.setState({endDate: moment(dateRange.end * 1)});
      }
    }

    // Rerender the filter item in case options have changed
    this.makeFilter(nextProps.options).then(Filter => this.setState({Filter}));
  }

  _onSelectChange(data) {
    const { options, selectedView, filterChange } = this.props,
    value = (data && Array.isArray(data)) ? 
              // (Array.isArray(data[0].entityUUID)  ? data[0].entityUUID :
                data.map(obj=> {
                  return obj[options.options.key];
              }) : 
            (data ? [data[options.options.key]] : null);    
      
    filterChange({
      id: options.id,
      view: selectedView.id,
      value
    });
  }

  _onSortClick(direction) {
    const { options, selectedView, filterChange } = this.props;

    filterChange({
      id: options.id,
      view: selectedView.id,
      value: direction
    });
  }

  /**
   * Returned as moment objects
   * @param startDate
   * @param endDate
   */
  _onRangeChange(args) {
    let startDate = args.startDate || this.state.startDate;
    let endDate = args.endDate ||  this.state.endDate;
    const {options, selectedView, filterChange} = this.props;

    if (startDate) {
	    if (startDate.isAfter(endDate)) {
		    endDate = startDate;
	    }

        let local = moment(startDate.utc()).local();

        filterChange({
            id: `${options.id}--start`,
            view: selectedView.id,
            value: local.unix() * 1000
            //value : parseInt(startDate.unix()+'000',10)
        });
    }

    if (endDate) {
        let local = moment(endDate.utc()).local();

        filterChange({
            id: `${options.id}--end`,
            view: selectedView.id,
            value: local.unix() * 1000
        });
    }
  }

  _onRangeReset(e) {
    e.preventDefault();
    const { options, selectedView, filterChange } = this.props;

    filterChange([
      {
        id: `${options.id}--start`,
        view: selectedView.id,
        value: null
      },
      {
        id: `${options.id}--end`,
        view: selectedView.id,
        value: null
      }
    ]);
  }

  _onRangeFocusChange(focusedInput) {
    // State loop bug fix for dates component
    if (this.state.lastFocusedInput !== focusedInput) {
      this.setState({ lastFocusedInput: focusedInput, focusedInput });
    }
  }

  _handleCheckboxChange(options, values) {
    const { selectedView, filterChange } = this.props,
      optValues = options.options.getOptions();
    let value = [];

    optValues.forEach(collectionItem => {
      values.forEach(checkVal => {
        if (checkVal == collectionItem[options.options.key]) {
          value.push(collectionItem[options.options.key]);
        }
      });
    });

    filterChange({
      id: options.id,
      view: selectedView.id,
      value: value.length > 0 ? JSON.stringify(value) : null
    });
  }

  _handleRadioChange(options, value) {
    const { selectedView, filterChange } = this.props;

    filterChange({
      id: options.id,
      view: selectedView.id,
      value
    });

    this.setState({radioValue: value});
  }

  /**
   * ALLOWS the getOptions function in a filter config to either return a promise or data directly. 
   * @param {*} options 
   */
  _getOptionsData(options){
    return new Promise((resolve, reject) => {
      if (options.options && options.options.getOptions) {
        try{
          return options.options.getOptions()
            .then(resolve);
        }catch(e){
          resolve(options.options.getOptions());
        }
      } else {
        resolve([]);
      }
    });
  }

  makeFilter(options) {
    const self = this;
    return self._getOptionsData(options)
      .then(_optionsData => 
        new Promise((resolve, reject) => {
          switch (self.props.options.type) {
            case 'range':
              resolve([
                (<span key={Math.random() * 100000} className="dl__filterItemRangeClear"><a href="#" onClick={self._onRangeReset.bind(self)}>reset</a></span>),
                  (<div key={Math.random() * 100000} className="dr__wrapper">
                    <DatePicker
                      placeholderText="Start Date"
                      key={Math.random()*10000}
                      className="dr__datePicker"
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={startDate => {
                        self.setState({startDate});
                        self._onRangeChange({startDate});
                      }}
                  />
                    <div className="dr__divider">
                      <svg viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>
                    </div>
                    <DatePicker
                      placeholderText="End Date"
                      className="dr__datePicker"
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={endDate => {
                        self.setState({endDate});
                        self._onRangeChange({ endDate });
                      }}
                  /></div>)]);
              break;
            case 'checkbox':
              let vals = [...decodeURIComponent(self.props.options.value)];
      
              // Handle reading url values @todo: fix the read later when we get more time
              if (vals[0] === "[" || (vals[0] === "n" && vals[1] === "u")) {
                vals = vals.join('');
              }
      
              try {
                vals = JSON.parse(vals);
              } catch (e) { }
      
              vals = vals === 'null' ? null : vals;
      
              //@todo .need to spend some time looking at why this component won't render checked values if the first render had no values.
              resolve((<CheckboxGroup key={Math.random() * 100000} name={options.id} values={vals} onChange={this._handleCheckboxChange.bind(this, options)}>
                <div className="dl__filterItemCheckbox">{
                  _optionsData.map(option => {
                    return (<label key={Math.random() * 10000}><Checkbox value={option[options.options.key]} />{option[options.options.value]}</label>);
                  })
                }</div>
              </CheckboxGroup>));
              break;
            case 'sort':
              resolve((<SortItem key={Math.random() * 100000} options={self.props.options} onClick={this._onSortClick} />));
              break;
            case 'radio':
              const Radios = _optionsData
                .map(option => {
                  return (
                    <label key={Math.random() * 10000}>
                      <Radio value={option[options.options.key]} />
                      {option[options.options.value]}
                    </label>
                  )
                });
      
                resolve((<RadioGroup
                  key={Math.random() * 100000}
                  className="dl__filterItemRadio" 
                  name={options.label}
                  selectedValue={this.state.radioValue}
                  onChange={this._handleRadioChange.bind(this, options)}>
                  {Radios}
                </RadioGroup>
              ));
              break;
            case 'autocomplete':
                resolve(<AutoCompleteSelect
                    key={Math.random() * 100000}
                    onSelectChange={self._onSelectChange}
                    initalValues={options.value}
                    placeholder={options && options.placeholder ? options.placeholder : null}
                    {...options} />);
                break;
            case 'select':
            default:
              // If a value exist via a query string run or state update, set the component initial val, otherwise leave blank to display the placeholder

              if (self.props.options.value) {
                resolve((
                  <Select
                    key={Math.random() * 100000}
                    ajaxDataFetch={options.options.getOptions || []}
                    optionLabelKey={options.options.value}
                    optionValueKey={options.options.key}
                    multiple={options.multi}
                    initialValue={this.makeSelectInitialValue(options,_optionsData)}
                    placeholder="Make Your Selections"
                    onChange={(data) => self._onSelectChange(data)}
                    searchable={false}
                  />
                ));
              } else {            
                resolve((
                  <Select
                    key={Math.random() * 100000}
                    ajaxDataFetch={options.options.getOptions || []}
                    optionLabelKey={options.options.value}
                    optionValueKey={options.options.key}
                    multiple={options.multi}
                    placeholder="Make Your Selections"
                    onChange={(data) => self._onSelectChange(data)}
                    searchable={false}
                  />
                ));
              }
          }
        })  
      );
  }

  /**
   * Makes the select components initial values based on either an incoming array of ids or a collection
   * @param {*} options 
   */
  makeSelectInitialValue(options,optionsData){
    const self = this;

    // Loop through optionsData and return all items that match the incoming stored values
    return optionsData.filter(data => 
      (Array.isArray(self.props.options.value) 
        ? self.props.options.value 
        : [self.props.options.value]
      ).includes(data[options.options.key])
    );
  }

  render() {
    const { options, zIndex } = this.props;
    const classNames = `dl__filterItem ${options.id}`;

    return (
      <div key={Math.random() * 1000}className={classNames} style={{zIndex}}>
        <label htmlFor={options.id}>{options.label}</label>
        {this.state.Filter}
      </div>
    );
  }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    force: state.app.force,
    filterItem: state.filterItem
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FilterItemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterItem);