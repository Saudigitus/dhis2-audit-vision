import { atom } from "recoil";

export type SeverityRuleType = {
    action: string,
    id: string,
    messageTemplate: string,
    created_at: string,
    severity: "LOW" | "MEDIUM" | "HIGH",
    subject: string,
    objectType: string,
    recipients: {
        to: string[],
        cc: string[],
        bcc: string[]
    },
    updated_at: string
}

export const SeverityRulesSchema = atom<{ notifications: SeverityRuleType[] }>({
    default: undefined,
    key: "rules-state"
})