import _ from 'underscore';
import queries from './queries';
import Promise from 'bluebird';

/**
 * Executing switch that also routes how to make the request
 * @param _state
 * @param options
 */
function runFilters(_state,options){
    return new Promise((resolve,reject)=>{
        return queries.makeXHRRequest(_state,options)
                    .then(res=>_render(res,options,_state))
                    .catch(reject);

        // switch(options.api.type){
        //     // case 'graphql' :
        //     //     queries.makeGraphQLRequest(_state,options)
        //     //         .then(res=>_render(res,options,_state))
        //     //         .catch(reject);
        //     //     break;
        //     case 'rest' :
        //     default:
        //         return queries.makeXHRRequest(_state,options)
        //             .then(res=>_render(res,options,_state))
        //             .catch(reject);
        // }
    });
}

/**
 * Render with the method set by the main config options object
 * @param items
 * @param options
 * @returns {Promise}
 */
function _render(xhrResponse,options,_state){
    return new Promise((resolve,reject)=>{
        switch(options.renderTo){
            case 'store':
            default:

               // EMit an event containing the data to be added to the store
                // EVent is picked up in the App/index.js component constructor
                var elem = document,
                    event = elem.createEvent('Event');
                event.initEvent('renderToStore', true, true); //can bubble, and is cancellable
                event.data = xhrResponse;
                document.dispatchEvent(event);

                break;
        }
    });
}

export default {
    run:runFilters
};