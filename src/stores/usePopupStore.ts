import {create} from 'zustand'
import {PopupScreen} from "@/utils/enum/popupScreen";

type PopupStore = {
    screen: PopupScreen
    setScreen: (screen: PopupScreen) => void
}

const usePopupStore = create<PopupStore>((set) => ({
    screen: PopupScreen.LOADING,
    setScreen: (screen) => set({screen}),
}))

export default usePopupStore
