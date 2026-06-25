import browser from 'webextension-polyfill'
import {type NextcloudCredentialsDto, nextcloudCredentialsDtoSchema,} from '@/dto/utils/NextcloudCredentialsDto'
import {
    NextcloudLoginFlowStartResponseDto,
    nextcloudLoginFlowStartResponseDtoSchema
} from "@/dto/response/NextcloudLoginFlowStartResponseDto";

const NEXTCLOUD_CREDENTIALS = 'otpmanager.nextcloud.credentials'
const NEXTCLOUD_LOGIN_FLOW = 'otpmanager.nextcloud.login_flow'

export default class LocalStorageService {
    static async getCredentials(): Promise<NextcloudCredentialsDto | null> {
        const result = await browser.storage.local.get(NEXTCLOUD_CREDENTIALS);
        const credentials = nextcloudCredentialsDtoSchema.safeParse(result[NEXTCLOUD_CREDENTIALS])

        return credentials.success ? credentials.data : null;
    }

    static async saveCredentials(connection: NextcloudCredentialsDto): Promise<void> {
        await browser.storage.local.set({
            [NEXTCLOUD_CREDENTIALS]: connection,
        });
    }

    static async clear(): Promise<void> {
        await browser.storage.local.remove([
            NEXTCLOUD_CREDENTIALS,
            NEXTCLOUD_LOGIN_FLOW,
        ])
    }

    static async getLoginFlow(): Promise<NextcloudLoginFlowStartResponseDto | null> {
        const result = await browser.storage.local.get(NEXTCLOUD_LOGIN_FLOW);
        const loginFlow = nextcloudLoginFlowStartResponseDtoSchema.safeParse(result[NEXTCLOUD_LOGIN_FLOW])

        return loginFlow.success ? loginFlow.data : null;
    }

    static async saveLoginFlow(loginFlow: NextcloudLoginFlowStartResponseDto): Promise<void> {
        await browser.storage.local.set({
            [NEXTCLOUD_LOGIN_FLOW]: loginFlow,
        })
    }
}
