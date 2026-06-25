import {z} from 'zod'

export const nextcloudLoginFlowStartResponseDtoSchema = z.object({
    poll: z.object({
        token: z.string(),
        endpoint: z.string(),
    }),
    login: z.string(),
})

export type NextcloudLoginFlowStartResponseDto = z.infer<typeof nextcloudLoginFlowStartResponseDtoSchema>
