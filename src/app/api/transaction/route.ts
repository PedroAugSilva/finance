import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface IData {
  description: string;
  value: number;
  revenue: string;
}

export const POST = async (request: Request) => {
  const data: IData = await request.json();
  await prisma.transaction.create({
    data: {
      ...data,
    },
  });
};

export const GET = async () => {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json(transactions);
};
