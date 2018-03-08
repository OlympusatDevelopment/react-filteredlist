# React Filteredlist


## Datalist
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| addLabelText | string | 'Add "{label}"?' | text to display when `allowCreate` is true |
  
## Views
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| addLabelText | string | 'Add "{label}"?' | text to display when `allowCreate` is true |

## Filter Groups
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| addLabelText | string | 'Add "{label}"?' | text to display when `allowCreate` is true |

## Filters
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