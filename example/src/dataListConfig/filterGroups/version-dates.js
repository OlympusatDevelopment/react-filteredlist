import dateCreatedRange from '../filters/dateCreatedRange';
import dateEditedRange from '../filters/dateEditedRange';

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Dates',
    defaultOpen: true,
    accordian:{
        color:{
            background: 'transparent',
            text:'#4ab2cd'
        }
    },
    filters:[
        dateCreatedRange,
        dateEditedRange
    ]
};