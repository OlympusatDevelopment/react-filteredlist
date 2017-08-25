

export default {
    id: 'dateAvailable',
    type:'range',
    prop: 'dateAvailable',
    label: 'Dates Available',
    range:{
        start:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
        end:null,//used this to set a default value. Value must be null or undefined to be excluded. Filters recognize boolean true/false
    }
};