/**
 * This is the main config object that has pulled together all the sub configs.
 * COmponent level config goes here
 */
import dataList from './dataList';
import views from './views';
import hooks from './hooks';
import graphql from './graphql';

import {GOOGLE_UA_ID} from '../../config';

export default {
    id : 'main',//Must be unique if more than one list is displayed on a page
    selector : '',//not used
    defaultView : 'buyer',
    writeQueryStringToURL : true,
    runQueryStringURLOnRender : true,
    filtersLabel : '',
    pinPagination : true,// This pins pagination to the bottom of the container.
    notify : (message,type,position)=>{console.log(message,type,position);},//Swap out with the app's notification system to send notification
    header: {
        title:''
    },
    footer:{

    },
    googleAnalyticsUAId:GOOGLE_UA_ID,//false or a string UA Id
    dataList,
    views,
    hooks,
    graphql
}