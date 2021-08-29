import http from "./http_common";


//get all users
export const getUsers = async () => {

  let result = await http.get("/admin/getUsers")
  return result.data
}

//get all enterprises
export const getEnterprises = async () => {

  let result = await http.get("/admin/getEnterprises")
  return result.data
}

//ban/unban user
export const changeState = async (user_id,state) => {

  const result = await http.post("/admin/changeStateUser", {user_id,state})
  return result.data
}

//confirm enterprise registration
export const confirmRegistration = async (enterprise_id) => {

  const result = await http.post("/admin/confirmRegistration", {enterprise_id})
  return result.data
}

//add notes
export const addNotes = async (enterprise_id,details) => {

  const result = await http.post("/admin/addNotes", {enterprise_id,details})
  return result.data
}


//get all reports
export const getReports = async () => {

  let result = await http.get("/admin/getReports")
  return result.data
}

//send report
export const sendReport = async (deal_id,enterprise_id,comment) => {

  const result = await http.post("/admin/sendReport", {deal_id,enterprise_id,comment})
  return result.data
}

//get notes by enterprise id 
export const getNotes = async (enterprise_id) => {

  const result = await http.get("/admin/getNotes", { params: { enterprise_id } })
  return result.data
}


