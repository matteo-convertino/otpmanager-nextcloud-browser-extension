import {z} from "zod";

export const setupFormDtoSchema = z.object({
    server: z
        .string()
        .trim()
        .min(1, "Nextcloud server is required"),
});

export type SetupFormDto = z.infer<typeof setupFormDtoSchema>;
