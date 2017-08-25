import Promise from 'bluebird';
import _utils from '../_utils';

export default {
    id: 'director',
    type:'select',
    prop: 'director',
    label: 'Director',
    value:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'entityUUID',
        value : 'entityValue',

        // Must return a promise containing a collection
        getOptions : _utils.getDefaults.bind(_utils.getDefaults,'directors')
    }
};