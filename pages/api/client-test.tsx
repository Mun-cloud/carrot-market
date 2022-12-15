import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      email: "Hi",
      name: "태태호",
    },
  });

  res.json({ ok: true });
}
