import axios from "axios"
import config from "@/src/config"

const Axios = axios.create({
    baseURL: config.api.base,
    withCredentials: true
})

export default Axios