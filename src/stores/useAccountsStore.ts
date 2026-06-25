import {create} from 'zustand'
import {AccountDatatableResponseDto} from "@/dto/response/AccountDatatableResponseDto";

type AccountsStore = {
    accounts: AccountDatatableResponseDto[]
    setAccounts: (accounts: AccountDatatableResponseDto[]) => void
    clearAccounts: () => void
}

const useAccountsStore = create<AccountsStore>((set) => ({
    accounts: [],
    setAccounts: (accounts) => set({accounts}),
    clearAccounts: () => set({accounts: []}),
}))

export default useAccountsStore
