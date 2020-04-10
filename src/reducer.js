import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

// THIS FILE NOT NEEDED!
// FOUR REDUCERS FUNCTIONS IN SEPERATE FILES
export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

// pure function (not modifying the initial state destructively)
export const Reducer = (state = initialState, action) => {
    return state;
};