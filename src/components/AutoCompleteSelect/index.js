import React, { Component } from 'react';
import Chips from 'react-chips';
import theme from './theme';

class AutoCompleteSelect extends Component{
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        // this.onSearch = this.onSearch.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            const { initalValues, options } = nextProps;

            if (initalValues && Array.isArray(initalValues)) {
                if(initalValues.length >= 1 && initalValues[0] !== ''){
                    this.setState({items: initalValues});
                }
            }
        }
    }
 
    onSelectChange(data) {
        this.setState({ items: data });

        const {options, onSelectChange} = this.props;

        const formattedData = (data && Array.isArray(data) ?
        data.map(d => {return {[options.key]: d} ;}) : null);

        onSelectChange(formattedData); 
    }   

    onSearch(query) {
        const { options } = this.props;
        const self = this;
        if (query !== '') {
            return options.getOptions(query)
                .then((items) => {
                    return items.map(i => i.label);
                })
                .catch(err => console.log(err));

        }
    }

    render() {
        const { items } = this.state;
        const { placeholder } = this.props;

        return (<Chips
            value={items}
            theme={theme}
            placeholder={placeholder}
            onChange={this.onSelectChange}
            fetchSuggestionsThrushold={5}
            fetchSuggestions={(value) => this.onSearch(value)}
          />);
    }

}

export default AutoCompleteSelect;
