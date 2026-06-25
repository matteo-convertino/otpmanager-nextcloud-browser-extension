import {useState} from 'react'
import {ActionIcon, Button, Divider, Group, ScrollArea, Skeleton, Stack, Text, TextInput} from '@mantine/core'
import {IconLogout2, IconRefresh, IconSearch} from '@tabler/icons-react'
import {AccountList} from '@/components/AccountList'
import {useAccountsPage} from '@/hooks/useAccountsPage'
import useAccountsStore from "@/stores/useAccountsStore";
import {PageHeader} from "@/components/PageHeader";
import {usePopup} from "@/hooks/usePopup";

export function AccountsPage() {
    const {isFetching, fetch} = useAccountsPage();
    const {accounts} = useAccountsStore();
    const [search, setSearch] = useState("");
    const normalizedSearch = search.trim().toLowerCase();
    const {reset} = usePopup();

    const filteredAccounts = normalizedSearch
        ? accounts.filter((account) => {
            const name = account.name.toLowerCase();
            const issuer = account.issuer.toLowerCase();

            return name.includes(normalizedSearch) || issuer.includes(normalizedSearch);
        })
        : accounts;

    const skeletons = Array.from({length: 10}, (_, index) => (
        <Skeleton key={index} height={100}/>
    ));

    return (
        <Stack h={500} pb={"md"}>
            <PageHeader
                subtitle={"Nextcloud browser extension"}
                iconTrailing={
                    <ActionIcon variant="subtle" color="red" onClick={reset}>
                        <IconLogout2 style={{width: '70%', height: '70%'}}/>
                    </ActionIcon>
                }
            />

            <Group justify="space-between">
                <Text size="sm" c="dimmed">
                    {accounts.length} accounts
                </Text>
                <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<IconRefresh size={14}/>}
                    disabled={isFetching}
                    onClick={fetch}
                >
                    Refresh
                </Button>
            </Group>

            <TextInput
                aria-label="Search accounts"
                placeholder="Search by name or issuer"
                leftSection={<IconSearch size={16}/>}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            />

            <Divider/>

            <ScrollArea>
                <Stack>
                    {
                        isFetching ?
                            skeletons :
                            <AccountList accounts={filteredAccounts}/>
                    }
                </Stack>
            </ScrollArea>
        </Stack>
    )
}
