import React, {Component} from 'react';
import flatpickr from "flatpickr";
import moment from 'moment';

class DatePicker extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			startDate: null,
			endDate: null
		}
		
		this._onChange = this._onChange.bind(this)
	}
	
	static getDerivedStateFromProps(props, state) {
		if(state.selected !== props.selected) {
			const {
				selected,
				id,
				placeholderText,
				className
			} = props;
			return {selected, id, placeholderText, className};
		}
		
		return null;
	}
	
	_onChange(selectedDates) {
		const date = selectedDates[0];
		this.setState({ startDate: date});
	};
	
	componentDidMount() {
		const self = this,
			{id, selected } = this.state,
			defaultDate = selected ? moment(selected).toISOString() : '';
		
		flatpickr(`#${id}`, {
			allowInput: true,
			dateFormat: 'm/d/Y',
			defaultDate,
			onChange: self.props.onChange
		});
	}
	
	render() {
		const {id, placeholderText, className} = this.state;
		return (<input type="text" id={id} placeholder={placeholderText} className={className}/>);
	}
}

export default DatePicker;
