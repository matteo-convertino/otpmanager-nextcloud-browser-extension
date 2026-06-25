import otpManagerAxiosClient from "@/services/utils/otpManagerAxiosClient";
import {PasswordRoutes} from "@/services/api/routes/passwordRoutes";
import {
    type PasswordResponseDto,
    passwordResponseDtoSchema,
} from "@/dto/response/PasswordResponseDto";
import {
    type PasswordRequestDTO,
    passwordRequestDtoSchema,
} from "@/dto/request/PasswordRequestDto";

export default class PasswordService {
  static async check(passwordRequestDTO: PasswordRequestDTO): Promise<PasswordResponseDto> {
    const request = passwordRequestDtoSchema.parse(passwordRequestDTO)

    return otpManagerAxiosClient.post<PasswordResponseDto>(
        PasswordRoutes.CHECK,
        request
    ).then(res => passwordResponseDtoSchema.parse(res.data));
  }
}
