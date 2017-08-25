import territory from '../filters/territory';
import dateAvailable from '../filters/dateAvailable';
import rightsTypes from '../filters/rightsTypes';

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Rights Type',
    defaultOpen: true,
    accordian:{
        color:{
            background: 'transparent',
            text:'#4ab2cd'
        }
    },
    filters:[
        territory,
        dateAvailable,
        rightsTypes
    ]
};