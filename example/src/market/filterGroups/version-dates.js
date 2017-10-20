import dateCreatedRange from '../filters/dateCreatedRange';
import dateEditedRange from '../filters/dateEditedRange';

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Dates',
    defaultOpen: false,
    accordian:{
        color:{
            background: '#4db3d7',
            text:'#fff'
        }
    },
    filters:[
        dateCreatedRange,
        dateEditedRange
    ]
};