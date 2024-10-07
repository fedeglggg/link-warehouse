import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Form, useLoaderData } from "@remix-run/react";

interface LinkFormValues {
  url: string;
  description: string;
  title: string;
}

export function LinkForm() {
  const form = useForm<LinkFormValues>({
    mode: "controlled",
    initialValues: {
      url: "",
      description: "",
      title: "",
    },
  });

  const handleSubmit = async (
    values: LinkFormValues,
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key as keyof LinkFormValues]);
        }
      }
      const response = await fetch("/links", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Form submitted successfully:", responseData);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <form method="POST" action="/links" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        placeholder="Title"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <TextInput
        withAsterisk
        placeholder="URL"
        key={form.key("url")}
        {...form.getInputProps("url")}
      />

      <TextInput
        withAsterisk
        placeholder="Description"
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
    </form>
  );
}
