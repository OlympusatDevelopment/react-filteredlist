# React Filteredlist


## Datalist
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| addLabelText | string | 'Add "{label}"?' | text to display when `allowCreate` is true |
  
## Views
Views are higher level filters & datalist pairs that run independent of eachother. They are **rendered as tabs** above the filters sidebar when more than one view is present. Essentially they are sub instances of the entire component within the component.
| Property | Type | Default | Possible Values | Description |
|:---|:---|:---|:---|:---|
| id | string | '' | ''| The UNIQUE id of the view. |
| label | string | '' | ''| The display name for the view. Used by the tabs. |
| enableRowChecks | boolean | `false` | `true`,`false`| This switch shows the row checks (thus enabling the checked items queue functionality) on the built in 'display' and 'text' displayTypes.|
| writeQueryStringToURL | boolean | `false` | `true`,`false`| This switch controls if the filter query object can be written to the url for re-running the current state on page reload or share.|
| displayType | string | '' | 'text','display', 'custom'| Controls what to render on each of the datalist line item rows. Types: text [simple line item], display [image & details line item], or custom [Provide a React component to the customDisplayTypeComponent prop below and it will receive the row item in its props]|
| customDisplayTypeComponent | React component | undefined | undefined, React component| See the displayType property description for why this is used.|
| customContentPlaceholder | React component | '' | ''| Used for displaying a content placeholder component instead of a loading gif while the user waits for item data to load and populate the rows.|
| customContentPlaceholderAmount | int | undefined | undefined,int | Sets the number of content placeholder rows to render while loading data.|
| enableGalleryLightbox | boolean | `false` | `true`,`false`| Controls showing lightbox of the row image in the built-in display component when the user clicks the image. |
| showTabsHeader | boolean | `false` | `true`,`false`| Enables the container for the view tabs. |
| showTabs | boolean | `false` | `true`,`false`| Turn on and off displaying the view tabs. You need this to click to more than one view. You can still get to a view via the url query string (?view=myotherview), but there will be no ui to switch back-and-forth.|
| showListHeader | boolean | `false` | `true`,`false`| Turns on and off the datalist items column header. The header is good for text row views, but not applicable when using display components. This turns it off.|
| showSearch | boolean | `false` | `true`,`false`| Force hide the search component, even if it was provided as a special filter group(see filter groups below).|
| enableListSort | boolean | `false` | `true`,`false`| Switch the data list header click column name to sort behavior.|
| showListSettings | boolean | `false` | `true`,`false`| Shows/hides a list properties checkbox interface for showing and hiding datalist columns. It sits in the top right corner of the datalist.|
| showResetFiltersButton | boolean | `false` | `true`,`false`| Enables the reset filters link at the bottom of the filters sidebar UI.|
| showSaveFiltersInterface | boolean | `false` | `true`,`false`| Enables the user saved filterset interface. If set to false it will not show up even if you have the filterset filter group imported in your configuration. (See the filter groups documentation for details.)|
|  |  |  | | |
| infoDisplaySettings | object | undefined | undefined,{}| Container for the info display strip located at the top of the filters sidebar ui, just below the view tabs. It contains the share link icon and any other icons you want to pass in.|
| infoDisplaySettings.showIconStrip | boolean | `false` | `true`,`false`| Turn on and off the display of the icon strip. |
| infoDisplaySettings.showShareLink | boolean | `false` | `true`,`false`| Enables a prebuilt share link in the icon strip that will copy to clipboard the current url and any query string in it.|
| infoDisplaySettings.showPaginationData | boolean | `false` | `true`,`false`| Show data about the current page, total number of items, and loading status in the info bar. |
| infoDisplaySettings.iconComponents | array | undefined | undefined,[React component]| Accepts an array of React components to create icons for displaying in the info/icon bar. The component will receive the entire config and the selectedView data in its props. Useful for custom actions on the dataset. |
|  |  |  | | |
| filterGroups | array | undefined | undefined,[FilterGroup]| An array of Filter Group object. See filter groups documentation for details on their contents.|
| filterDefaults | object | undefined | undefined,{} | An object of keyed defaults collections. The key is the default property types and the value is a collection of items. These are made avialable to select filter item components. The select component will find the defaults collection that matches the filter item id it has set. |
| itemIdProp | string | '' | ''| The property containing the item id in the datalist item being rendered.|
| listEntityTypes | [] | undefined | undefined,[]| LEGACY. Most likely not used anymore. @todo this one.|
| renderTo | string | undefined | undefined,'store'| 'store' is the default. In the future we could render html, or to Meteor sessions, or anywhere else. |
|  |  |  | | |
| api | object | undefined | undefined,{} | Container for api settings used to make xhr requests|
| api.type | string | undefined | 'graphql','rest'| Request type to use. LEGACY: Everything is treated as rest and handled in the before XHR hook. @todo remove|
| api.url | string | undefined | ''| The endpoint url used to make requests for data. |
| api.method | string | undefined | 'POST','GET'| Request type. Usually POST.|
| api.xhrProxy | function | undefined | undefined, function | If not falsy, this get called instead of the filtered-list's internal xhr request library. The entire body of the request and the api options are passed through this function, you can make your xhr call, then use the callback to return your data. ***NOTE: This is the primary data entrypoint. The other entrypoint is the `pushDispatch` hook that allows pushing into the internal store.***|
| api.token | string | '' | undefined,''| provide a token to pass to the `authorization` headers on the xhr request. If falsy the filtered-list will make untokened requests.|
| api.onTokenNeedsRefresh | function | undefined | undefined, function| This hook gets called if the token provided failed to pass the token validation check just before trying to make the running request. This is an opportunity to refresh the token then call the callback and continue making the request.|
|  |  |  | | |
| link | object | undefined | undefined,object | Container for the datalist row item link settings.|
| link.row | function | undefined | undefined, function | This gets called when building the datalist item rows. The item is passed into the function and you need to return a link that the row item's anchor href will use when the user clicks a row item. |
| link.target | string | '' | '', '_blank'|  The row item link target settings. _blank opens the row item click in a new tab/window, '' opens it in place.|
|  |  |  | | |
| paginationTake | int | undefined | undefined,int | Sets the number of items to fetch on each paginated request. This is page size.|
| noResultsMessage | string | '' | ''| The message to display in the datalist container when the filter query returned no results.|
| usersSavedFiltersets | function | undefined | undefined, function | Must return a Promise containing a collection of items. This is how you populate the user saved filtersets select box options. In the hooks you can save to a database or local storage what the user saved then here you can retrieve it for option population.|
| props | array | undefined | undefined,[] | See the view props section below for an explaination of what goes in this array. |
| addons | array | undefined | undefined, [] | Addons are pseudo filter types that can be added to the view outside of a a filter group. These exist in the internal store a filters and can store state. e.g. The search filter item is a built-in addon filter type.|
|  |  |  | | |
| searchButton | object | undefined | undefined,object | Container for search button themeing options. |
| searchButton.background | string | '' | ''| Accepts a hex string to set the background color of the search button. |
| searchButton.text | string | '' | ''| Accepts a hex string to set the color of the search button text. |

