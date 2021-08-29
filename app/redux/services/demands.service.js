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

//get deals out for the enterprise
export const getDemandsEmployees = async (enterprise_id) => {
  let http = refreshToken();
  let result = await http.get(
    "http://localhost:9000/api/deal/getDealsConfirmed",
    { params: { enterprise_id } }
  );
  return result.data;
};
