import db from "~/db.server";

export const API = {
  async getLinks() {
    return await db.link.findMany({});
  },
  async getLink(linkId: string) {
    return await db.link.findUnique({
      where: {
        id: parseInt(linkId),
      },
    });
  },
  async createLink({
    url,
    title,
    description,
  }: {
    url: any;
    title: any;
    description: any;
  }) {
    const result = db.link.create({
      data: { url: url, title: title, description: description },
    });
    console.log("created", result);

    return result;
  },
  async updateLink({
    linkId,
    url,
    title,
    description,
  }: {
    linkId: string;
    url: any;
    title: any;
    description: any;
  }) {
    return db.link.update({
      where: { id: parseInt(linkId) },
      data: { url: url, title: title, description: description },
    });
  },
  async deleteLink(linkId: string) {
    return db.link.delete({
      where: {
        id: parseInt(linkId),
      },
    });
  },
};