## View Props
These are props objects that configure how default row text components display data.

Available item properties to the row. Also controls which props are visible by default or which are configurable in the column settings

*`before` is a hook to transform the value (mostly for mapping) before rendering to the screen
*`display` lets the datalist know that it should display that column on load. If it's false, it will not dipslay on load but will still be available to the column settings interface

| Property | Type | Default | Possible Values | Description |
|:---|:---|:---|:---|:---|
| key | string | '' | | |
| label | string | '' | | |
| mapTo | string | '' | | |
| hasCopy | boolean | `false` | `true`,`false`| |
| isDate | boolean | `false` | `true`,`false`| |
| isSortable | boolean | `false` | `true`,`false`| |
| width | string |  | | |
| display | boolean | `false` | `true`,`false`| |
| before | function |  | | |


## Filter Groups
Filter groups are objects that have group configuration properties and a collection of filters. ***Take note*** of the 'filterset' id option. If 'filterset' is the filter group's id, then a user save filters group is renders that provides an interface for allowin the user to create, list, and delete saved filtersets.

| Property | Type | Default | Possible Values | Description |
|:---|:---|:---|:---|:---|
| id | string | '' | '', 'filterset' | The UNIQUE id of the group of filters. See filtergroup description above about the 'filterset' id behavior. |
| label | string | '' | NA | The display label that will be shown to the user next to the chevron open/close icon. |
| defaultOpen | boolean | `false` | `true`,`false` | When true, the filter group accordian will be open by default, showing all the filters. False means the group renders closed and the user has to click the checron to reveal the filters in the group accordian. |
| accordian | object | {} | NA | OPtions for the themeing the filter group accordian display. |
| accordian.color | object | {} | NA | Container object for the color themeing options. |
| accordian.color.background | string | undefined | NA | Accepts a hexadecimal color string. Controls the accordian filter group title bar background color. |
| accordian.color.text | string | undefined | NA | Accepts a hexadecimal color string. Controls the accordian filter group title bar text & chevron background color. |
| filters | array | [] | NA | Takes an array of filter objects to render inside it's accordian. See filters description below. |

