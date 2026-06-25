import axios, {AxiosResponse} from "axios"
import LocalStorageService from "@/services/LocalStorageService"
import {OcsResponseDto} from "@/dto/utils/OcsResponseDto"

const otpManagerAxiosClient = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "OCS-APIRequest": "true",
    },
    timeout: 30000,
});

otpManagerAxiosClient.interceptors.request.use(async (config) => {
    const connection = await LocalStorageService.getCredentials();

    if (!connection) return config;

    const serverUrl = connection.server.replace(/\/+$/, "");

    config.baseURL = `${serverUrl}/ocs/v2.php/apps/otpmanager`;

    const basicAuth = btoa(`${connection.loginName}:${connection.appPassword}`);

    config.headers.Authorization = `Basic ${basicAuth}`;

    return config;
})

otpManagerAxiosClient.interceptors.response.use(
    (response: AxiosResponse<OcsResponseDto<any>>) => {
        response.data = response.data.ocs.data;

        return response;
    },
    (error) => Promise.reject(error)
);


export default otpManagerAxiosClient
