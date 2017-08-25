import Promise from 'bluebird';
import _utils from '../_utils';

export default {
    id: 'territories',
    type:'select',
    prop: 'territories',
    label: 'Territories Available',
    value:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'entityUUID',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>new Promise((resolve,reject)=>{
            return _utils.getDefaults('territories')
                .then(resolve)
        })
    }
};/**
 * Created by erica on 7/6/17.
 */
