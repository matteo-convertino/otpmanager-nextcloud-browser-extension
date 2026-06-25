import {z} from 'zod'
import {OtpType} from "@/utils/enum/otpType";
import {OtpAlgorithm} from "@/utils/enum/otpAlgorithm";
import {OtpDigits} from "@/utils/enum/otpDigits";
import {OtpPeriod} from "@/utils/enum/otpPeriod";

export const accountResponseDTOSchema = z.object({
    id: z.number(),
    secret: z.string(),
    name: z.string(),
    issuer: z.string(),
    digits: z.enum(OtpDigits),
    type: z.enum(OtpType),
    period: z.enum(OtpPeriod),
    algorithm: z.enum(OtpAlgorithm),
    counter: z.number().nullable(),
    icon: z.string(),
    position: z.number(),
    userId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    deletedAt: z.coerce.date().nullable(),
})

export type AccountResponseDto = z.infer<typeof accountResponseDTOSchema>
