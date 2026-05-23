import axios from 'axios';

// Determine baseURL safely: prefer explicit VITE_API_URL; if missing and
// we're running a production build, fall back to the deployed backend URL.
// Localhost development remains unaffected.
const determineBaseUrl = () => {
    const explicit = import.meta.env.VITE_API_URL;
    if (explicit) return explicit;
    // import.meta.env.MODE is 'production' for production builds
    if (import.meta.env.MODE === 'production') {
        return 'https://feasty-z82k.onrender.com';
    }
    return 'http://localhost:3000';
};

const instance = axios.create({
    baseURL: determineBaseUrl(),
    withCredentials: true,
});

export default instance;
