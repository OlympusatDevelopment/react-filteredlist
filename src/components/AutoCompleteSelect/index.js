import React, {Component} from 'react';
import Chips from 'react-chips';
import theme, {chipTheme} from './theme.js';

const NO_RESULTS_FOUND = 'No results found.';

class AutoCompleteSelect extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			items: []
		};
		
		// this.onSearch = this.onSearch.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
	}
	
	static getDerivedStateFromProps(props, state) {
		const {initalValues} = props;
		
		if (initalValues && Array.isArray(initalValues)) {
			if (initalValues.length >= 1 && initalValues[0] !== '') {
				
				if (initalValues !== state.items) {
					return {
						items: initalValues
					}
				}
			}
		}
		return null;
	}
	
	onSelectChange(data) {
		
		if (data.includes(NO_RESULTS_FOUND))
			return false;
		
		this.setState({items: data});
		
		const {options, onSelectChange} = this.props;
		
		const formattedData = (data && Array.isArray(data) ?
			data.map(d => {
				return {[options.key]: d};
			}) : null);
		
		onSelectChange(formattedData);
	}
	
	onSearch(query) {
		const {options} = this.props;
		// const self = this;
		if (query !== '') {
			return options.getOptions(query)
				.toPromise()
				.then((items) => {
					if (items.length === 0) {
						return [NO_RESULTS_FOUND];
					}
					return items.map(i => i[options.value]);
				})
				.catch(err => console.log('filteredlist autocomplete error: ', err));
			
		}
	}
	
	render() {
		const {items} = this.state;
		const {placeholder} = this.props;
		
		return (<Chips
			value={items}
			theme={theme}
			chipTheme={chipTheme}
			placeholder={placeholder}
			onChange={this.onSelectChange}
			fetchSuggestionsThrushold={5}
			fromSuggestionsOnly={true}
			highlightFirstSuggestion={true}
			fetchSuggestions={(value) => this.onSearch(value)}
		/>);
	}
	
}

export default AutoCompleteSelect;
