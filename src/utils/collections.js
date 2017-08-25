import _ from 'underscore';

/**
 * Replaces an item [object] (or adds it if it wasn't there already) in a collection at the same index it was taken out from.
 * Returns a new copy of the array passed in.
 * @param arr
 * @param newItem
 * @param onProp
 */
function replaceItem(arr,newItem,onProp){
    let temp_arr = arr || [],
        temp_newItem = newItem;
    const item = _.findWhere(temp_arr,{[onProp]:temp_newItem[onProp]});

    if(item){
        // get index of item in array
        let i = _.findIndex(temp_arr,record=>{
            return record[onProp] === temp_newItem[onProp];
        });

        // Remove item from array
        temp_arr.splice(i, 1);

        // add new item in at same index
        temp_arr.splice(i, 0, temp_newItem);
    }else{

        // Add item if the item wasn't already in the collection
        temp_arr.push(temp_newItem);
    }

    return temp_arr;
}

/**
 * Removes an item from the array
 * @param arr
 * @param item
 * @param onProp
 * @returns {*}
 */
function removeItem(arr,item,onProp){
    return _.reject(arr,record=>{
        return record[onProp] === item[onProp];
    });

}

export default {
    replaceItem,
    removeItem
};