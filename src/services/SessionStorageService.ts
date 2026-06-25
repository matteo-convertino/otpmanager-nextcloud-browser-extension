import browser from 'webextension-polyfill'
import {
    type OtpManagerSecretDto,
    otpManagerSecretDtoSchema
} from "@/dto/utils/OtpManagerSecretDto";
import {z} from "zod";
import {
    AccountDatatableResponseDto,
    accountDatatableResponseSchema
} from "@/dto/response/AccountDatatableResponseDto";

const OTP_MANAGER_SECRET = 'otpmanager.secret'
const OTP_MANAGER_ACCOUNTS = 'otpmanager.accounts'

export default class SessionStorageService {
    static async getSecret(): Promise<OtpManagerSecretDto | null> {
        const result = await browser.storage.session.get(OTP_MANAGER_SECRET)
        const secret = otpManagerSecretDtoSchema.safeParse(result[OTP_MANAGER_SECRET])

        return secret.success ? secret.data : null
    }

    static async saveSecret(secret: OtpManagerSecretDto): Promise<void> {
        await browser.storage.session.set({
            [OTP_MANAGER_SECRET]: secret,
        })
    }

    static async getAccounts(): Promise<AccountDatatableResponseDto[] | null> {
        const result = await browser.storage.session.get(OTP_MANAGER_ACCOUNTS)
        const accounts = z.array(accountDatatableResponseSchema).safeParse(result[OTP_MANAGER_ACCOUNTS])

        return accounts.success ? accounts.data : null
    }

    static async saveAccounts(accounts: AccountDatatableResponseDto[]): Promise<void> {
        await browser.storage.session.set({
            [OTP_MANAGER_ACCOUNTS]: accounts,
        })
    }

    static async clear(): Promise<void> {
        await browser.storage.session.remove([
            OTP_MANAGER_SECRET,
            OTP_MANAGER_ACCOUNTS,
        ])
    }
}
