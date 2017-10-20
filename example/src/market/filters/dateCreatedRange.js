

export default {
    id: 'dateCreated',
    type:'range',
    prop: 'dateCreated',
    label: 'Date Created',
    range:{
        start:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
        end:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    }
};