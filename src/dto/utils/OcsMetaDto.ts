import {z} from 'zod'

export const ocsMetaDtoSchema = z.object({
    status: z.string(),
    statuscode: z.number(),
    message: z.union([
        z.string(),
        z.array(z.string()),
        z.record(z.string(), z.array(z.string())),
    ]),
})

export type OcsMetaDto = z.infer<typeof ocsMetaDtoSchema>
