import {useEffect, useState} from 'react';
import AccountService from "@/services/api/AccountService";
import useOtpManagerApi from "@/hooks/useOtpManagerApi";
import useAccountsStore from "@/stores/useAccountsStore";
import useEncryption from "@/hooks/useEncryption";
import SessionStorageService from "@/services/SessionStorageService";
import {AccountDatatableResponseDto} from "@/dto/response/AccountDatatableResponseDto";

export function useAccountsPage() {
    const otpManagerApi = useOtpManagerApi();
    const {decrypt} = useEncryption();
    const {setAccounts} = useAccountsStore();

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        void initAccounts();
    }, []);

    async function initAccounts() {
        const sessionAccounts = await SessionStorageService.getAccounts();

        if (sessionAccounts) {
            setDecryptedAccounts(sessionAccounts);
            return;
        }

        void fetch();
    }

    function fetch() {
        setIsFetching(true);

        otpManagerApi({
            showNotifications: false,
            api: () => AccountService.findAll(),
            onComplete: async (accounts) => {
                accounts = accounts.sort((a, b) => a.position - b.position);
                await SessionStorageService.saveAccounts(accounts);
                setDecryptedAccounts(accounts);
                setIsFetching(false);
            },
            onError: () => setIsFetching(false),
            onGenericError: () => setIsFetching(false),
        });
    }

    function setDecryptedAccounts(accounts: AccountDatatableResponseDto[]) {
        setAccounts(accounts.map(a => ({
            ...a,
            secret: decrypt(a.secret),
        })));
    }

    return {isFetching, fetch};
}
