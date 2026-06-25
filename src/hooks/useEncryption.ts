import {AES, Hex, Utf8} from "crypto-es";
import useSecretStore from "@/stores/useSecretStore";
import usePopupStore from "@/stores/usePopupStore";
import {PopupScreen} from "@/utils/enum/popupScreen";

export default function useEncryption() {
  const {passwordHash, iv, clearSecret} = useSecretStore();
  const {setScreen} = usePopupStore();

  function encrypt(plainText: string): string {
    if (passwordHash == "" || iv == "") return "";

    const key = Hex.parse(passwordHash);
    const parsedIv = Hex.parse(iv);

    return AES.encrypt(plainText, key, {iv: parsedIv}).toString();
  }

  function decrypt(cipherText: string): string {
    if (passwordHash == "" || iv == "") return "";

    const key = Hex.parse(passwordHash);
    const parsedIv = Hex.parse(iv);

    try {
      const dec = AES.decrypt(cipherText, key, {iv: parsedIv});
      return dec.toString(Utf8);
    } catch {
      clearSecret();
      setScreen(PopupScreen.PASSWORD);
      return '';
    }

  }

  return {encrypt, decrypt};
}