### Examples
#### Filter group object
```
import sortCreatedDate from "../filters/sort-createdDate";

export default {
    id:'sorting',
    label : 'Sort by',
    defaultOpen: false,
    accordian:{ 
        color:{
            background: 'transparent',
            text:'#98999a'
        }
    },
    filters:[ sortCreatedDate ]
};
```

#### Special user filterset group
```
export default {
    id:'filterset',// This exact id is necesary to render the user save filterset interface as a group.
    label : 'Filters',
    defaultOpen: true,
    accordian:{ 
        color:{
            background: 'transparent',
            text:'#98999a'
        }
    },
    filters:[]
};
```

## Filters
Used to take action on the dataset. Primary items used in building a query object that gets passed to the hooks and is used for writing the query string to the url. The id key becomes the property key in the `queryObject`.

| Property | Type | Default | Possible Values | Description |
|:---|:---|:---|:---|:---|
| id | string | '' | NA | The id of the filter. Must be UNIQUE. |
| type | string | 'select' | 'select', 'range', 'checkbox', 'search', 'sort' | This determines what type of filter item will be rendered. ***Special NOTE:*** Search type is a special filter that will render a search box where anything input will be passed as the value of a search filter property on the final object. The sort type is also special. It enables a sort toggle & request for the specified id/prop property. |
| prop | string | '' | NA | Essentially the same as id. Just match this to the id until the api changes, then we'll handle that by default. |
| label | string | '' | NA |  The filter item's Label property. THis displays to the user above the filter item.|
| value | string/null/undefined | null | [{},{},{}] | Use this to set a default value. Value must be null or undefined to be excluded. (Filters recognize boolean true/false. An collection matching the select filter type can be passed to pre-populate the value. |
| multiple | boolean | `false` | `true`,`false` | For select filter types, this allows the select to be a multi select when set to `true`|
| options | object | {} |  {},falsy | ***For 'select' & 'checkbox' type only:*** The select type filter item's options handling. This takes care of property matching items so they can fill the value of the options element. |
| options.key | string | '' |  NA | This is the select box options item's key(property) to use for the option element's value property. |
| options.value | string | '' | NA | This is the select box options item's Label/Text to use in the option item's display. |
| options.getOptions | function/null/undefined | NA |  NA | This function must return a promise if using it for a select box and a collection if using it for a checkbox. It should return a collection to populate the select item's options. The items should have the properties specified in the key/value mapping above. |
| range | object | {} | {},falsy | ***For 'range' type only:*** Range type settings and defualts. |
| range.start | UNIX timestamp | null | UNIX timestamp, null | Sets the start time value for the range calendar in seconds.  |
| range.end | UNIX timestamp | null | UNIX timestamp, null | Sets the end time value for the range calendar in seconds.  |

### Examples
#### Select filter type
```
export default {
  id: 'countries',
  type:'select',
  prop: 'countries',
  label: 'Countries',
  value:null,
  multiple : true,
  options : {
      key : 'myPropId',
      value : 'myPropValue',
      getOptions : new Promise((resolve,reject)=>{
        resolve([
          {myPropId : 1, myPropValue: "Canada"},
          {myPropId : 2, myPropValue: "United States"},
          {myPropId : 3, myPropValue: "Mexico"}
        ]);
      })
  },
};
```

#### Range filter type
```
export default {
    id: 'dateAvailable',
    type:'range',
    prop: 'dateAvailable',
    label: 'Dates Available',
    range:{
        start: 1520355600000 || null,
        end: 1520355600000 || null,
    }
};
```

#### Checkbox filter type
```
export default {
    id: filterKey,
    type:'checkbox',
    prop: filterKey,
    label: 'Rights Type', 
    value:null,
    multiple : true,
    options : {
        key : 'externalId',
        value : 'entityValue',
        getOptions : ()=>[
            {externalId:'true',entityValue:'Exclusive'},
            {externalId:'false',entityValue:'Non-Exclusive'}
        ]
    }
};
```

#### Search filter type
```
export default {
    id: 'search',
    type:'search',
    prop: 'search',
    label: 'Search',
    value:null,
};
```

#### Sort filter type
```
export default {
    id: filterKey,
    type:'sort',
    prop: filterKey,
    label: '',
    value:null
};
```

## Hooks