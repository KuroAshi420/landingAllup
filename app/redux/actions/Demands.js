import {
  GET_DEMAND_EMPLOYEE_FAIL,
  GET_DEMAND_EMPLOYEE_SUCCES,
} from "../constants/demandsTypes";
import { getDemandsEmployees } from "../services/demands.service";

export const getemployeesdemands = (enterprise_id) => async (dispatch) => {
  try {
    const result = await getDemandsEmployees(enterprise_id);
    dispatch({
      type: GET_DEMAND_EMPLOYEE_SUCCES,
      payload: result,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_DEMAND_EMPLOYEE_FAIL,
    });
  }
};
