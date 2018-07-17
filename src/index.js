var React = require('react');
import App from './App';
var pjson = require('../package.json');

/** Style loading */
import './style/main.scss';

if(window.Oly && window.Oly.debugMode) {
  console.log(`react-filteredlist | version ${pjson.version}`);
}

class FilteredList extends React.Component{
	render () {
		return (<App config={this.props.config} pushDispatch={this.props.pushDispatch}/>); 
	}
}

export default FilteredList;
