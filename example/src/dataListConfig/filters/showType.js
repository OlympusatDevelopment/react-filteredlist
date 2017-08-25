import Promise from 'bluebird';
import _utils from '../_utils';

const filterKey = 'entityType';

export default {
    id: filterKey, //@todo api should be taking prop value
    type:'select',
    prop: filterKey, // property sent to api for filtering
    label: 'Show Type',
    value:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'entityType',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>new Promise((resolve,reject)=>{
            resolve(_utils.defaults.appendToCollection(filterKey,[
                {entityType:'olyplat-entity-movie', entityValue:'Movies'},
                {entityType:'olyplat-entity-series', entityValue:'Series'},
            ])[filterKey]);
        })
    }
};