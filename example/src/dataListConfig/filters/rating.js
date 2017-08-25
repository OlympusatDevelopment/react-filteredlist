import Promise from 'bluebird';
import _utils from '../_utils';

export default {
    id: 'rating',
    type:'select',
    prop: 'rating',
    label: 'Rating',
    value:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'entityUUID',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>new Promise((resolve,reject)=>{
            return _utils.getDefaults('ratings')
                .then(resolve)
        })
    }
};