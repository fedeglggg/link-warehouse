import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { Form, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Prisma, PrismaClient } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";
import { Notification, rem } from "@mantine/core";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import "~/styles/links.css";
import { useState } from "react";
import ShowSuccessAlert from "~/components/Notification";

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
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [openAlert, setOpenAlert] = useState(false);
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

  const handleSubmit = form.onSubmit((formData, event) => {
    console.log(formData);
    console.log(event);
    event?.preventDefault();
    const formattedData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formattedData.append(key, value as string);
    });

    fetch("/links", {
      method: "POST",
      body: formattedData,
      headers: {
        // You generally don't need to set the Content-Type header for FormData.
        // 'Content-Type': 'multipart/form-data', // Remove this line
      },
    })
      .then((response) => {
        form.reset();
        console.log("success", response);
        setOpenAlert(true);
      })
      .catch((error) => {
        console.log("err", error);
      });
  });

  return (
    <>
      <div className="root">
        <div className="c-container">
          <div className="c-content">
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
            <Link to={`/`}>
              <Button
                fullWidth
                justify="center"
                variant="outline"
                color="rgba(197, 199, 125, 1)"
                size="md"
                mt="md"
                radius="lg">
                Buscar
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ShowSuccessAlert
        title={"Se ha agregado un link"}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
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
