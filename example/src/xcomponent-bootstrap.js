/**
 * http://krakenjs.com/xcomponent/docs/example.html
 */
var xcomponent = require('./xcomponent.js');
var FilteredListComponent = xcomponent.create({
  tag: 'react-filteredlist',
  url:'http://react.filteredlist.demo.s3-website-us-east-1.amazonaws.com',
  dimensions: {
    width: '100%',
    height: "600px"
  },
  props: {
      config: {
          type: 'object',
          required: true
      }
  }
});