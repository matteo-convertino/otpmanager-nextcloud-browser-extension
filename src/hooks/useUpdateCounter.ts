import {useState} from 'react'
import AccountService from "@/services/api/AccountService";
import useOtpManagerApi from "@/hooks/useOtpManagerApi";
import useAccountsStore from "@/stores/useAccountsStore";
import SessionStorageService from "@/services/SessionStorageService";
import SharedAccountService from "@/services/api/SharedAccountService";
import {AccountDatatableResponseDto} from "@/dto/response/AccountDatatableResponseDto";
import {SharedAccountResponseDto} from "@/dto/response/SharedAccountResponseDto";
import {AccountResponseDto} from "@/dto/response/AccountResponseDto";

export function useUpdateCounter(account: AccountDatatableResponseDto) {
    const otpManagerApi = useOtpManagerApi();
    const [isUpdatingCounter, setIsUpdatingCounter] = useState(false);

    function updateCounter() {
        setIsUpdatingCounter(true);

        otpManagerApi<SharedAccountResponseDto | AccountResponseDto>({
            showNotifications: false,
            api: () => account.isShared
                ? SharedAccountService.updateCounter({id: account.id})
                : AccountService.updateCounter({id: account.id}),
            onComplete: async (accountResponseDTO) => {
                setIsUpdatingCounter(false);

                if (accountResponseDTO.counter === null) return;

                useAccountsStore.setState((state) => ({
                    accounts: state.accounts.map((a) =>
                        a.id === account.id ? {...a, counter: accountResponseDTO.counter} : a
                    ),
                }));

                const sessionAccounts = await SessionStorageService.getAccounts();

                if (sessionAccounts) {
                    await SessionStorageService.saveAccounts(
                        sessionAccounts.map((a) =>
                            a.id === account.id ? {...a, counter: accountResponseDTO.counter} : a
                        )
                    );
                }
            },
            onError: () => setIsUpdatingCounter(false),
            onGenericError: () => setIsUpdatingCounter(false),
        });
    }

    return {
        isUpdatingCounter,
        updateCounter,
    };
}
