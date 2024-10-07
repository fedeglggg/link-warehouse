import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { LinkForm } from "~/components/LinkForm";
/* import { API } from "./api"; */

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { API } = await import("~/routes/api");
  const links = await API.getLinks();
  return json(links);
};

export default function Link() {
  const links = useLoaderData<typeof loader>();
  console.log("links default", links);
  return (
    <>
      <div className="Links">
        {links.map((link) => (
          <p key={link.id}>
            {link.id} - {link.description}
          </p>
        ))}
      </div>
      <LinkForm />
    </>
  );
}

export async function createLink({
  url,
  title,
  description,
}: {
  url: any;
  title: any;
  description: any;
}) {
  const { API } = await import("~/routes/api");
  console.log("creating 1");
  const newLink = await API.createLink({ url, title, description });
  console.log("creating 2");
  return newLink;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("formData", formData);

  const result = await createLink({
    url: formData.get("url"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  console.log("Result", result);

  return json({ ok: true });
}
