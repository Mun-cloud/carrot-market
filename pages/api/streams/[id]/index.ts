import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  const {
    query: { id },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });
  const isOwner = stream?.userId === user?.id;
  if (stream && isOwner) {
    stream.cloudflareKey = "xxxxx";
    stream.cloudflareUrl = "xxxxx";
  }
  res.json({ ok: true, stream });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
