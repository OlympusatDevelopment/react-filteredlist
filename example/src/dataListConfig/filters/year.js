import Promise from 'bluebird';
import _utils from '../_utils';

const filterKey = 'year';

const currDate = new Date();
const years = [];

for(let i = currDate.getFullYear() ; i > 1929 ; i--) {
    years.push({entityType: i, entityValue: i});
}


export default {
    id: filterKey, //@todo api should be taking prop value
    type:'select',
    prop: filterKey, // property sent to api for filtering
    label: 'Year',
    value: null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple: true,
    options : {
        key : 'entityType',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>new Promise((resolve,reject)=>{
            resolve(_utils.defaults.appendToCollection(filterKey,
                years
            )[filterKey]);
        })
    }
};