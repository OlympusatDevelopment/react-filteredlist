import validator from 'validator';
import utils from '../utils'

/***
 * Creates a css grid style for css grid.
 * @param props
 * @param enableRowChecks
 * @param gridColumnMinMaxWidth
 * @param rowChecksWidth
 * @returns {*}
 */

export const makeCssGridLayout = (props, enableRowChecks, gridColumnMinMaxWidth = 'minmax(100px, 1fr)', rowChecksWidth = '40px', ) => {
	let cssGridStyles = props.reduce((acc, curr) => {
		return acc.concat(curr.display ? (curr.width || gridColumnMinMaxWidth) : gridColumnMinMaxWidth);
	}, []);
	
	if(enableRowChecks) {
		cssGridStyles.unshift(rowChecksWidth);
	}
	
	return cssGridStyles.join(' ');
}



/***
 * Validates the input value and returns if the value is valid
 * @param value
 * @param validator
 * @returns {Boolean}
 */
const validators = {
	number: validator.isNumeric,
	date: validator.isDate,
}
export const restricInptValidator = (value, validator = 'text') => {
	
	if(validator && validator === 'text') {
		return true;
	}
	
	if(!validators.hasOwnProperty(validator)) {
		console.warn('Invalid input validator.');
		return false;
	}
	
	return validators[validator](value);
}