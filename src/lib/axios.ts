import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.clarifai.com/v2',
    headers: {
        Authorization: `Key ${process.env.EXPO_PUBLIC_PAT}`
    }
});