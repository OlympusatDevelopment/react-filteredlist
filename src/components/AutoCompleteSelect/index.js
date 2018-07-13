import React, { Component } from 'react';
import { Select, i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';

i18n.use(locale);
const { Option } = Select;

class AutoCompleteSelect extends Component{
    constructor(props) {
        super(props);

        this.state = {
            items: [], 
            loading: false,
            values: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            const { initalValues, options } = nextProps;
            const items = initalValues && Array.isArray(initalValues) ? initalValues.map(v => { return {[options.key]: v, [options.value]: v }; }) : [];
            if (initalValues && items && Array.isArray(items)) {
                this.setState({values: initalValues, items: items});
            }
        }
    }
 
    onSelectChange(data) {
        const {options, onSelectChange} = this.props;

        const formattedData = (data && Array.isArray(data) ?
        data.map(d => {return {[options.key]: d} ;}) : null);

        onSelectChange(formattedData); 
    } 

    onSearch(query) {
        const { options } = this.props;

        if (query !== '') {
            this.setState({
                loading: true
            });
            options.getOptions(query)
                .then((items) => {
                    this.setState({
                        loading: false,
                        items: items
                    });
                })
                .catch(err => console.log(err));

        } else {
            this.setState({
                items: []
            });
        }
    }

    render() {
        const { items, values } = this.state;
        const { placeholder, options } = this.props;

        return (<Select onChange={this.onSelectChange} placeholder={placeholder} style={{width: '100%'}} clearable={true} size={'large'} value={values} multiple={true}
                        filterable={true} remote={true} remoteMethod={this.onSearch} loading={this.state.loading}>
            {
                items && items.map(el => {
                    return <Option key={el[options.key]} value={el[options.value]} label={el[options.value]} />;
                })
            }
        </Select>);
    }

}

export default AutoCompleteSelect;
