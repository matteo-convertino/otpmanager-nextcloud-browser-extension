import {OtpDigits} from "@/utils/enum/otpDigits";
import {OtpType} from "@/utils/enum/otpType";
import {OtpPeriod} from "@/utils/enum/otpPeriod";
import {OtpAlgorithm} from "@/utils/enum/otpAlgorithm";
import {ReceiverResponseDto} from "@/dto/response/ReceiverResponseDto";

export type SharedAccountResponseDto = {
    id: number
    secret: string
    name: string
    issuer: string
    digits: OtpDigits | null
    type: OtpType | null
    period: OtpPeriod | null
    algorithm: OtpAlgorithm | null
    counter: number | null
    icon: string
    position: number
    userId: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    receiver: ReceiverResponseDto
    unlocked: boolean
    expiredAt: Date | null
}
