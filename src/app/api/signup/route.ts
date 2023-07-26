import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface IData {
  email: string;
  username: string;
  password: string;
}

export const POST = async (request: NextRequest) => {
  const { email, password, username }: IData = await request.json();

  const alreadyExistUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (alreadyExistUser) {
    return NextResponse.json(
      { message: "email or passord are invalds" },
      { status: 400 }
    );
  }

  await prisma.user.create({
    data: {
      email,
      password,
      username,
    },
  });

  const signinURL = new URL("/signin", request.nextUrl);

  return NextResponse.redirect(signinURL);
};
