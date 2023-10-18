import axios from 'axios';
import { API_BASE_URL } from '../../Constants';

const api = axios.create({
    baseURL: `http://16.24.45.175:8000`,
});

export const PostData = async (endpoint, method = 'GET', params = {}) => {

    const requestData = {
        cnic: '3520260422879',
        divCode: undefined,
        end_date: '',
        start_date: '',
    };
    const headers = {
        'Content-Type': 'application/json',
    };

    axios.post(`${API_BASE_URL}/BatchListing`, requestData, { headers })
        .then(response => {

            console.log('Haris:', response.data);
        })
        .catch(error => {
            console.error('POST Request Error:', error);
        });

    // try {
    //     console.log("Making API request to:", endpoint);
    //     console.log("HTTP Method:", method);
    //     console.log("Request Params:", params);
    //     console.log("Request Headers:", headers);

    //     const response = await api.request({
    //         url: endpoint,
    //         method,
    //         params,
    //         headers,
    //     });

    //     console.log("API Response:", response?.json());
    //     return response?.data;
    // } catch (error) {
    //     console.error("API Request Error:", error);
    //     throw error;
    // }
};
