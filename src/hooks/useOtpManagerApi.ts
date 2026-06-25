import type { ReactNode } from "react";
import type { OcsMetaDto } from "@/dto/utils/OcsMetaDto";
import { callApi } from "@/hooks/utils/callApi";
import useOtpManagerNotifications from "@/hooks/useOtpManagerNotifications";

export default function useOtpManagerApi() {
  const {
    showLoading,
    updateSuccess,
    updateError,
    updateErrors,
  } = useOtpManagerNotifications();

  return <T>({
    api,
    titleOnSuccess,
    messageOnSuccess,
    iconOnSuccess,
    titleOnLoading,
    messageOnLoading,
    messageOnGenericError = "Generic error",
    onComplete,
    onError,
    onGenericError,
    showNotifications = true,
  }: {
    api: () => Promise<T>;
    titleOnSuccess?: string;
    messageOnSuccess?: string | ReactNode;
    iconOnSuccess?: ReactNode;
    titleOnLoading?: string;
    messageOnLoading?: string;
    messageOnGenericError?: string;
    onComplete?: (_: T) => void;
    onError?: (_: OcsMetaDto) => void;
    onGenericError?: (_: unknown) => void;
    showNotifications?: boolean;
  }): void => {
    if (showNotifications) {
      showLoading({
        title: titleOnLoading ?? "Loading",
        message: messageOnLoading ?? "Request in progress",
      });
    }

    callApi<T>({
      api,
      onComplete: (response) => {
        if (showNotifications) {
          updateSuccess({
            title: titleOnSuccess ?? "Success",
            message: messageOnSuccess ?? "Operation completed",
            icon: iconOnSuccess,
          });
        }

        onComplete?.(response);
      },
      onError: (errorDto) => {
        if (showNotifications) {
          updateErrors({ errorDTO: errorDto });
        }

        onError?.(errorDto);
      },
      onGenericError: (error) => {
        if (showNotifications) {
          updateError({
            title: "Generic Error",
            message: messageOnGenericError,
          });
        }

        onGenericError?.(error);
      },
    });
  };
}
