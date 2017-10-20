import Promise from 'bluebird';
import _utils from '../_utils';
import _ from 'underscore';

import config from '../config';

/**
 * Hook gets called when the xhr request returns successfully
 * @param body
 * @returns {*}
 */
export default body=>new Promise((resolve,response)=>{
    let _body = Object.assign({},body);

    //body.Items
    let opts = {
        method: 'POST',
        uri:config.assetsApiUrl,
        body: JSON.stringify({titleCodes:_body.Items.map(item=>item.titleCode)}),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Get the assets by title code and add them to the asset
    _utils.request(opts)
        .then(res=>{
            _body.Items = body.Items.map(item=>{
                item.assets = _.findWhere(res.Items,{titleCode:item.titleCode}).assets;
                return item;
            });

            resolve(_body);
        });
})