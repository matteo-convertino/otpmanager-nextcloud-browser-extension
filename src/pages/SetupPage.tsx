import {Box, Button, Divider, Stack, TextInput} from '@mantine/core'
import {IconExternalLink} from '@tabler/icons-react'
import {useSetupPage} from '@/hooks/useSetupPage'
import {PageHeader} from "@/components/PageHeader";

export function SetupPage() {
    const {form, onSubmit} = useSetupPage();

    return (
        <Box component="form" onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Stack>
                <PageHeader subtitle={"Nextcloud browser extension"} />

                <Divider />

                <TextInput
                    label="Nextcloud server"
                    placeholder="https://cloud.example.com"
                    {...form.getInputProps('server')}
                />
                <Button type="submit" leftSection={<IconExternalLink size={16}/>}>
                    Connect
                </Button>
            </Stack>
        </Box>
    );
}
