import {
  GET_DEMAND_EMPLOYEE_FAIL,
  GET_DEMAND_EMPLOYEE_SUCCES,
} from "../constants/demandsTypes";

const initialState = {
  listeDemande: [],
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_DEMAND_EMPLOYEE_SUCCES:
      return { ...state, listeDemande: payload };
    case GET_DEMAND_EMPLOYEE_FAIL:
      return { ...state, listeDemande: [] };
    default:
      return state;
  }
};

export default reducer;
