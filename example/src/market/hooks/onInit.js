/**
 * Hook used to know when the app is initialized
 */
import _utils from '../_utils';

export default app=>{
    _utils.getDefaults('genres');// Request defaults to ensure they're set on app load
}