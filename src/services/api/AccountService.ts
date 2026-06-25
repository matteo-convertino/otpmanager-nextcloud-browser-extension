import otpManagerAxiosClient from "@/services/utils/otpManagerAxiosClient";
import {AccountRoutes} from "@/services/api/routes/accountRoutes";
import type {UpdateCounterRequestDto} from "@/dto/request/UpdateCounterRequestDto";
import {AccountDatatableResponseDto} from "@/dto/response/AccountDatatableResponseDto";
import {AccountResponseDto} from "@/dto/response/AccountResponseDto";

export default class AccountService {
    static async findAll(): Promise<AccountDatatableResponseDto[]> {
        return otpManagerAxiosClient.get<AccountDatatableResponseDto[]>(
            AccountRoutes.GET_ALL
        ).then(res => res.data);
    }

    static async updateCounter(updateCounterRequestDto: UpdateCounterRequestDto): Promise<AccountResponseDto> {
        return otpManagerAxiosClient.post<AccountResponseDto>(
            AccountRoutes.UPDATE_COUNTER,
            updateCounterRequestDto,
        ).then(res => res.data);
    }
}
