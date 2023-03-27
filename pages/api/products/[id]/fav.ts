import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client.record.findFirst({
    where: {
      kind: "Fav",
      productId: Number(id),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    // delete
    await client.record.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // create
    await client.record.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: Number(id),
          },
        },
        kind: "Fav",
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
