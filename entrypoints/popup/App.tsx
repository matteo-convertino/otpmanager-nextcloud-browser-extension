import {Box} from '@mantine/core'
import {AccountsPage} from '@/pages/AccountsPage'
import {LoadingPage} from '@/pages/LoadingPage'
import {WaitingLoginPage} from '@/pages/WaitingLoginPage'
import {SetupPage} from '@/pages/SetupPage'
import {PasswordPage} from '@/pages/PasswordPage'
import {usePopup} from "@/hooks/usePopup";
import {useEffect} from "react";
import usePopupStore from "@/stores/usePopupStore";
import {PopupScreen} from "@/utils/enum/popupScreen";

export default function App() {
    const {init} = usePopup();
    const {screen} = usePopupStore();

    useEffect(() => {
        void init();
    }, []);

    function getPage() {
        switch (screen) {
            case PopupScreen.SETUP:
                return <SetupPage/>
            case PopupScreen.WAITING_LOGIN:
                return <WaitingLoginPage/>
            case PopupScreen.PASSWORD:
                return <PasswordPage/>
            case PopupScreen.ACCOUNTS:
                return <AccountsPage/>
            case PopupScreen.LOADING:
                return <LoadingPage/>;
        }
    }

    return (
        <Box p={"md"} mah={500} w={400}>
            {getPage()}
        </Box>
    );
}
