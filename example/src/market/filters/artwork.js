import Promise from 'bluebird';
import _utils from '../_utils';

const filterKey = 'hasArtworkAssets';

export default {
    id: filterKey,
    type:'select',
    prop: filterKey,
    label: 'Has Artwork',
    value:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'entityUUID',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>new Promise((resolve,reject)=>{
            resolve(_utils.defaults.appendToCollection(filterKey,[
                {entityUUID:'yes',entityValue:'True'},
                {entityUUID:'no',entityValue:'False'}
            ])[filterKey]);
        })
    }
};