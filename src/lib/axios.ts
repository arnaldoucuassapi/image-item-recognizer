import axios from "axios";

export const api = axios.create({
    baseURL: 'ttps://api.clarifai.com/v2/models'
});