import { Form, Link } from "@remix-run/react";
import { Autocomplete, Button } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { renderAutocompleteOption } from "~/helpers/renderAutocomplete";

import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";

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
  const comboboxLinkStringData = links.map((link) => {
    return `${link.id || ""} - ${link.description || ""} - ${link.url || ""}`;
  });
  return { links, comboboxLinkStringData };
};

export default function Index() {
  const { comboboxLinkStringData } = useLoaderData<typeof loader>();

  return (
    <div className="c-container">
      <Form className="form" method="get" action="/links">
        <Autocomplete
          size="xl"
          label="Descrive the link you want to search"
          placeholder="Description"
          limit={10}
          data={comboboxLinkStringData}
          renderOption={renderAutocompleteOption}
        />
        <Button
          fullWidth
          justify="center"
          variant="outline"
          color="rgba(197, 199, 125, 1)"
          size="md"
          mt="md"
          radius="xl"
          type="submit">
          <Link to={`/links/`}>New Link</Link>
        </Button>
      </Form>
    </div>
  );
}
