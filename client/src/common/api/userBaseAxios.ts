import axios from "axios";

interface userdata {
    message: string;
    accessToken: string;
    user: object;
    accountData: object;
}

function getAccessToken(): string | null {
    const accessToken = JSON.parse(localStorage.getItem('loginUser') || 'null') as userdata | null;
    return accessToken?.accessToken || null;
}

const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 100000,
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`, // Call the function to retrieve access token
        "Content-Type": "application/json",
    },
});

// Update headers for every request with the latest access token
api.interceptors.request.use(config => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
