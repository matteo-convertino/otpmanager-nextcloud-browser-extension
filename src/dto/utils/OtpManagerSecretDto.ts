import {z} from 'zod'

export const otpManagerSecretDtoSchema = z.object({
    passwordHash: z.string().min(1),
    iv: z.string().min(1),
})

export type OtpManagerSecretDto = z.infer<typeof otpManagerSecretDtoSchema>
