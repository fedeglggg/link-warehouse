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
  return (
    <>
      <div className="Links">
        {links.map((link) => (
          <p key={link.id}>
            {link.id} - {link.title ? link.title : ""} -{" "}
            {link.description ? link.description : ""}
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
  const newLink = await API.createLink({ url, title, description });
  return newLink;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const result = await createLink({
    url: formData.get("url"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  return json({ ok: true });
}
