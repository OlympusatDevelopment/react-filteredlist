import _ from 'underscore';
import mapDictionary from '../maps';

/**
 * Hook gets called just before the xhr request.
 * It passes through the entire xhr params & the request body data raw
 * @returns {*}
 */
export default (obj,requestOptions)=>{

    let apiSchema={
        conditions:[
            //{
            //	key:'',
            //	value:''
            //}
        ],
        sort:[
            //{
            //	key:'',
            //	value:''
            //}
        ],
        queryString:''
    };

    //console.log('BEFORE XHR', obj.queryObject);
    _.mapObject(obj.queryObject,(value,ky)=>{
        let key = mapDictionary('entityProp',ky);

        switch(key){
            case 'hasArtworkAssets' :
            case 'hasStillAssets' :
            case 'hasVideoAssets' :
                apiSchema.conditions.push({key,value:value === 'yes'});
                break;
            case'search':
                apiSchema.queryString = value;
                break;
            case'isLegacy':
                apiSchema.conditions.push({key,value:value === 'legacy'});
                break;
            case'secondaryNetworks':
                apiSchema.conditions.push({key:'networks',value});
                break;
            default:
                // Format the date to match the API
                if(key.indexOf('sort') > -1){// handle sort filters
                    const sortSegments = key.split('-');

                    apiSchema.sort.push({key:sortSegments[1],value:value || 'desc'});
                } else if(key.toLowerCase().indexOf('created') > -1 || key.toLowerCase().indexOf('edited') > -1){
                    if((value.start || value.end)){//exclude nulls
                        let r = null;

                        // If conditions already has our prop, add the new param
                        if(_.findWhere(apiSchema.conditions,{key})){
                            // Get the index of our prop in the conditions array, update it.
                            const index = _.findIndex(apiSchema.conditions,{key});
                            r = apiSchema.conditions[index].range;

                            apiSchema.conditions[index].range = Object.assign({},r,value);//Value is an object with .start & .end for ranges

                        }else{// Create the data prop
                            apiSchema.conditions.push({key,range:value});
                        }
                    }
                }else{

                    // Handle unknown & dynamic props
                    apiSchema.conditions.push({key,value});
                }
                break;
        }
    });

    //console.log('AFTER BEFORE XHR MUTATION', apiSchema);

    return {data:Object.assign({},obj,{queryObject:apiSchema}), xhrOptions:requestOptions};
}