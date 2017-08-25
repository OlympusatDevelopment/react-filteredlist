/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { compose, combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import languageProviderReducer from './containers/LanguageProvider/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    language: languageProviderReducer,
    app:appReducer,
    ...asyncReducers,
  });
}
