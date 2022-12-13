import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

client.user.create({
  data: {
    email: "Hi",
    name: "태태호",
  },
});
