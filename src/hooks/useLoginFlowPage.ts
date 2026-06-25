import {useEffect, useState} from 'react'
import LocalStorageService from "@/services/LocalStorageService";
import usePopupStore from "@/stores/usePopupStore";
import {PopupScreen} from "@/utils/enum/popupScreen";
import NextcloudLoginFlowService from "@/services/NextcloudLoginFlowService";
import useOtpManagerApi from "@/hooks/useOtpManagerApi";
import browser from "webextension-polyfill";

export function useLoginFlowPage() {
    const [serverUrl, setServerUrl] = useState<string | undefined>();
    const {setScreen} = usePopupStore();
    const otpManagerApi = useOtpManagerApi();

    useEffect(() => {
        const init = async () => {
            const credentials = await LocalStorageService.getCredentials();
            if (!credentials) return;

            setServerUrl(credentials.server);

            const loginFlow = await LocalStorageService.getLoginFlow();
            if (!loginFlow) return;

            pollLoginFlow(loginFlow.poll.token, credentials.server);
        };

        void init();
    }, []);

    const pollLoginFlow = (pollToken: string, serverUrl: string) => {
        otpManagerApi({
            api: () => NextcloudLoginFlowService.poll(pollToken, serverUrl),
            onComplete: async (credentials) => {
                if(!credentials || !credentials.server || !credentials.loginName || !credentials.appPassword) return;

                await LocalStorageService.saveCredentials(credentials);
                setScreen(PopupScreen.PASSWORD);
            },
            showNotifications: false,
        })
    }

    async function reopenLoginFlowTab() {
        const loginFlow = await LocalStorageService.getLoginFlow();
        if(!loginFlow) return;

        await browser.tabs.create({url: loginFlow.login});
    }

    async function cancelLoginFlow() {
        await LocalStorageService.clear();
        setScreen(PopupScreen.SETUP);
    }

    return {
        serverUrl,
        reopenLoginFlowTab,
        cancelLoginFlow,
    }
}
