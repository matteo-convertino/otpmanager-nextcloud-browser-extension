import {Box, Group, Text, Title} from "@mantine/core";
import {ReactNode} from "react";

export function PageHeader({subtitle, iconTrailing}: { subtitle?: string, iconTrailing?: ReactNode }) {
    return (
        <Group justify={"space-between"} align="flex-start" wrap={"nowrap"}>
            <Box>
                <Group gap={"xs"}>
                    <Title order={3}>OTP Manager</Title>
                </Group>
                {subtitle && <Text size="sm" c="dimmed">{subtitle}</Text>}
            </Box>

            {iconTrailing}
        </Group>
    );
}
