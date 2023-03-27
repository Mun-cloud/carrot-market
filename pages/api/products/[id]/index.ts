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
  const products = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = products?.name
    .split(" ")
    .map((word) => ({ name: { contains: word } }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: products?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.record.findFirst({
      where: {
        kind: "Fav",
        productId: products?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, products, isLiked, relatedProducts });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
