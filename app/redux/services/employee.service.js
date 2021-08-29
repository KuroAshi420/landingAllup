import http from "./http_common";


// get employees same enterprise
export const getEmployees = async (enterprise_id,user_id) => {

  let result = await http.get("/employee/getEmployees",{ params: { enterprise_id,user_id }})
  return result.data
}

// delete user
export const deleteUser = async (user_id) => {

  let result = await http.delete("/employee/deleteUser",{ params: { user_id }})
  return result.data
}


//add employee by rh manager
export const addEmployee = async (values) => {

  const result = await http.post("/user/addEmployee", values)
  return result.data
}


// get chatRoom 
export const getChatRoom= async (enterprise_id) => {

  let result = await http.get("/employee/getChatRoom",{ params: { enterprise_id }})
  return result.data
}


// get messages in romm
export const getMessages = async (chatRoom_id) => {

  let result = await http.get("/employee/getMessages",{ params: { chatRoom_id }})
  return result.data
}



