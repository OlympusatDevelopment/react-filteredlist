let opts = [];

export const listItem=()=>{
    const rndm = ["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","Etiam","eget","nisi","lacus","Phasellus","ac","mi","ut","augue","finibus","pulvinar","ut","nec","elit","Ut","convallis","neque","quis","quam","volutpat","vehicula","Nunc","nec","vulputate","erat","Ut","quis","tellus","at","turpis","luctus","mattis","efficitur","eget","ex","Donec","venenatis","eu","orci","at","rhoncus","Vestibulum","neque","diam","semper","malesuada","bibendum","ut","auctor","fermentum","neque","Fusce","nec","risus","sodales","eleifend","lorem","eu","lacinia","nunc","Praesent","at","ullamcorper","magna","Vestibulum","pretium","neque","in","iaculis","volutpat","Fusce","quis","laoreet","magna","Nullam","ut","mattis","erat"];
    const makeIpsumTitle = ()=>{
        let title = '';
        for(let i=0;i<5;i++){
            title+=rndm[Math.floor(Math.random()*rndm.length)] + ' ';
        }

        return title;
    };

    return {
        entityUUID: Math.floor(Math.random() * 20000),
        entityType: 'olyplat-entity-catalog',
        primaryNetwork:'12345',
        title:makeIpsumTitle(),
        dateCreated : Math.floor(Math.random()*1494357247),
        dateUpdated : 1494357247
    }
};

export const listItems=()=>{
    let items = [];

    for(let i=0;i<200;i++){
        items.push(listItem())
    }

    return items;
};

export const optionItem=(entityType)=>{
    const rndm = ["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","Etiam","eget","nisi","lacus","Phasellus","ac","mi","ut","augue","finibus","pulvinar","ut","nec","elit","Ut","convallis","neque","quis","quam","volutpat","vehicula","Nunc","nec","vulputate","erat","Ut","quis","tellus","at","turpis","luctus","mattis","efficitur","eget","ex","Donec","venenatis","eu","orci","at","rhoncus","Vestibulum","neque","diam","semper","malesuada","bibendum","ut","auctor","fermentum","neque","Fusce","nec","risus","sodales","eleifend","lorem","eu","lacinia","nunc","Praesent","at","ullamcorper","magna","Vestibulum","pretium","neque","in","iaculis","volutpat","Fusce","quis","laoreet","magna","Nullam","ut","mattis","erat"];
    const makeIpsumTitle = ()=>{
        let title = '';
        for(let i=0;i<5;i++){
            title+=rndm[Math.floor(Math.random()*rndm.length)] + ' ';
        }

        return title;
    };

    return {
        entityUUID: Math.floor(Math.random() * 20000),
        entityType,
        entityValue:makeIpsumTitle(),
        dateCreated : Math.floor(Math.random()*1494357247),
        dateUpdated : 1494357247
    }
};

export const optionItems=(entityType)=>{
    if(opts.length === 0){
        for(let i=0;i<25;i++){
            opts.push(optionItem(entityType))
        }
    }

    return opts;
};