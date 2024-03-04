import axios from "axios";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173'; // Replace with your allowed origin
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'; // Allowed HTTP methods

const api =  axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: '',
    timeout: 100000,
    headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
        "Content-Type": "application/json",
    },
})

export default api;