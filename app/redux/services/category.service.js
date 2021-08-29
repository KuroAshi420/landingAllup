import http from "./http_common";


//get all categories
export const getCategories = async () => {


  let result = await http.get("/category/getCategories")
  return result.data
}

// add new category
export const addCategory = async category_name => {


  const result = await http.post("/category/addCategory", {category_name})
  return result.data
}

