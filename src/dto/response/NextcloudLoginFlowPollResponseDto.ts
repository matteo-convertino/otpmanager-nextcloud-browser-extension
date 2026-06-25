import {z} from 'zod'

export const nextcloudLoginFlowPollResponseDtoSchema = z.object({
    server: z.string(),
    loginName: z.string(),
    appPassword: z.string(),
})

export type NextcloudLoginFlowPollResponseDto = z.infer<typeof nextcloudLoginFlowPollResponseDtoSchema>
