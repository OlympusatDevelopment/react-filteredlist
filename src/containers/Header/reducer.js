import {  } from './constants';

//@todo find a better place to inject this
import config from '../../../dataListConfig';

const initialState = {
  config
};

function headerReducer(state = initialState, action) {
  let _state = Object.assign({},state),
      _data = action.data;

  switch (action.type) {

    default:
      return _state;
  }
}

export default headerReducer;
