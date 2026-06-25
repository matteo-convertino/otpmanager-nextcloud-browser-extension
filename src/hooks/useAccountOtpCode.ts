import {useEffect, useState} from 'react'
import {HOTP, TOTP} from 'otpauth'
import {OtpType} from "@/utils/enum/otpType";
import {AccountDatatableResponseDto} from "@/dto/response/AccountDatatableResponseDto";

export function useAccountOtpCode(account: AccountDatatableResponseDto) {
    const [code, setCode] = useState<string | null | undefined>()
    const [remaining, setRemaining] = useState(account.period)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        function update() {
            setCode(generateCode(account));

            if (account.type === OtpType.TOTP) {
                setRemaining(getRemainingSeconds(account.period));
            }
        }

        update();

        if (account.type !== OtpType.TOTP) return;

        const interval = window.setInterval(update, 1000);
        return () => window.clearInterval(interval);
    }, []);

    async function copyCode() {
        if (!code) return;

        await navigator.clipboard.writeText(code);
        setCopied(true);

        const timeout = window.setTimeout(() => setCopied(false), 1200);

        return () => window.clearTimeout(timeout);
    }

    function generateCode(account: AccountDatatableResponseDto) {
        if(account.unlocked === false) return null;

        if (account.type === OtpType.TOTP) {
            const totp = new TOTP({
                issuer: account.issuer,
                label: account.name,
                algorithm: account.algorithm,
                digits: account.digits,
                period: account.period,
                secret: account.secret,
            });

            return totp.generate();
        }

        if (account.counter === null || account.counter < 0) {
            return null;
        }

        const hotp = new HOTP({
            issuer: account.issuer,
            label: account.name,
            algorithm: account.algorithm,
            digits: account.digits,
            counter: account.counter,
            secret: account.secret,
        });

        return hotp.generate();
    }

    function getRemainingSeconds(period: number) {
        return period - (Math.floor(Date.now() / 1000) % period)
    }

    function getCodeLabel(account: AccountDatatableResponseDto): string {
        if (code === undefined) return "";

        let codeLabel = "";

        if (code !== null) codeLabel = code;
        else if (account.unlocked === false) codeLabel = "*".repeat(account.digits);
        else if (account.type === OtpType.HOTP) codeLabel = "-".repeat(account.digits);

        if (codeLabel && codeLabel.length > 1) {
            const middleIndex = Math.ceil(codeLabel.length / 2);
            codeLabel = `${codeLabel.slice(0, middleIndex)} ${codeLabel.slice(middleIndex)}`;
        }

        return codeLabel;
    }

    return {
        copied,
        getCodeLabel,
        canCopyCode: code !== null && code !== undefined,
        progress: (remaining / account.period) * 100,
        copyCode,
    }
}
