import axios from 'axios'


const API = axios.create({baseURL:'https://psychocorp-client-1.onrender.com'})
console.log(API.baseURL)
export const userChats = (id) => API.get(`/chat/${id}`)

// export default userChats
// exports.module= {userChats}
