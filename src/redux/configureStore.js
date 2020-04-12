import {createStore, combineReducers, applyMiddleware } from 'redux';import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
// reset form to its initial state after the form is submitted
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            // add reducer function and state information
            // into createStore
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        // inhancers for the store
        applyMiddleware(thunk, logger)
    );

    return store;
}