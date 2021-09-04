import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import contactsReduser from './features/contacts';

const logger = createLogger({
  diff: true,
  collapsed: true
})

export const store = createStore(
  combineReducers({
    contacts: contactsReduser
  }), composeWithDevTools(applyMiddleware(thunk,logger))
)



