import http from "./http_common";




//test if enterprise is subscribed or not 
export const isSubscribed = async (enterprise_id) => {

  let result = await http.get("/subscription/isSubscribed",{ params: { enterprise_id }})
  return result.data
}

