import Promise from 'bluebird';
import _utils from '../_utils';

export default {
    id: 'primaryNetwork',
    type:'select',
    prop: 'primaryNetwork',
    label: 'Primary Network',
    value:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'entityUUID',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>new Promise((resolve,reject)=>{
            return _utils.getDefaults('networks')
                .then(resolve)
        })
    }
};