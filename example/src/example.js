var React = require('react');
var ReactDOM = require('react-dom');
var FilteredList = require('react-filteredlist');

import config from './dataListConfig';

class App extends React.Component{
	render () {
		return (
			<div>
				<FilteredList config={config}/> 
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
