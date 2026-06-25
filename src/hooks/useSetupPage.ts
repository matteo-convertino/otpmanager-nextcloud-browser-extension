import {schemaResolver, useForm} from '@mantine/form'
import {type SetupFormDto, setupFormDtoSchema} from '@/dto/utils/SetupFormDto'
import usePopupStore from "@/stores/usePopupStore";
import {PopupScreen} from "@/utils/enum/popupScreen";
import LocalStorageService from "@/services/LocalStorageService";
import NextcloudLoginFlowService from "@/services/NextcloudLoginFlowService";
import useOtpManagerApi from "@/hooks/useOtpManagerApi";
import {useState} from "react";

export function useSetupPage() {
    const {setScreen} = usePopupStore();
    const otpManagerApi = useOtpManagerApi();
    const [isStartingLoginFlow, setIsStartingLoginFlow] = useState(false);

    const form = useForm<SetupFormDto>({
        initialValues: {
            server: '',
        },
        validate: schemaResolver(setupFormDtoSchema),
    });

    function onSubmit(values: SetupFormDto) {
        if (!/^https?:\/\//i.test(values.server)) {
            values.server = `https://${values.server}`;
        }

        setIsStartingLoginFlow(true);

        otpManagerApi({
            showNotifications: false,
            api: () => NextcloudLoginFlowService.start(values.server),
            onComplete: async (loginFlow) => {
                await LocalStorageService.saveCredentials({server: values.server});
                await LocalStorageService.saveLoginFlow(loginFlow);
                await browser.tabs.create({url: loginFlow.login});

                setScreen(PopupScreen.WAITING_LOGIN);
                setIsStartingLoginFlow(false);
            },
            onError: () => setIsStartingLoginFlow(false),
            onGenericError: () => setIsStartingLoginFlow(false),
        })
    }

    return {
        form,
        onSubmit,
        isStartingLoginFlow
    }
}
