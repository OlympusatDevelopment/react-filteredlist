'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Replaces an item [object] (or adds it if it wasn't there already) in a collection at the same index it was taken out from.
 * Returns a new copy of the array passed in.
 * @param arr
 * @param newItem
 * @param onProp
 */
function replaceItem(arr, newItem, onProp) {
    var temp_arr = arr || [],
        temp_newItem = newItem;
    var item = _underscore2.default.findWhere(temp_arr, _defineProperty({}, onProp, temp_newItem[onProp]));

    if (item) {
        // get index of item in array
        var i = _underscore2.default.findIndex(temp_arr, function (record) {
            return record[onProp] === temp_newItem[onProp];
        });

        // Remove item from array
        temp_arr.splice(i, 1);

        // add new item in at same index
        temp_arr.splice(i, 0, temp_newItem);
    } else {

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
function removeItem(arr, item, onProp) {
    return _underscore2.default.reject(arr, function (record) {
        return record[onProp] === item[onProp];
    });
}

exports.default = {
    replaceItem: replaceItem,
    removeItem: removeItem
};