import genres from '../filters/genres';
import language from '../filters/language';
import state from '../filters/state';
import hasStills from '../filters/still';
import hasVideos from '../filters/video';
import hasArtwork from '../filters/artwork';

/**
 * Filter groups are objects that have group configuration properties and a collection of filters
 */
export default {
    label : 'Metadata',
    defaultOpen: false,
    accordian:{
        color:{
            background: '#4db3d7',
            text:'#fff'
        }
    },
    filters:[
        genres,
        language,
        //state,
        hasStills,
        hasVideos,
        hasArtwork
    ]
};