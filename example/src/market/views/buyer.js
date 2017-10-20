/**
 * Views are a collection of filter group objects
 */
import versionNetworks from '../filterGroups/version-networks';
import versionMetadata from '../filterGroups/version-metadata';
import versionDates from '../filterGroups/version-dates';

import search from '../filters/search';
import mapDictionary from  '../maps';
import config from '../config';

import DisplayItem from '../components/DisplayItem';

// import ExportIcon from '../components/ExportIcon';//icon component

export default {
    id:'buyer',
    label:'Buyer',
    enableRowChecks : false,
    writeQueryStringToURL: true,
    //displayType : 'display',//text [simple line item], display [image & details line item], or custom [Provide a simple component to the customDisplayTypeComponent prop below]
    displayType : 'custom',
    // Used to pass in the component when the displayType above is set to custom
    customDisplayTypeComponent : DisplayItem,//Component is passed <item={item} selectedView={selectedView}>
    enableGalleryLightbox : true,// Used by the 'display' displayType
    
    showTabsHeader :true,// filter view header
    showTabs :false,
    showListHeader : true,// List items header
    enableListSort:true,
    showListSettings : true,
    showResetFiltersButton : true,

    infoDisplaySettings : {
        showIconStrip : true,
        showShareLink : true,
        showPaginationData : true,
        iconComponents:[]// an array of simple component to display in this info section //ExportIcon
    },

    /**
     * Filter groups to include in the view
     */
    filterGroups:[versionMetadata,versionDates],

    /**
     * Need to specify the item property that is an item id
     */
    itemIdProp : 'entityUUID',

    /**
     * Entity types we are allowed to query/filter on for this view
     */
    listEntityTypes: ['olyplat-entity-catalog'],

    // @todo make render to a hook so we don't have to modify internals as needs arise
    renderTo:'store',//store is the default. IN the future we could render html, or to Meteor sessions, or anywhere else

    /**
     * Settings for how we make xhr requests
     */
    api:{
        url: config.buyerApiUrl,
        method:'POST',
        type:'rest',//rest,graphql

        /**
         * set to false to make non-tokened requests
         */
        // token:localStorage.getItem(config.tokenLocalStorageKey)
        token:(()=>window.OlyAuth.getToken())()
    },

    paginationTake : 20,// Amount to take for our pages

    /**
     * This controls where you link to when you click a list row, and how it behaves
     */
    link:{
        row:item=>`${config.itemLinkBaseUrl}/offer/${item.entityUUID}`,
        target:''//use '' or '_blank'
    },

    /**
     * Available item properties to the row. Also controls which props are visible by default or which are configurable
     * in the column settings
     *
     * `before` is a hook to transform the value (mostly for mapping) before rendering to the screen
     * `display` lets the datalist know that it should display that column on load. If it's false, it will not dipslay on load but will still be available to the column settings interface
     */
    props:[
        //@todo: if we define all props here that we want to make available in the column settings selector,
        // we can add a disable prop so it hides from the default render. This way we can control widths from outside the internal app
        {
            key:'state',
            label:'State',
            hasCopy:false,
            isDate:false,
            width:'5%',
            display: true,
            before : val=>val
        },
        {
            key:'title',
            label:'Title',
            hasCopy:false,
            isDate:false,
            width:'20%',
            display: true,
            before :val=>val
        },
        {
            key:'titleCode',
            label:'Title Code',
            hasCopy:true,
            isDate:false,
            width:'8%',
            display: true,
            before :val=>val
        },
        {
            key:'primaryGenreLabel',
            label:'Primary Genre',
            hasCopy:false,
            isDate:false,
            width:'8%',
            display: true,
            before :val=>val
        },
        {
            key:'primaryNetworkLabel',
            label:'Primary Network',
            hasCopy:false,
            isDate:false,
            width:'10%',
            display: true,
            before :val=>val
        },
        {
            key:'entityType',
            label:'Type',
            hasCopy:false,
            isDate:false,
            width:'10%',
            display: true,
            before :val=>mapDictionary('catalogEntityType',val)
        },
        {
            key:'entityCreated',
            label:'Created',
            hasCopy:false,
            isDate: true,
            width:'12%',
            display: true,
            before :val=>val
        },
        {
            key:'dateEdited',
            label:'Edited',
            hasCopy:false,
            isDate: true,
            width:'12%',
            display: false,
            before :val=>val
        },
        {
            key:'entityUUID',
            label:'Id',
            hasCopy:false,
            isDate: false,
            width:'12%',
            display: false,
            before :val=>val
        },
        {
            key:'country',
            label:'Country',
            hasCopy:false,
            isDate: false,
            width:'12%',
            display: false,
            before :val=>val
        },
        {
            key:'tagsLabel',
            label:'Tags',
            hasCopy:false,
            isDate: false,
            width:'12%',
            display: false,
            before :val=>val
        },
        {
            key:'hasArtworkAssets',
            label:'Artwork',
            hasCopy:false,
            isDate: false,
            width:'5%',
            display: false,
            before :val=>val
        },
        {
            key:'hasStillAssets',
            label:'Stills',
            hasCopy:false,
            isDate: false,
            width:'5%',
            display: false,
            before :val=>val
        },
        {
            key:'lastEditedBy',
            label:'Edited By',
            hasCopy:false,
            isDate: false,
            width:'12%',
            display: false,
            before :val=>(val && val.length > 0) ? val[0].role : val//identifier,role,email,dateEdited
        },
    ],

    /**
     * Addons are pseudo filter types that can be added to the view outside of a a filter group
     */
    addons : [
        search
    ],

    searchButton:{
        background: '#4db3d7',
        text: '#fff'
    }
};