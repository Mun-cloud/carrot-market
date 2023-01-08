import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
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
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        // 입력된 유저아이디 값으로 토큰과 연결
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "익명",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `your login token is ${payload}.!`,
    });
    console.log(message);
  } else if (email) {
    const email = await mail.send({
      from: "mun05170@naver.com", // 인증했던 이메일 주소
      to: "mun05170@naver.com",
      subject: "캐럿마켓 인증 메일",
      text: `토큰 번호는 ${payload} 입니다.`,
      html: `<strong>토큰 번호는 ${payload} 입니다.</strong>`,
    });
    console.log(email);
  }
  return res.json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
