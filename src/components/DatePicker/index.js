import React, {PureComponent} from 'react';
import ReactDatePicker from "react-datepicker";

class DatePicker extends PureComponent {
	constructor(props) {
		super(props);
	}
	
	render() {
		const {id, placeholderText, className, selected, onChange} = this.props;
		return (<ReactDatePicker selected={selected || null} onChange={onChange} id={id} placeholderText={placeholderText} className={className} autoComplete={'off'} />);
	}
}

export default DatePicker;
