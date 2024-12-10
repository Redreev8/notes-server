import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const axiosUser = axios.create({
    baseURL: process.env.USER_URL,
})

export default axiosUser