import saveFilter from '../filters/saveFilter';

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Filters',
    defaultOpen: true,
    accordian:{
        color:{
            background: 'transparent',
            text:'#4ab2cd'
        }
    },
    filters:[ 
        saveFilter
    ]
};