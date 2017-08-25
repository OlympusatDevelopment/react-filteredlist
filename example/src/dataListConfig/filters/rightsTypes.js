import Promise from 'bluebird';
import _utils from '../_utils';

const filterKey = 'rightsType';

export default {
    id: filterKey,
    type:'checkbox',
    prop: filterKey,
    label: 'Rights Type', 
    value:null,//[]  or null : use this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    multiple : true,
    options : {
        key : 'entityUUID',
        value : 'entityValue',

        // Must return a collection
        getOptions : ()=>[
            {entityUUID:'0',entityValue:'Exclusive'},
            {entityUUID:'1',entityValue:'Non-exclusive'},
            {entityUUID:'2',entityValue:'Broadcast'}
        ]
    }
};