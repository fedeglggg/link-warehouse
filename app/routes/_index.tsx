import type { MetaFunction } from "@remix-run/node";
import { Autocomplete } from "@mantine/core";
import { Form } from "@remix-run/react";
import { useForm } from "@mantine/form";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno

import "~/styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface LinkFormValues {
  description: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { API } = await import("~/routes/api");
  const links = await API.getLinks();
  const formatedLinks = links.map(
    (link, index) =>
      `${link.id || ""} -${link.title || ""} - ${link.description || ""}`
  );
  return formatedLinks;
};

export default function Index() {
  const formatedLinks = useLoaderData<typeof loader>();

  console.log("FL", formatedLinks);

  const form = useForm<LinkFormValues>({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      description: "",
    },
  });

  return (
    <div className="c-container">
      <Form className="form" method="get" action="/links">
        {/* <TextInput
          withAsterisk
          placeholder="Description"
          name="description"
          key={form.key("description")}
          size="xl"
          {...form.getInputProps("description")}
        /> */}

        <Autocomplete
          size="xl"
          label="Describe el link que deseas buscar"
          placeholder="Description"
          limit={10}
          data={formatedLinks}
        />
      </Form>
    </div>
  );
}
