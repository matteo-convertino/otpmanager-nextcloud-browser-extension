import {Text} from '@mantine/core'
import {AccountCard} from '@/components/AccountCard'
import {AccountDatatableResponseDto} from "@/dto/response/AccountDatatableResponseDto";

export function AccountList({accounts}: { accounts: AccountDatatableResponseDto[] }) {

    if (accounts.length === 0) return <Text c="dimmed" ta="center">No accounts</Text>;

    return accounts.map((account) => (
        <AccountCard key={String(account.id)} account={account}/>
    ));
}
