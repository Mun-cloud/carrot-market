import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Kind } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req;
  switch (kind) {
    case Kind.Fav:
    case Kind.Purchase:
    case Kind.Sale:
      const records = await client.record.findMany({
        where: {
          kind,
          userId: user?.id,
        },
        include:
          kind === Kind.Sale
            ? {
                product: {
                  include: {
                    _count: {
                      select: {
                        records: {
                          where: {
                            kind: "Sale",
                          },
                        },
                      },
                    },
                  },
                },
              }
            : {
                product: true,
              },
      });
      res.json({ ok: true, records });
      break;
    default:
      return res.json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
