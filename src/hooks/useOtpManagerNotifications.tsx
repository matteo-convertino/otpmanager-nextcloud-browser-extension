import { useRef, type ReactNode } from "react";
import { List, Stack, Text } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";
import type { OcsMetaDto } from "@/dto/utils/OcsMetaDto";

type NotificationParams = {
  title: string;
  message: string | ReactNode;
  icon?: ReactNode;
};

enum NotificationType {
  Error,
  Success,
  Loading,
  Info,
}

export default function useOtpManagerNotifications() {
  const notificationId = useRef(randomId("otp-manager-notification-"));

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.Error:
        return <IconX size={16} />;
      case NotificationType.Success:
        return <IconCheck size={16} />;
      default:
        return <IconInfoCircle size={16} />;
    }
  };

  const getColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.Error:
        return "red";
      case NotificationType.Success:
        return "teal";
      case NotificationType.Loading:
        return "gray";
      default:
        return "blue";
    }
  };

  const showNotification = (
    type: NotificationType,
    { title, message, icon }: NotificationParams,
    update = false,
  ) => {
    const notificationProps = {
      id: notificationId.current,
      title,
      message,
      loading: type === NotificationType.Loading,
      withCloseButton: type !== NotificationType.Loading,
      autoClose: type === NotificationType.Loading ? false : 2000,
      color: getColor(type),
      icon: icon === undefined ? getIcon(type) : icon,
    };

    update ? notifications.update(notificationProps) : notifications.show(notificationProps);
  };

  const showLoading = (params: NotificationParams) =>
    showNotification(NotificationType.Loading, params);

  const showSuccess = (params: NotificationParams) =>
    showNotification(NotificationType.Success, params);

  const updateSuccess = (params: NotificationParams) =>
    showNotification(NotificationType.Success, params, true);

  const showError = (params: NotificationParams) =>
    showNotification(NotificationType.Error, params);

  const updateError = (params: NotificationParams) =>
    showNotification(NotificationType.Error, params, true);

  const showInfo = (params: NotificationParams) =>
    showNotification(NotificationType.Info, params);

  const showErrors = ({ errorDTO }: { errorDTO: OcsMetaDto }) =>
    handleErrors(errorDTO, showError);

  const updateErrors = ({ errorDTO }: { errorDTO: OcsMetaDto }) =>
    handleErrors(errorDTO, updateError);

  const handleErrors = (
    errorDTO: OcsMetaDto,
    handler: (params: NotificationParams) => void,
  ) => {
    const title = getTitleByStatus(errorDTO.statuscode);
    const message = errorDTO.message;

    if (typeof message === "string") {
      handler({ title, message });
    } else if (Array.isArray(message)) {
      handler({
        title,
        message: (
          <List spacing={2} size="sm">
            {message.map((value, index) => (
              <List.Item key={index}>{value}</List.Item>
            ))}
          </List>
        ),
      });
    } else {
      const errors = Object.entries(message);

      handler({
        title,
        message: (
          <Stack gap="xs">
            {errors.map(([key, values]) => (
              <Stack key={key} gap={0}>
                <Text fw={600}>{key}</Text>

                <List spacing={2} size="sm">
                  {values.map((value, index) => (
                    <List.Item key={index}>{value}</List.Item>
                  ))}
                </List>
              </Stack>
            ))}
          </Stack>
        ),
      });
    }
  };

  const getTitleByStatus = (status: number) => {
    if (status >= 500) return "Server error";
    if (status === 404) return "Not found";
    if (status === 401) return "Unauthorized";
    if (status === 403) return "Access denied";
    if (status === 400) return "Invalid request";
    if (status === 409) return "Conflict";
    if (status === 422) return "Validation error";
    if (status >= 400) return "Request error";

    return "Something went wrong";
  };

  return {
    showErrors,
    showLoading,
    showSuccess,
    updateSuccess,
    showInfo,
    updateError,
    showError,
    updateErrors,
  };
}
