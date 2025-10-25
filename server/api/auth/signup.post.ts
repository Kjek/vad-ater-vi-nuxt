import bcrypt from 'bcrypt';
import { CreateAccount } from '~~/server/types/account';

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateAccount>(event);
  if (process.env.ADMIN_SECRET && body && process.env.ADMIN_SECRET === body.secret) {
    await prisma.user.create({
      data: {
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
      },
    });
  } else {
    throw createError({ statusCode: 400 });
  }
  setResponseStatus(event, 201, 'Created');
  return 'Created';
});
