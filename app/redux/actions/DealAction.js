import {
  getAllDeals,
  getDealsOut,
  getMyDeals,
  getDealsIn,
  getDealsToConfirm,
  confirmDeal as confirmDealFromApi,
  addDeal as addDealFromApi,
  getDeal as getDealFromApi,
  getDealEmployee as getDealEmployeeFromApi,
  fetchDealsEmployee as fetchDealsEmployeeFromApi,
  getDealsByCategory,
  getDealsByCategoryOutside,
  updateDeal as updateDealFromApi,
  deleteDeal as deleteDealFromApi,
} from "../services/deal.service";

export const FETCH_DEALS = "FETCH_DEALS";
export const FETCH_DEALS_OUT = "FETCH_DEALS_OUT";
export const FETCH_DEALS_IN = "FETCH_DEALS_IN";
export const FETCH_MY_DEALS = "FETCH_MY_DEALS";
export const FETCH_DEALS_TO_CONFIRM = "FETCH_DEALS_TO_CONFIRM";
export const CONFIRM_DEAL = "CONFIRM_DEAL";
export const ADD_DEAL = "ADD_DEAL";
export const FETCH_DEALS_EMPLOYEE = "FETCH_DEALS_EMPLOYEE";
export const UPDATE_DEAL = "UPDATE_DEAL";
export const DELETE_DEAL = "DELETE_DEAL";
export const CLEAR_DEALS = "CLEAR_DEALS";

export const fetchDeals = () => (dispatch) => {
  return getAllDeals().then((result) => {
    if (result) {
      dispatch({
        type: FETCH_DEALS,
        payload: result,
      });
    }
  });
};
export const fetchDealsOut = (enterprise_id) => (dispatch) => {
  return getDealsOut(enterprise_id).then((result) => {
    if (result) {
      dispatch({
        type: FETCH_DEALS_OUT,
        payload: result,
      });
    }
  });
};

export const fetchDealsIn = (enterprise_id) => (dispatch) => {
  return getDealsIn(enterprise_id)
    .then((result) => {
      if (result) {
        dispatch({
          type: FETCH_DEALS_IN,
          payload: result,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: CLEAR_DEALS,
      });
    });
};

export const fetchMyDeals = (enterprise_id) => (dispatch) => {
  return getMyDeals(enterprise_id).then((result) => {
    if (result) {
      dispatch({
        type: FETCH_MY_DEALS,
        payload: result,
      });
    }
  });
};

export const fetchDealsToConfirm = (enterprise_id) => (dispatch) => {
  return getDealsToConfirm(enterprise_id).then((result) => {
    if (result) {
      dispatch({
        type: FETCH_DEALS_TO_CONFIRM,
        payload: result,
      });
    }
  });
};

export const confirmDeal = (deal_id, user_id) => {
  return async (dispatch) => {
    const result = await confirmDealFromApi(deal_id, user_id);

    result === false
      ? console.log("Error in confirm deal")
      : console.log("success confirm deal");

    console.log(result);
    dispatch({ type: CONFIRM_DEAL, payload: result });
    return result;
  };
};

export const getDeal = (enterprise_id, deal_id) => {
  return async (dispatch) => {
    const result = await getDealFromApi(enterprise_id, deal_id);
    return result;
  };
};

export const getDealEmployee = (user_id, deal_id) => {
  return async (dispatch) => {
    const result = await getDealEmployeeFromApi(user_id, deal_id);
    return result;
  };
};

export const addDeal = (values) => {
  return async (dispatch) => {
    const newDeal = await addDealFromApi(values);

    newDeal === false
      ? console.log("Error in save dea")
      : dispatch({ type: ADD_DEAL, payload: newDeal });
  };
};

export const updateDeal = (values) => {
  return async (dispatch) => {
    const updateDeal = await updateDealFromApi(values);

    updateDeal === false
      ? console.log("Error in update deal")
      : dispatch({ type: UPDATE_DEAL, payload: updateDeal });
  };
};

export const deleteDeal = (deal_id) => (dispatch) => {
  return deleteDealFromApi(deal_id).then((result) => {
    if (result) {
      dispatch({
        type: DELETE_DEAL,
        payload: result,
      });
    }
  });
};

export const fetchDealsEmployee = (user_id) => (dispatch) => {
  return fetchDealsEmployeeFromApi(user_id).then((result) => {
    if (result) {
      dispatch({
        type: FETCH_DEALS_EMPLOYEE,
        payload: result,
      });
    }
  });
};

export const filterByCategory = (enterprise_id, category_id) => (dispatch) => {
  return getDealsByCategory(enterprise_id, category_id).then((result) => {
    if (result) {
      dispatch({
        type: FETCH_DEALS_OUT,
        payload: result,
      });
    }
  });
};

export const filterByCategoryOutside = (category_id) => (dispatch) => {
  return getDealsByCategoryOutside(category_id).then((result) => {
    if (result) {
      dispatch({
        type: FETCH_DEALS_OUT,
        payload: result,
      });
    }
  });
};
