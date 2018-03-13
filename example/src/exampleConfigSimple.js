export default {
  id: 'main',
  selector: '',
  parentStore: false,
  defaultView: 'buyer',
  writeQueryStringToURL: true,
  runQueryStringURLOnRender: true,
  showFilters: true,
  filtersLabel: '',
  pinPagination: true,
  notify: (message, type, position) => { console.log(message, type, position); },
  header: {
    title: ''
  },
  footer: {},
  googleAnalyticsUAId: false,
  dataList:{
    height: undefined,
    paginationBottomPosition: '36px'
  },
  views: [
    {
      id: 'buyer',
      label: 'Buyer',
      enableRowChecks: false,
      writeQueryStringToURL: true,
      displayType: 'text',

      customDisplayTypeComponent: false,
      customContentPlaceholder: false,
      customContentPlaceholderAmount: 20,

      enableGalleryLightbox: true,
      showTabsHeader: false,
      showTabs: true,
      showListHeader: true,
      showSearch: true,
      enableListSort: true,
      showListSettings: true,
      showResetFiltersButton: true,
      showSaveFiltersInterface: true,

      infoDisplaySettings: {
        showIconStrip: true,
        showShareLink: true,
        showPaginationData: true,
        iconComponents: []
      },
      filterGroups: [
        {
          id:'sorting',
          label : 'Sort by',
          defaultOpen: false,
          accordian:{ 
              color:{
                  background: 'transparent',
                  text:'#98999a'
              }
          },
          filters:[ 
            {
              id: "sort-createdDate",
              type:'sort',
              prop: 'sort-createdDate',
              label: '',
              value:null
            } 
          ]
        }
      ],
      filterDefaults:[],
      itemIdProp: 'entityUUID',
      listEntityTypes: ['olyplat-entity-catalog'],
      renderTo: 'store',
      api: {
        type: 'graphql',
        url: "http://localhost",
        method: 'POST',
        xhrProxy: ({ uri, body }, cb) => {
            cb();
        },
        token: (() => localStorage.getItem('id_token'))(),
        onTokenNeedsRefresh: cb => {cb();}
      },
      paginationTake: 25,
      link: {
        row: item => `http://localhost:8000/item/${item.externalId}`,
        target: ''//use '' or '_blank'
      },
      noResultsMessage: "No items found",
      usersSavedFiltersets: () => new Promise((resolve, reject) => {
        resolve();
      }),
      props: [ 
        {
          key:'image',
          label:'Image',
          mapTo : {},
          hasCopy:false,
          isDate: false,
          isSortable : true,
          width:'33%',
          display: true,
          before :(val,item)=>val
        },
        {
          key:'entityUUID',
          label:'Id',
          mapTo : {},
          hasCopy:false,
          isDate: false,
          isSortable : true,
          width:'33%',
          display: true,
          before :(val,item)=>val
        },{
          key:'title',
          label:'Title',
          mapTo : {},
          hasCopy:false,
          isDate: false,
          isSortable : true,
          width:'33%',
          display: true,
          before :(val,item)=>val
        },
      ],
      addons: [{
        id: 'search',
        type:'search',
        prop: 'search',
        label: 'Search',
        value:null,
      }],
      searchButton: {
        background: '#4db3d7',
        text: '#fff'
      }
    }
  ],
  hooks: {
    beforeXHR: (data, xhrOptions, requestData) => {return {data, xhrOptions}},
    onXHRSuccess: (body,resolve,reject)=> { resolve( {
      Items: [
        {
          entityUUID: '0234',
          title: "Item 1",
          image: 'http://fillmurray.com/200/300'
        },
        {
          entityUUID: '023s4',
          title: "Item 2",
          image: 'http://fillmurray.com/200/300'
        },{
          entityUUID: '02g34',
          title: "Item 3",
          image: 'http://fillmurray.com/200/300'
        },
        {
          entityUUID: '02jh34',
          title: "Item 4",
          image: 'http://fillmurray.com/200/300'
        },
        {
          entityUUID: '023r4',
          title: "Item 5",
          image: 'http://fillmurray.com/200/300'
        }
    ],
      total: 5
    });
    },
    onXHRFail: (err,body)=>body,
    onCheck: ({item,workspaceItems})=>item,
    onUnCheck: ({item,workspaceItems})=>item,
    onStateUpdate: state => {},
    onInit: app=>{},
    onSaveFilterset: ({name,queryString,queryObject})=>{},
    onDeleteFilterset: ({name,filterset})=>{},
    // pushDispatch: cb => { cb(); }
  }
};