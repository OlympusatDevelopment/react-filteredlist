import genres from '../filters/genres';
import language from '../filters/language';
import rightsTypes from '../filters/rightsTypes';
import subtitleLanguage from '../filters/subtitleLanguage';
import year from '../filters/year';
import country from '../filters/country';
import rating from '../filters/rating';
import actor from '../filters/actor';
import director from '../filters/director';
import productionCompany from '../filters/productionCompany';

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Metadata',
    defaultOpen: true,
    accordian:{
        color:{
            background: 'transparent',
            text:'#4ab2cd'
        }
    },
    filters:[
        genres,
        year,
        rating,
        country,
        language,
        subtitleLanguage,
        actor,
        director,
        productionCompany
    ]
};