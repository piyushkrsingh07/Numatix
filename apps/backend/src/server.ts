

import { prisma } from "@repo/db";


const main = async () => {


  const users = await prisma.user.findMany();
  console.log(users);

}
main();
