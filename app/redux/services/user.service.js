import http from "./http_common";

//LOGIN 
export const login = async (userName, password) => {

  let result = await http.post("/user/login", { userName, password })
  //console.log(result)
  return result.data
}


//Register
export const register = async (data) => {

  const formData = new FormData();
  formData.set("data", JSON.stringify(data));
  formData.append("logo", data.logo);


  const result = await http.post("/user/register", formData, {
    headers: {
      Accept: 'application/json',
      "Content-Type": "multipart/form-data",
    }
  })

  return result.data
}

//self Register employee
export const registerEmployee = async (values) => {

  const result = await http.post("/user/employeeRegister", values)
  return result.data
}

//update User
export const updateUser = async (values) => {

  let result = await http.post("/user/updateUser", values)
  return result.data
}
//assign rh manager
export const assignRH = async (user_id,enterprise_id) => {

  const result = await http.post("/user/assignRH", {user_id,enterprise_id})
  return result.data
}

//Unassign rh manager
export const unassignRH = async (user_id,enterprise_id) => {

  const result = await http.post("/user/unassignRH", {user_id,enterprise_id})
  return result.data
}

// send message in contact us 
export const sendMessage = async (values) => {

  let result = await http.post("/user/sendMessage", values)
  return result.data
}
