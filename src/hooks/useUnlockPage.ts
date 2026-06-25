import {schemaResolver, useForm} from '@mantine/form'
import useOtpManagerApi from "@/hooks/useOtpManagerApi";
import LocalStorageService from "@/services/LocalStorageService";
import PasswordService from "@/services/api/PasswordService";
import useOtpManagerNotifications from "@/hooks/useOtpManagerNotifications";
import {usePopup} from "@/hooks/usePopup";
import useSecretStore from "@/stores/useSecretStore";
import {SHA256} from "crypto-es";
import usePopupStore from "@/stores/usePopupStore";
import {PopupScreen} from "@/utils/enum/popupScreen";
import {useState} from "react";
import SessionStorageService from "@/services/SessionStorageService";
import {PasswordRequestDTO, passwordRequestDtoSchema} from "@/dto/request/PasswordRequestDto";

export function useUnlockPage() {
    const [isUnlocking, setIsUnlocking] = useState(false);
    const otpManagerApi = useOtpManagerApi();
    const {showError} = useOtpManagerNotifications();
    const {reset} = usePopup();
    const {setSecret} = useSecretStore();
    const {setScreen} = usePopupStore();

    const form = useForm<PasswordRequestDTO>({
        initialValues: {
            password: '',
        },
        validate: schemaResolver(passwordRequestDtoSchema),
    });

    async function onSubmit(passwordRequestDTO: PasswordRequestDTO) {
        setIsUnlocking(true);

        const credentials = await LocalStorageService.getCredentials();
        if (!credentials) {
            showError({
                title: "No connection with Nextcloud server found",
                message: "Connection with Nextcloud server not found. Try to login again."
            });
            await reset();
            return;
        }

        otpManagerApi({
            showNotifications: false,
            api: () => PasswordService.check(passwordRequestDTO),
            onComplete: async (result) => {
                const passwordHash = SHA256(passwordRequestDTO.password).toString();

                await SessionStorageService.saveSecret({
                    passwordHash,
                    iv: result.iv,
                });

                setSecret(passwordHash, result.iv);
                setScreen(PopupScreen.ACCOUNTS);
                setIsUnlocking(false);
            },
            onError: (e) => {
                form.setFieldError("password", e.message.toString());
                setIsUnlocking(false);
            },
            onGenericError: () => {
                form.setFieldError("password", "Something went wrong");
                setIsUnlocking(false);
            },
        })
    }

    return {
        form,
        isUnlocking,
        onSubmit,
    }
}
