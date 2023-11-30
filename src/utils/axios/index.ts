import axios from "axios"
import config from "@/src/config"

const Axios = axios.create({
    baseURL: config.api.local,
    withCredentials: true
})

export default Axios