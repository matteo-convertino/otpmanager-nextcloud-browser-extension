import {z} from 'zod'

export const passwordRequestDtoSchema = z.object({
    password: z.string().min(1, "Password is required"),
})

export type PasswordRequestDTO = z.infer<typeof passwordRequestDtoSchema>
