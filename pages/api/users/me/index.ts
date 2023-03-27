import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    res.json({ ok: true, profile });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name, avatarId },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({ ok: false, error: "이미 사용중인 이메일 입니다." });
      }
    }
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "이미 사용중인 휴대폰 번호 입니다.",
        });
      }
    }
    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }
    const getData = () => {
      const nameData = name && name !== currentUser?.name && { name };
      const emailData = email && email !== currentUser?.email && { email };
      const phoneData = phone && phone !== currentUser?.phone && { phone };
      return { ...phoneData, ...emailData, ...nameData };
    };
    console.log(getData());
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: getData(),
    });
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
