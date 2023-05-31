import { Button, Container, Group, MantineProvider, Radio, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Notifications, notifications } from "@mantine/notifications"
import { useEffect } from "react"
import { useAsync } from "react-async-hook"
import { Options, getOptions, saveOptions } from "~/app/options"
import { PageTitle } from "~/components/PageTitle"

export function App() {
    const form = useForm<Options>()
    const options = useAsync(getOptions, [])

    useEffect(() => {
        if (options.result) form.setValues(options.result)
    }, [form.setValues, options.result])

    const handleSubmit = (options: Options) => {
        saveOptions(options)
        notifications.show({
            message: "Settings saved.",
            color: "green",
        })
    }

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications position="top-right" />
            <PageTitle />

            <Container>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput label="CommaFeed URL" {...form.getInputProps("url")} required />

                        <Radio.Group
                            label="On click"
                            description="What happens when the extension button is clicked"
                            {...form.getInputProps("mode")}
                        >
                            <Group mt="xs">
                                <Radio value="popup" label="Show CommaFeed in a popup" />
                                <Radio value="open_tab" label="Open CommaFeed in a new tab" />
                            </Group>
                        </Radio.Group>

                        <Button type="submit">Save</Button>
                    </Stack>
                </form>
            </Container>
        </MantineProvider>
    )
}
