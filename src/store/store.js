import redux from 'redux';
import appReducer from './../reducers/appReducer.js'
import logger from './../middleware/loggingMiddleware.js'

const { createStore, applyMiddleware } = redux

let store = createStore(appReducer, applyMiddleware(logger))

export default store;