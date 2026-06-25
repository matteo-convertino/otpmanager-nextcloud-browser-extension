import otpManagerAxiosClient from "@/services/utils/otpManagerAxiosClient";
import type {UpdateCounterRequestDto} from "@/dto/request/UpdateCounterRequestDto";
import {SharedAccountRoutes} from "@/services/api/routes/sharedAccountRoutes";
import {SharedAccountResponseDto} from "@/dto/response/SharedAccountResponseDto";

export default class SharedAccountService {
    static async updateCounter(updateCounterRequestDto: UpdateCounterRequestDto): Promise<SharedAccountResponseDto> {
        return otpManagerAxiosClient.post<SharedAccountResponseDto>(
            SharedAccountRoutes.UPDATE_COUNTER,
            updateCounterRequestDto,
        ).then(res => res.data);
    }
}
