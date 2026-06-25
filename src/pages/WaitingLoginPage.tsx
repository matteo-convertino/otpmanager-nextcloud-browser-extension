import {Button, Divider, Group, Stack, Text} from '@mantine/core'
import {useLoginFlowPage} from '@/hooks/useLoginFlowPage'
import waitingLottie from "@/assets/waiting.json";
import {useLottie} from "lottie-react";
import {PageHeader} from "@/components/PageHeader";

export function WaitingLoginPage() {
    const {
        serverUrl,
        reopenLoginFlowTab,
        cancelLoginFlow,
    } = useLoginFlowPage();

    const {View: WaitingLottie} = useLottie({
        animationData: waitingLottie,
        loop: true,
        style: {
            width: "24px",
            height: "24px",
        }
    });

    return (
        <Stack>
            <PageHeader subtitle={"Waiting for login..."} iconTrailing={WaitingLottie}/>

            <Divider />

            <Text size="sm">
                Server: <strong>{serverUrl ?? ''}</strong>
            </Text>

            <Group grow>
                <Button variant="default" onClick={reopenLoginFlowTab}>
                    Reopen page
                </Button>
            </Group>

            <Button variant="subtle" color="red" onClick={cancelLoginFlow}>
                Go back
            </Button>
        </Stack>
    )
}
