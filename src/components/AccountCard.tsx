import {ActionIcon, Box, Group, Paper, Progress, Stack, Text, Tooltip} from '@mantine/core'
import {IconCheck, IconCopy, IconLockOpen, IconReload} from '@tabler/icons-react'
import {useAccountOtpCode} from '@/hooks/useAccountOtpCode'
import {OtpType} from "@/utils/enum/otpType";
import {useUpdateCounter} from "@/hooks/useUpdateCounter";
import {AccountDatatableResponseDto} from "@/dto/response/AccountDatatableResponseDto";

export function AccountCard({account}: { account: AccountDatatableResponseDto }) {
    const {
        canCopyCode,
        copied,
        getCodeLabel,
        progress,
        copyCode,
    } = useAccountOtpCode(account)
    const {isUpdatingCounter, updateCounter} = useUpdateCounter(account)
    const canShowProgress = account.type === OtpType.TOTP && canCopyCode

    return (
        <Paper
            pos={"relative"}
            shadow={"sm"}
            style={{overflow: "hidden"}}
            withBorder
            h={100}
        >
            <Stack p={"sm"}>
                <Group justify="space-between" align="start">
                    <Box style={{minWidth: 0, flex: 1}}>
                        <Text fw={700} truncate>{account.issuer !== "" ? account.issuer : account.name}</Text>
                        <Text size="xs" c="dimmed" truncate>{account.issuer !== "" ? account.name : ''}</Text>
                    </Box>

                    <Group gap="xs" wrap="nowrap">
                        {account.type === OtpType.HOTP && account.unlocked !== false && (
                            <ActionIcon
                                disabled={isUpdatingCounter}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    updateCounter();
                                }}
                                variant="subtle"
                                aria-label="Generate HOTP Code"
                            >
                                <IconReload size={16}/>
                            </ActionIcon>
                        )}
                        {account.unlocked === false && (
                            <Tooltip label="The shared account must first be unlocked">
                                <IconLockOpen size={16}/>
                            </Tooltip>
                        )}
                        <Text ff="monospace" fw={800} size="xl">
                            {getCodeLabel(account)}
                        </Text>
                        <ActionIcon
                            disabled={!canCopyCode}
                            variant="subtle"
                            onClick={copyCode}
                            aria-label="Copy OTP Code"
                        >
                            {copied ? <IconCheck size={16}/> : <IconCopy size={16}/>}
                        </ActionIcon>
                    </Group>
                </Group>
            </Stack>



            {canShowProgress && (
                <Progress
                    value={progress}
                    size="xs"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                />
            )}
        </Paper>
    )
}
