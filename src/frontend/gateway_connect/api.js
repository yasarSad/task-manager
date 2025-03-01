import axios from 'axios';

const API_BASE_URL = "https://wid32uexla.execute-api.us-west-1.amazonaws.com/Stage"


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        
    },
});

export default apiClient;