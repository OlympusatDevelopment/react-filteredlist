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

export const makeCssGridLayout = (props, enableRowChecks, gridColumnMinMaxWidth = 'minmax(50px, 1fr)', rowChecksWidth = '40px', ) => {
	let cssGridStyles = props
		.filter(({ display }) => display)
		.reduce((acc, curr) => {
		return acc.concat(curr.width || gridColumnMinMaxWidth);
	}, []);
	
	if(enableRowChecks) {
		cssGridStyles.unshift(rowChecksWidth);
	}
	
	return cssGridStyles.join(' ');
}



/***
 * Validates the input value and returns a boolean of valid or invalid
 * @param value
 * @param validator
 * @returns {Boolean}
 */
const validators = {
	number: validator.isNumeric,
	date: validator.isDate,
}

export const InputValidator = (value, validator = 'text') => {
	
	if(validator && validator === 'text') {
		return true;
	}
	
	if(!validators.hasOwnProperty(validator)) {
		console.warn('Invalid input validator.');
		return false;
	}
	
	return validators[validator](value);
}