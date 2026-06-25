import {z} from 'zod'

export const passwordResponseDtoSchema = z.object({
    iv: z.string(),
})

export type PasswordResponseDto = z.infer<typeof passwordResponseDtoSchema>
