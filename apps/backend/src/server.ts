import "dotenv/config"; 
import { prisma } from "@repo/db";

const main = async () => {
  console.log("DB:", process.env.DATABASE_URL);

  const users = await prisma.user.findMany();
  console.log(users);

}
main();
