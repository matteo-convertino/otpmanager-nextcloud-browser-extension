import {accountResponseDTOSchema} from "@/dto/response/AccountResponseDto";
import {z} from "zod";
import {receiverResponseDTOSchema} from "@/dto/response/ReceiverResponseDto";

export const accountDatatableResponseSchema = accountResponseDTOSchema.extend({
    receiver: receiverResponseDTOSchema.nullable(),
    unlocked: z.boolean().nullable(),
    expiredAt: z.coerce.date().nullable(),
    isShared: z.boolean(),
})
export type AccountDatatableResponseDto = z.infer<typeof accountDatatableResponseSchema>
