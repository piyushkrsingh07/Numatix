import dotenv from "dotenv";

import { prisma } from "@repo/db";
dotenv.config();

const main = async () => {
  console.log("DB:", process.env.DATABASE_URL);

  const users = await prisma.user.create({
    data: {
      email: "piyush02040@gmail.com",
      name: "Piyush Kumar Singh",
    },
  });
  console.log(users);

}
main();
