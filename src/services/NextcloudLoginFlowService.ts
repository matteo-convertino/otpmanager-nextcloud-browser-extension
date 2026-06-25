import {type NextcloudLoginFlowStartResponseDto,} from "@/dto/response/NextcloudLoginFlowStartResponseDto";
import {type NextcloudCredentialsDto} from "@/dto/utils/NextcloudCredentialsDto";
import {
    type NextcloudLoginFlowPollResponseDto,
    nextcloudLoginFlowPollResponseDtoSchema,
} from "@/dto/response/NextcloudLoginFlowPollResponseDto";
import nextcloudAxiosClient from "@/services/utils/nextcloudAxiosClient";

export default class NextcloudLoginFlowService {
    static async start(serverUrl: string): Promise<NextcloudLoginFlowStartResponseDto> {
        return nextcloudAxiosClient.post<NextcloudLoginFlowStartResponseDto>(
            `${serverUrl}/index.php/login/v2`,
        ).then(res => res.data);
    }

    static async poll(pollToken: string, serverUrl: string): Promise<NextcloudCredentialsDto | null> {
        const response = await nextcloudAxiosClient.post<NextcloudLoginFlowPollResponseDto>(
            `${serverUrl}/login/v2/poll`,
            {token: pollToken},
        );

        if (response.status === 404) return null;

        const pollResponse = nextcloudLoginFlowPollResponseDtoSchema.safeParse(response.data);

        return pollResponse.success ? pollResponse.data : null;
    }
}
