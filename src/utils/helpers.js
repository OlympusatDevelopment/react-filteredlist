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
	
	console.log(cssGridStyles.join(' '))
	return cssGridStyles.join(' ');
}