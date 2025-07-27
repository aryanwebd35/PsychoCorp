import axios from 'axios'


const API = axios.create({baseURL:'https://psychocorp-client-1.onrender.com'})
export const getUser = (userId) => API.get(`/user/${userId}`);

// export default userChats
// exports.module= {userChats}
