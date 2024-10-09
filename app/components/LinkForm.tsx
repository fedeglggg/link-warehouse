import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { Form, useLoaderData } from "@remix-run/react";
import { useForm } from "@mantine/form";
import { FormEvent } from "react";
interface LinkFormValues {
  url: string;
  description: string;
  title: string;
}

export function LinkForm() {
  const form = useForm<LinkFormValues>({
    mode: "controlled",
    validateInputOnBlur: true,
    initialValues: {
      url: "",
      description: "",
      title: "",
    },
    validate: {
      url: (value) => (value.length < 5 ? "URL is too short" : null),
      description: (value) =>
        value.length < 5 ? "Description is too short" : null,
      title: (value) => (value.length < 5 ? "Title is too short" : null),
    },
  });

  const onSubmit = (
    values: LinkFormValues,
    event: FormEvent<HTMLFormElement> | undefined
  ) => {
    const result = form.validate();
    console.log("result");

    if (!form.isValid() || result.hasErrors) {
      event?.preventDefault();
      /* const formElement = event.currentTarget;
      formElement.submit(); */
    }
  };

  return (
    <Form method="post" action="/links" onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        withAsterisk
        placeholder="Title"
        name="title"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <TextInput
        withAsterisk
        placeholder="URL"
        name="url"
        key={form.key("url")}
        {...form.getInputProps("url")}
      />

      <TextInput
        withAsterisk
        placeholder="Description"
        name="description"
        key={form.key("description")}
        {...form.getInputProps("description")}
      />

      <Group justify="flex-end" mt="md">
        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: "blue", to: "grape", deg: 96 }}>
          Submit
        </Button>
      </Group>
    </Form>
  );
}
