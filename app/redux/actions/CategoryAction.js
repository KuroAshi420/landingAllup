import { getCategories ,addCategory as addCategoryFromApi,} from "../services/category.service";


export const FETCH_CATEGORIES= "FETCH_CATEGORIES";
export const ADD_CATEGORY= "ADD_CATEGORY";


export const fetchCategories =  () => (dispatch) => {
    
   
    return getCategories().then(
        (result) => {
            if (result) {
               
                    dispatch({
                        type: FETCH_CATEGORIES,
                        payload: result,
                    });
            } 
        }

    );

};

export const addCategory = (category_name) => {

    return async dispatch => {
        const newCategory = await addCategoryFromApi(category_name)

        newCategory === false ?
            (
                console.log("Error in save category")

            )
            :
            (
                dispatch({ type: ADD_CATEGORY, payload: newCategory })

            )



    }

};

