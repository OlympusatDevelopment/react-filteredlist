/**
 * Import any custom maps here, then add them to the library
 *
 * Usage:
 * import mapDictionary from  '../maps';
 * mapDictionary('catalogEntityType',item.entityType)
 */
import catalogEntityType from './catalog';
import entityProp from './entityProp';

const library = {
    catalogEntityType,
    entityProp
};

/**
 * Mapper does a lookup both ways (value->value,value->key), then defaults to just returning the value if there was
 * no match in the specified dictionary
 * @param dictionary
 * @param value
 * @returns {*}
 */
export default (dictionary,value)=>{
    let key = false;
    const dict = library[dictionary];//evaluates to a dictionary import

    if(dict){
        for(let k in dict){
            key = dict[k] === value ? k : false;
        }

        return key || dict[value] || value;
    }

    return value;
};