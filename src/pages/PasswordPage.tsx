import {ActionIcon, Box, Button, PasswordInput, Stack} from '@mantine/core'
import {useUnlockPage} from '@/hooks/useUnlockPage'
import {PageHeader} from "@/components/PageHeader";
import {IconLogout2} from "@tabler/icons-react";
import {usePopup} from "@/hooks/usePopup";

export function PasswordPage() {
    const {form, isUnlocking, onSubmit} = useUnlockPage();
    const {reset} = usePopup();

    return (
        <Box component="form" onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Stack>
                <PageHeader
                    subtitle={"Nextcloud browser extension"}
                    iconTrailing={
                        <ActionIcon variant="subtle" color="red" onClick={reset}>
                            <IconLogout2 style={{width: '70%', height: '70%'}}/>
                        </ActionIcon>
                    }
                />

                <PasswordInput
                    label="OTP Manager Password"
                    placeholder="Insert your password"
                    {...form.getInputProps('password')}
                />

                <Button type="submit" disabled={isUnlocking}>
                    Check
                </Button>
            </Stack>
        </Box>
    )
}
