import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import MoviesApp from './src/MoviesApp.js'
import { FETCH_SUCCESS, FETCH_ERROR} from './src/actions/index.js';

const middlewares = [thunk];

const initialState = {
  data: [],
  page: 1,
  loading: true,
  error: null,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    
    case FETCH_SUCCESS:
        return {
            ...state,
            loading: false,
            data: [...state.data, ...action.data],
            page: state.page + 1,
        }
  
    case FETCH_ERROR:
      return {
          ...state,
          loading: false,
          error: action.error
      }

    default:
        return state
  }
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default class App extends React.Component {
  render() {
    return (
      <Provider store = { store }>
        <MoviesApp />
      </Provider>
    );
  }
}


