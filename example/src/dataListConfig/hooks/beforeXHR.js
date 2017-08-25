// import graphql from '../../../../modules/Marketspace/graphql'

/**
 * Hook gets called just before the xhr request.
 * It passes through the entire xhr params & the request body data raw
 * @returns {*}
 */
export default (obj,requestOptions)=>{
    // return {data:{queryObject:graphql.offers.list()}, xhrOptions:requestOptions}
    return {data:{queryObject:obj}, xhrOptions:requestOptions}
}