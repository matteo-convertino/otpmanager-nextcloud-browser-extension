import {z} from 'zod'

export const nextcloudCredentialsDtoSchema = z.object({
    server: z.string(),
    loginName: z.string().optional(),
    appPassword: z.string().optional(),
})

export type NextcloudCredentialsDto = z.infer<typeof nextcloudCredentialsDtoSchema>
