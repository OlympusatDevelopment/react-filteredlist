# FilteredList

A very versatile Datalist component with filtering. It is very configurable with many hooks for utilizing the component's behaviors.
More specific documentation to come.


## Dependencies

Uses the universal-analytics package to track filtering
https://www.npmjs.com/package/universal-analytics


## Demo & Examples

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-filteredlist is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-filteredlist.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm i -S react-filteredlist
```


## Usage

It's important that you import the stylesheet either in your Javascript or in a script tag in the head of your document. Please note, your relative path may be different. Most likely...

```
var FilteredList = require('react-filteredlist');
import "../../../../node_modules/react-filteredlist/lib/main.css";

<FilteredList config={dataListConfig} />
```

__Or in ES6__

```
import FilteredList from 'react-filteredlist';
import "../../../../node_modules/react-filteredlist/lib/main.css";

<FilteredList config={dataListConfig} />
```

### Properties

__Config__
This component will not function without passing the config object to it. Please see dataListConfig.example.zip for an example config package/file.
You could pass just a large config object to the component, but it's advisable to use the dataListConfig folder structure as the configuration can be quite extensive.

Here is an example of most of what your config would need should you use a flat object instead of the provided folder structure:

```{
  "id": "main",
  "selector": "",
  "defaultView": "buyer",
  "writeQueryStringToURL": true,
  "runQueryStringURLOnRender": true,
  "filtersLabel": "",
  "pinPagination": true,
  "header": {
    "title": ""
  },
  "footer": {},
  "googleAnalyticsUAId": "UA-123456789",
  "dataList": {
    "height": "95vh",
    "paginationBottomPosition": "-9px"
  },
  "views": [
    {
      "id": "buyer",
      "label": "Buyer",
      "enableRowChecks": false,
      "writeQueryStringToURL": true,
      "displayType": "custom",
      "enableGalleryLightbox": true,
      "showTabsHeader": true,
      "showTabs": false,
      "showListHeader": false,
      "enableListSort": false,
      "showListSettings": false,
      "showResetFiltersButton": true,
      "infoDisplaySettings": {
        "showIconStrip": true,
        "showShareLink": true,
        "showPaginationData": true,
        "iconComponents": []
      },
      "filterGroups": [
        {
          "label": "Metadata",
          "defaultOpen": true,
          "accordian": {
            "color": {
              "background": "#4db3d7",
              "text": "#fff"
            }
          },
          "filters": [
            {
              "id": "genres",
              "type": "select",
              "prop": "genres",
              "label": "Genres",
              "value": null,
              "multiple": true,
              "options": {
                "key": "entityUUID",
                "value": "entityValue"
              }
            },
            {
              "id": "languages",
              "type": "select",
              "prop": "languages",
              "label": "Languages",
              "value": null,
              "multiple": true,
              "options": {
                "key": "entityUUID",
                "value": "entityValue"
              }
            },
            {
              "id": "hasStillAssets",
              "type": "select",
              "prop": "hasStillAssets",
              "label": "Has Stills",
              "value": null,
              "multiple": true,
              "options": {
                "key": "entityUUID",
                "value": "entityValue"
              }
            },
            {
              "id": "hasVideoAssets",
              "type": "select",
              "prop": "hasVideoAssets",
              "label": "Has Videos",
              "value": null,
              "multiple": true,
              "options": {
                "key": "entityUUID",
                "value": "entityValue"
              }
            },
            {
              "id": "hasArtworkAssets",
              "type": "select",
              "prop": "hasArtworkAssets",
              "label": "Has Artwork",
              "value": null,
              "multiple": true,
              "options": {
                "key": "entityUUID",
                "value": "entityValue"
              }
            }
          ]
        },
        {
          "label": "Dates",
          "defaultOpen": true,
          "accordian": {
            "color": {
              "background": "#4db3d7",
              "text": "#fff"
            }
          },
          "filters": [
            {
              "id": "dateCreated",
              "type": "range",
              "prop": "dateCreated",
              "label": "Date Created",
              "range": {
                "start": null,
                "end": null
              }
            },
            {
              "id": "dateEdited",
              "type": "range",
              "prop": "dateEdited",
              "label": "Date Edited",
              "range": {
                "start": null,
                "end": null
              }
            }
          ]
        }
      ],
      "itemIdProp": "entityUUID",
      "listEntityTypes": [
        "olyplat-entity-catalog"
      ],
      "renderTo": "store",
      "api": {
        "url": "http://.../dev/entity/olyplat-entity-catalog/get_all_for_state/_",
        "method": "POST",
        "type": "rest",
        "token": ""
      },
      "paginationTake": 20,
      "link": {
        "target": ""
      },
      "props": [
        {
          "key": "state",
          "label": "State",
          "hasCopy": false,
          "isDate": false,
          "width": "5%",
          "display": true
        },
        {
          "key": "title",
          "label": "Title",
          "hasCopy": false,
          "isDate": false,
          "width": "20%",
          "display": true
        },
        {
          "key": "titleCode",
          "label": "Title Code",
          "hasCopy": true,
          "isDate": false,
          "width": "8%",
          "display": true
        },
        {
          "key": "primaryGenreLabel",
          "label": "Primary Genre",
          "hasCopy": false,
          "isDate": false,
          "width": "8%",
          "display": true
        },
        {
          "key": "primaryNetworkLabel",
          "label": "Primary Network",
          "hasCopy": false,
          "isDate": false,
          "width": "10%",
          "display": true
        },
        {
          "key": "entityType",
          "label": "Type",
          "hasCopy": false,
          "isDate": false,
          "width": "10%",
          "display": true
        },
        {
          "key": "entityCreated",
          "label": "Created",
          "hasCopy": false,
          "isDate": true,
          "width": "12%",
          "display": true
        },
        {
          "key": "dateEdited",
          "label": "Edited",
          "hasCopy": false,
          "isDate": true,
          "width": "12%",
          "display": false
        },
        {
          "key": "entityUUID",
          "label": "Id",
          "hasCopy": false,
          "isDate": false,
          "width": "12%",
          "display": false
        },
        {
          "key": "country",
          "label": "Country",
          "hasCopy": false,
          "isDate": false,
          "width": "12%",
          "display": false
        },
        {
          "key": "tagsLabel",
          "label": "Tags",
          "hasCopy": false,
          "isDate": false,
          "width": "12%",
          "display": false
        },
        {
          "key": "hasArtworkAssets",
          "label": "Artwork",
          "hasCopy": false,
          "isDate": false,
          "width": "5%",
          "display": false
        },
        {
          "key": "hasStillAssets",
          "label": "Stills",
          "hasCopy": false,
          "isDate": false,
          "width": "5%",
          "display": false
        },
        {
          "key": "lastEditedBy",
          "label": "Edited By",
          "hasCopy": false,
          "isDate": false,
          "width": "12%",
          "display": false
        }
      ],
      "addons": [
        {
          "id": "search",
          "type": "search",
          "prop": "search",
          "label": "Search",
          "value": null
        }
      ],
      "searchButton": {
        "background": "#4db3d7",
        "text": "#fff"
      }
    }
  ],
  "hooks": {HOOK FUNCTIONS GO IN HERE},
  "graphql": {
    "catalog": {}
  }
}
```


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

Copyright (c) 2017 Adam Gedney.

