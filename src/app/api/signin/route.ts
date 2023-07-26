import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuid } from "uuid";

interface IData {
  email: string;
  username: string;
  password: string;
}

export const POST = async (request: Request) => {
  const { email, password }: IData = await request.json();

  const alreadyExistUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!alreadyExistUser) {
    return NextResponse.json(
      { message: "email or passord are invalds" },
      { status: 400 }
    );
  }

  if (alreadyExistUser.password !== password) {
    return NextResponse.json(
      { message: "email or passord are invalds" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    token: uuid(),
    user: {
      id: alreadyExistUser.id,
      email: alreadyExistUser.email,
      username: alreadyExistUser.username,
    },
  });
};
