import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { Form, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Prisma, PrismaClient } from "@prisma/client";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import "~/styles/index.css";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  /* const { API } = await import("~/routes/api");
  const links = await API.getLinks();
  return json(links); */
  return null;
};

interface LinkFormValues {
  description: string;
}

export default function LinkPage() {
  const form = useForm<Prisma.LinkCreateInput>({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      description: "",
      url: "",
    },
    validate: {
      url: (value) => {
        if (!value) return "Url is required";
      },
      description: (value) => {
        if (!value) return "Description is required";
      },
    },
  });

  const onSubmit = async (formData: any, event: React.FormEvent) => {
    console.log(formData);
    console.log(event);
    event.preventDefault();
  };

  const handleSubmit = form.onSubmit((formdata, event) => {
    console.log(formdata);
    console.log(event);
    const form = (event?.target as HTMLButtonElement).form; // Access the form element
    if (form) {
      form.submit(); // Submit the form programmatically
    }
  });

  return (
    <>
      <div className="c-container">
        <div className="items">
          <Form
            className="form"
            method="post"
            action="/links"
            onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              placeholder="Description"
              name="description"
              key={form.key("description")}
              size="xl"
              {...form.getInputProps("description")}
            />
            <TextInput
              withAsterisk
              placeholder="Url"
              name="url"
              key={form.key("url")}
              size="xl"
              mt="md"
              {...form.getInputProps("url")}
            />
            <Button
              fullWidth
              justify="center"
              variant="outline"
              color="rgba(197, 199, 125, 1)"
              size="md"
              mt="md"
              radius="lg"
              type="submit">
              Guardar
            </Button>
          </Form>
          <Button
            fullWidth
            justify="center"
            variant="outline"
            color="rgba(197, 199, 125, 1)"
            size="md"
            mt="md"
            radius="lg">
            <Link to={`/`}>Buscar</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export async function createLink(data: Prisma.LinkCreateInput) {
  const { API } = await import("~/routes/api");
  const newLink = await API.createLink(data);
  return newLink;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const url = formData.get("url");
  const description = formData.get("description");

  if (typeof url !== "string" || typeof description !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  const data = {
    url,
    description,
  };

  const result = await createLink(data);

  return json({ ok: true });
}
