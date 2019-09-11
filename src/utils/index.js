import fltrs from './filters';
import cllctns from './collections';
import qrs from './queries';
import _ from 'underscore'; 

const utils = {
    convertUNIXToHumanDate(UNIX_timestamp){
        if (UNIX_timestamp == undefined) { return '';}
        if (UNIX_timestamp.toString().length < 12) { UNIX_timestamp = UNIX_timestamp * 1000;}//Convert seconds to ms

        const a       = new Date(+UNIX_timestamp),
              options = {
                  weekday: "short", year: "numeric", month: "short",
                  day : "numeric", hour: "2-digit", minute: "2-digit"
              };

        return a.toLocaleTimeString("en-us", options);//@todo, can we set language using our app's language here?
    },

    propToTitleCase : (camelCase) => camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
};

export const filters = fltrs;
export const collections = cllctns;
export const queries = qrs;
export let l = window.location.hostname === 'localhost' ? console.log : ()=> {};
export const makeHumanDate = utils.convertUNIXToHumanDate;
export default utils;

/**
 * Curried : Combines existing localStored preferences with the incoming changes
 * @param {*} lsPrefs
 */
export const prefs_merge = lsPrefs => {
  return (prop, checked, viewId) => {
      // Check if the view exists yet in the stored preferences
      const hasViewPref = lsPrefs.filter(view => view && view.view === viewId).length > 0;

      if (hasViewPref) {
          lsPrefs = lsPrefs.map(view => {

              // The view exists, merge props
              if (viewId === view.view) {
                  let props = view.data.props || [];
                  /**
                   * pref.data.props[] needs to be checked if the current key is
                   * already there, then updated or else push the current key into the
                   * array & return the new prefs object
                   */
                  if (_.find(props, { key: prop })) {
                      props = props.map(prefProp => prefProp.key === prop ? { ...prefProp, ...{ display: checked } } : prefProp);
                  } else {
                      props.push({
                          key: prop,
                          display: checked
                      });
                  }
                  view.data.props = props;
              }

              return view;
          });
      } else {
          // This creates the new view's props being added
          lsPrefs.push({
              view: viewId,
              data: {
                  props: [
                      {
                          key: prop,
                          display: checked
                      }
                  ]
              }
          });
      }

      return lsPrefs;
  }
}

/**
* Curried : Structures the initial props localstorage item
* @param {*} selectedView
*/
export const prefs_createInitial = selectedView => {
  return (prop, checked) => {
      return [{
          view: selectedView.id,
          data: {
              props: selectedView.props
                  .map(viewProp => viewProp.key === prop
                      ? { ...viewProp, ...{ display: checked } }
                      : viewProp
                  )
          }
      }]
  }
}