import xhr from 'xhr';
import Promise from 'bluebird';
import _ from 'underscore';

import config from '../config';

export default {
    convertUNIXToHumanDate(UNIX_timestamp,withoutTime){
        if (UNIX_timestamp == undefined) { return '';}
        if (UNIX_timestamp.toString().length < 12) { UNIX_timestamp = UNIX_timestamp * 1000;}//Convert seconds to ms

        const a       = new Date(+UNIX_timestamp);
        let options = {
            weekday: "short", year: "numeric", month: "short",
            day                                     : "numeric", hour: "2-digit", minute: "2-digit"
        };

        if(withoutTime){
            return a.toLocaleDateString();
        }

        return a.toLocaleTimeString("en-us", options);
    },
    getDefaults : (type)=>new Promise((resolve,reject)=>{
        let defaults = localStorage.getItem('dl.defaults');
        const bool = [
            {entityUUID:'yes',entityValue:'True'},
            {entityUUID:'no',entityValue:'False'}
        ],
        defaultsAppends ={
            hasArtworkAssets : bool,
            hasStillAssets : bool,
            hasVideoAssets : bool
        };

        // Check storage to see if we've already made this request
        if(defaults){
            try{defaults = JSON.parse(defaults)}catch(e){}
            resolve(transformItems(Object.assign(defaults,defaultsAppends),type));
        }else{
            let opts = {
                method: 'POST',
                uri:config.defaultsApiUrl,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            xhr(opts,(err,res,body)=>{
                if(err){ console.log(err) }
                let defaults = JSON.parse(body);

                localStorage.setItem('dl.defaults',JSON.stringify(Object.assign(defaults,defaultsAppends)));

                // resolve({options:items});
                resolve(transformItems(defaults,type));
            });
        }
    }),

    request : (opts)=>new Promise((resolve,reject)=>{
        xhr(opts,(err,res,body)=>{
            if(err){ console.log(err) }

            resolve(JSON.parse(body));
        });
    }),

    defaults:{
        appendToCollection(filterKey,items){
            let defaults = localStorage.getItem('dl.defaults');
            try{defaults = JSON.parse(defaults)}catch(e){console.log(e)}
            defaults[filterKey] = items;

            localStorage.setItem('dl.defaults',JSON.stringify(defaults));

            return defaults;
        }
    }
}

function transformItems(defaults,type){
   return _.sortBy(defaults[type],'entityValue').map(item=>{
        item.id = item.entityUUID;
        item.name = item.entityValue

        return item; 
    });
}