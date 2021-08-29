import {
  FETCH_DEALS,
  FETCH_DEALS_OUT,
  ADD_DEAL,
  FETCH_MY_DEALS,
  FETCH_DEALS_IN,
  FETCH_DEALS_TO_CONFIRM,
  CONFIRM_DEAL,
  FETCH_DEALS_EMPLOYEE,
  UPDATE_DEAL,
  DELETE_DEAL,
  CLEAR_DEALS,
} from "../actions/DealAction";

import { fromJS, List } from "immutable";

const initialState = [];

const DealReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEALS:
      return action.payload;

    case FETCH_DEALS_OUT:
      return action.payload;

    case FETCH_DEALS_IN:
      return action.payload;

    case FETCH_DEALS_EMPLOYEE:
      return action.payload;

    case FETCH_MY_DEALS:
      return action.payload;

    case FETCH_DEALS_TO_CONFIRM:
      return action.payload;

    case CONFIRM_DEAL:
      const index_update = state.findIndex(
        (deal) => deal._id === action.payload._id
      );
      state[index_update] = action.payload;
      return [...state];

    case ADD_DEAL:
      const newDeal = action.payload;
      return [...state, newDeal];

    case UPDATE_DEAL:
      const index = state.findIndex((deal) => deal._id === action.payload._id);
      state[index] = action.payload;
      return [...state];

    case DELETE_DEAL:
      const newDeals = state.filter((deal) => deal._id !== action.payload._id);
      return newDeals;

    case CLEAR_DEALS:
      return [];

    default:
      return state;
  }
};

export default DealReducer;
