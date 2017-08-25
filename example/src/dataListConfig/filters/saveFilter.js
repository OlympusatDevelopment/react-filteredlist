import Promise from 'bluebird';
import _utils from '../_utils';

const filterKey = 'filter';

export default {
    id: filterKey, //@todo api should be taking prop value
    type:'select',
    prop: filterKey, // property sent to api for filtering
    label: '',
    value:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'filterID',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>new Promise((resolve,reject)=>{
            resolve(_utils.defaults.appendToCollection(filterKey,[
                {filterID:'1', entityValue:'Filter 1'}
            ])[filterKey]);
        })
    }
};