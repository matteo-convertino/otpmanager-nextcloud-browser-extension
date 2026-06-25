import useAccountsStore from '@/stores/useAccountsStore'
import usePopupStore from '@/stores/usePopupStore'
import useSecretStore from '@/stores/useSecretStore'
import LocalStorageService from '@/services/LocalStorageService'
import {PopupScreen} from "@/utils/enum/popupScreen";
import SessionStorageService from "@/services/SessionStorageService";

export function usePopup() {
    const {clearAccounts} = useAccountsStore();
    const {setScreen} = usePopupStore();
    const {clearSecret, setSecret} = useSecretStore();

    async function init() {
        try {
            const credentials = await LocalStorageService.getCredentials()

            if (credentials && credentials.loginName && credentials.appPassword) {
                const secret = await SessionStorageService.getSecret();

                if (secret) {
                    setSecret(secret.passwordHash, secret.iv);
                    setScreen(PopupScreen.ACCOUNTS);
                    return;
                }

                setScreen(PopupScreen.PASSWORD);
                return;
            }

            const loginFlow = await LocalStorageService.getLoginFlow();

            if (loginFlow) {
                setScreen(PopupScreen.WAITING_LOGIN);
                return;
            }

            setScreen(PopupScreen.SETUP);
        } catch (err) {
            await reset();
        }
    }


    async function reset() {
        await LocalStorageService.clear();
        await SessionStorageService.clear();
        clearSecret();
        clearAccounts();
        setScreen(PopupScreen.SETUP);
    }

    return {init, reset};
}
