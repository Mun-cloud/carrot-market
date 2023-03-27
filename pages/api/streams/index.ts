import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      take: 10,
    });
    res.json({ ok: true, streams });
  } else if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: { connect: { id: user?.id } },
      },
    });
    res.json({ ok: true, stream });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
