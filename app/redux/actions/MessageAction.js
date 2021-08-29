import {
     getChatRoom as getChatRoomFromApi,

} from "../services/employee.service";


//export const GET_CHATROOM= "GET_CHATROOM";



export const getChatRoom =  (enterprise_id) => (dispatch) => {
   
    return getChatRoomFromApi(enterprise_id);

};







