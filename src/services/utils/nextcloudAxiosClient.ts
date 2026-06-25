import axios from "axios"

const nextcloudAxiosClient = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 30000,
});

export default nextcloudAxiosClient
