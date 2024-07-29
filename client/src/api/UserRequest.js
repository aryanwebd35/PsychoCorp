import axios from 'axios'


const API = axios.create({baseURL:'http://localhost:3000'})
export const getUser = (userId) => API.get(`/user/${userId}`);

// export default userChats
// exports.module= {userChats}
