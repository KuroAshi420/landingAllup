import axios from "axios";

function refreshToken() {
  let currentUser = JSON.parse(localStorage.getItem("user"));
  let token;
  if (currentUser) {
    token = currentUser.token;
  } else {
    token = "";
  }

  return axios.create({
    baseURL: "http://localhost:9000/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

//get alldeals for the admin
export const getAllDeals = async () => {
  let http = refreshToken();
  let result = await http.get("/deal/getAllDeals");

  return result.data;
};

//get deals out for the enterprise
export const getDealsOut = async (enterprise_id) => {
  let http = refreshToken();
  let result = await http.get("http://localhost:9000/api/deal/getDealsOut", {
    params: { enterprise_id },
  });
  return result.data;
};

//get deals in for the enterprise
export const getDealsIn = async (enterprise_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/getDealsIn", {
    params: { enterprise_id },
  });
  return result.data;
};

//get deals offered by the enterprise
export const getMyDeals = async (enterprise_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/getMyDeals", {
    params: { enterprise_id },
  });

  return result.data;
};

//get deals to confirm
export const getDealsToConfirm = async (enterprise_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/getDealsToConfirm", {
    params: { enterprise_id },
  });
  return result.data;
};

//get users subscribe for a deal
export const getUsersByDeal = async (deal_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/getUsersByDeal", { params: { deal_id } });
  return result.data;
};

//confirm deal
export const confirmDeal = async (deal_id, user_id) => {
  let http = refreshToken();
  const result = await http.post("/deal/confirmDeal", { deal_id, user_id });
  return result.data;
};

//get my deals for EMPLOYEE
export const fetchDealsEmployee = async (user_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/fetchDealsEmployee", {
    params: { user_id },
  });

  return result.data;
};

// get deal
export const getDeal = async (enterprise_id, deal_id) => {
  let http = refreshToken();
  let result = await http.post("/deal/getDeal", { enterprise_id, deal_id });
  return result.data;
};

// get deal for employee
export const getDealEmployee = async (user_id, deal_id) => {
  let http = refreshToken();
  let result = await http.post("/deal/getDealEmployee", { user_id, deal_id });
  return result.data;
};

// add a deal
export const addDeal = async (data) => {
  let http = refreshToken();

  const formData = new FormData();
  formData.set("data", JSON.stringify(data));
  formData.append("deal_picture", data.deal_picture);

  const result = await http.post("/deal/addDeal", formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

// update a deal
export const updateDeal = async (data) => {
  let http = refreshToken();
  const result = await http.post("/deal/updateDeal", data);
  return result.data;
};

// delete deal
export const deleteDeal = async (deal_id) => {
  let http = refreshToken();
  let result = await http.delete("/deal/deleteDeal", { params: { deal_id } });
  return result.data;
};

// get deal by id
export const getDealById = async (deal_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/getDealById", { params: { deal_id } });
  return result.data;
};

//filter deals BY category outide
export const getDealsByCategoryOutside = async (category_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/getDealsByCategoryOutside", {
    params: { category_id },
  });
  return result.data;
};

//filter deals BY category
export const getDealsByCategory = async (enterprise_id, category_id) => {
  let http = refreshToken();
  let result = await http.get("/deal/getDealsByCategory", {
    params: { enterprise_id, category_id },
  });
  return result.data;
};
