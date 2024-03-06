import axios from "axios";
import md5 from "md5";

const password = 'Valantis'
const date: string = new Date().toISOString().split('T')[0].replace(/-/g,"")

export const instance = axios.create({
    baseURL: 'http://api.valantis.store:40000/',
    headers: {
        "Content-Type": "application/json",
        'X-Auth': `${md5(`${password}_${date}`)}`
    },
    timeout: 5000
})

