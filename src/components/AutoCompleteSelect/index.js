import React, { Component } from 'react';
import { Select, i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';
import 'element-theme-chalk';
i18n.use(locale);
const { Option } = Select;

class AutoCompleteSelect extends Component{
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loading: false,
            value: []
        };
    }

    componentDidMount() {
        const {initialValues} = this.props;
        if (initialValues) {
            this.setState({items: initialValues});
        }
    }

    componentWillUnmount() {
        this.setState({ options: [] });
    }

    onSearch = (query) => {
        const { options } = this.props;

        if (query !== '') {
            this.setState({
                loading: true
            });
            options.getOptions(query)
                .then((items) => {
                    console.log(items);
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
        const { items } = this.state;
        const { options } = this.props;
        console.log(this.state.selected)
        return (<Select style={{width: '100%'}} clearable={true} size={'large'} value={this.state.value} multiple={true} filterable={true} remote={true} remoteMethod={this.onSearch} loading={this.state.loading}>
            {
                items && items.map(el => {
                    return <Option key={el[options.key]} value={el[options.value]} label={el[options.value]} selected={true} />;
                })
            }
        </Select>);
    }

}

export default AutoCompleteSelect;
