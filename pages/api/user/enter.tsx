import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  // let user;
  // if (email) {
  //   user = await client.user.findUnique({ where: { email } });
  //   if (user) console.log("유저를 찾았어!");
  //   if (!user) {
  //     console.log("이메일 유저정보 없음. 유저생성 시작");
  //     user = await client.user.create({ data: { name: "Anonymous", email } });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({ where: { phone: +phone } });
  //   if (user) console.log("유저를 찾았어!");
  //   if (!user) {
  //     console.log("휴대폰 유저정보 없음. 유저생성 시작");
  //     user = await client.user.create({
  //       data: { name: "Anonymous", phone: +phone },
  //     });
  //   }
  //   console.log(user);
  // }
  const payload = phone ? { phone: +phone } : { email };
  const token = await client.token.create({
    data: {
      payload: "1234",
      user: {
        // 입력된 유저아이디 값으로 토큰과 연결
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "익명",
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);
  return res.status(200).end();
}

export default withHandler("POST", handler);
