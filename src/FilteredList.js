var React = require('react');
import DataList from './app--component';
var pjson = require('../package.json');

console.log(`react-filteredlist | version ${pjson.version}`);

class FilteredList extends React.Component{
	render () {
		return (<DataList config={this.props.config}/>); 
	}
}

export default FilteredList;
