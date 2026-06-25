import {create} from 'zustand'

type SecretStore = {
    passwordHash: string
    iv: string
    setSecret: (passwordHash: string, iv: string) => void
    clearSecret: () => void
}

const emptySecret = {
    passwordHash: '',
    iv: '',
}

const useSecretStore = create<SecretStore>((set) => ({
    ...emptySecret,
    setSecret: (passwordHash, iv) => set({passwordHash, iv}),
    clearSecret: () => set(emptySecret),
}))

export default useSecretStore
