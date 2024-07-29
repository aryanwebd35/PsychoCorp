import axios from 'axios'


const API = axios.create({baseURL:'http://localhost:3000'})
console.log(API.baseURL)
export const userChats = (id) => API.get(`/chat/${id}`)

// export default userChats
// exports.module= {userChats}
