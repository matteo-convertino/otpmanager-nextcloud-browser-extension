import type {OcsMetaDto} from "@/dto/utils/OcsMetaDto";
import {OcsResponseDtoSchema} from "@/dto/utils/OcsResponseDto";

export function callApi<T>(
    {
        api,
        onComplete,
        onError,
        onGenericError,
    }: {
        api: () => Promise<T>;
        onComplete?: (_: T) => void;
        onError?: (_: OcsMetaDto) => void;
        onGenericError?: (_: unknown) => void;
    }) {
    api()
        .then((res) => onComplete?.(res))
        .catch((e) => {
            console.log(e);

            const rawData = e?.response?.data;
            const parsed = OcsResponseDtoSchema.safeParse(rawData);

            parsed.success ? onError?.(parsed.data.ocs.meta) : onGenericError?.(e);
        });
}

