import axios from "axios";

const instance = axios.create({
    baseURL: "https://quickickcopy.onrender.com/api",
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;
