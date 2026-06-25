import {z} from "zod";

const OcsMessageSchema = z.preprocess((val) => {
        if (typeof val !== "string") return val;

        const trimmed = val.trim();

        const looksLikeJson =
            (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
            (trimmed.startsWith("{") && trimmed.endsWith("}"));

        if (!looksLikeJson) return val;

        try {
            return JSON.parse(trimmed);
        } catch {
            return val;
        }
    },
    z.union([
        z.string(),
        z.array(z.string()),
        z.record(z.string(), z.array(z.string())),
    ])
);

export const OcsMetaDtoSchema = z.object({
    status: z.string(),
    statuscode: z.number(),
    message: OcsMessageSchema
});

export type OcsMetaDto = z.infer<typeof OcsMetaDtoSchema>;

export const OcsResponseDtoSchema = z.object({
    ocs: z.object({
        meta: OcsMetaDtoSchema,
        data: z.unknown(),
    }),
});

export type OcsResponseDto<T> = {
    ocs: {
        meta: OcsMetaDto;
        data: T;
    };
};
