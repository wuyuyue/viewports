import {toast} from '../layouts/appAction.js';

const {
  OPERATION_FAIL
} = require('./actionTypes').default;

export default function utilsMiddleware({ dispatch }) {
  return next => action => {
    const { type } = action;
    if (!type) {
      return next(action);
    }
    if (type === OPERATION_FAIL) {
      if (typeof action.error === 'object') {
        if (action.error.message === 'apiUnAuthMsg') {
          //  dispatch(utilsAction.showLoginPopUp())
        } else {
          dispatch(toast(action.error.message, 2000));
        }
      }
    }

    next(action);
  }
}
