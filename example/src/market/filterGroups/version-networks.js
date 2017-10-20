import networks from '../filters/networks';

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Networks',
    defaultOpen: true,
    accordian:{
        color:{
            background: '#105caa',
            text:'#fff'
        }
    },
    filters:[
        networks
    ]
};