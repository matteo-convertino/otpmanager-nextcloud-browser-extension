import {z} from 'zod'

export const receiverResponseDTOSchema = z.object({
    id: z.string(),
    label: z.string().nullable(),
    value: z.string().nullable(),
    image: z.string().nullable(),
    isExternal: z.boolean().nullable(),
})

export type ReceiverResponseDto = z.infer<typeof receiverResponseDTOSchema>
