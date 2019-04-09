import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * Filter input action buttons
 * Add the action button here instead of creating a
 * new folder and files
 */
const ActionButtons = ({ clearInputValue }) =>
	<span className="dl__filterItemDimension__buttons">
		<span className="dl__filterItemDimension__buttons-clear" onClick={clearInputValue}><i className="fa fa-times-circle fa-lg"></i></span>
		<button type="submit" value="Search" className="dl__filterItemDimension__buttons-search"><i className="fa fa-check fa-lg"></i></button>
	</span>;

class AssetDimensions extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: null,
			width: '',
			height: '',
			widthInputFocused: false,
			heightInputFocused: false
		};
		
		this._handleOnFocus = this._handleOnFocus.bind(this);
		this._handleOnChange = this._handleOnChange.bind(this);
		this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this._handleInputClear = this._handleInputClear.bind(this);
		this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this.handleOnUpdateQueryValues = this.handleOnUpdateQueryValues.bind(this);
	}
	
	
	static getDerivedStateFromProps(props, state) {
		if(props.value !== state.value) {
			return { value: props.value}
		}
		return null;
	}
	
	componentDidMount() {
		this.handleOnUpdateQueryValues()
	}
	
	handleOnUpdateQueryValues() {
		const { value } = this.state;
		try {
			const values = value && JSON.parse(decodeURIComponent(value)) || {width: '', height: ''};
			this.setState({width: values.width, height: values.height});
		} catch (e) {
			console.log(e)
		}
	}
	
	_handleOnFocus(e) {
		// Get form input name and closest container id
		const {value, name} = e.target;
		
		// update input state based on the input focused
		value && value.toString().length > 0 && this.setState({[`${name}InputFocused`]: true});
	}
	
	_handleOnChange(e) {
		const {value, name} = e.target;
		this.setState({[name]: parseInt(value), [`${name}InputFocused`]: (value.length > 0)});
	}
	
	_handleFormSubmit(e) {
		e.preventDefault();
		
		this._handleOnFilterChange();
	}
	
	_handleInputClear(e) {
		const parentElem = e.target.closest('.dl__filterItemDimension-container'),
			input = parentElem.querySelector('input[type="number"]'),
			{name} = input;
		
		this.setState({[name]: '', isFocused: false},
			() => this._handleOnFilterChange());
	}
	
	_handleOnFilterChange() {
		const {filterChange, id, selectedView} = this.props,
			{width, height} = this.state;
		
		let values = {};
		width && width.toString().length > 0 && (values.width = width);
		height && height.toString().length > 0 && (values.height = height);
		
		filterChange({
			id,
			selectedView: selectedView.id,
			value: JSON.stringify({...values})
		});
	
	}
	
	render() {
		const {width, height, heightInputFocused, widthInputFocused} = this.state;
		const inputActions = {
			onChange: this._handleOnChange
		}
		return (<div className="dl__filterItemDimension">
			<form autoComplete="off" onSubmit={this._handleFormSubmit}>
				<div className="dl__filterItemDimension-container" onFocus={this._handleOnFocus}>
					<input type="number" data-lpignore="true" name="width" placeholder="Width" value={width || ''} {...inputActions} />
					{ widthInputFocused && <ActionButtons clearInputValue={this._handleInputClear} /> }
				</div>
				<span className="dl__filterItemDimension-separator">X</span>
				<div className="dl__filterItemDimension-container" onFocus={this._handleOnFocus}>
					<input type="number" data-lpignore="true" name="height" placeholder="Height" value={height || ''} {...inputActions}  />
					{ heightInputFocused && <ActionButtons clearInputValue={this._handleInputClear} /> }
				</div>
			</form>
		</div>);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(AssetDimensions);
