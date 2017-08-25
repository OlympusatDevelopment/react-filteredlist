import showType from "../filters/showType";

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Content Type',
    defaultOpen: true,
    accordian:{
        color:{
            background: 'transparent',
            text:'#4ab2cd'
        }
    },
    filters:[
        showType
    ]
};