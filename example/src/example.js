var React = require('react');
var ReactDOM = require('react-dom');
var FilteredList = require('react-filteredlist').default;

import config from './market';   

class App extends React.Component{ 
	render () { 
    console.log(FilteredList);
		return ( 
			<div>
				<FilteredList config={config}/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
