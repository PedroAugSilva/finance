import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    id: string;
  };
}

interface IData {
  description: string;
  value: number;
  revenue: string;
}

export const DELETE = async (request: NextRequest, { params }: IParams) => {
  const id = params.id;

  await prisma.transaction.delete({
    where: {
      id,
    },
  });
  const url = new URL("/", request.nextUrl);

  return NextResponse.redirect(url);
};

export const POST = async (request: NextRequest, { params }: IParams) => {
  const data: IData = await request.json();

  const id = params.id;
  await prisma.transaction.create({
    data: {
      ...data,
      user_id: id,
    },
  });
  const url = new URL("/", request.nextUrl);

  return NextResponse.redirect(url);
};

export const GET = async (request: Request, { params }: IParams) => {
  const id = params.id;
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: id,
    },
  });

  const revenues = await prisma.transaction.findMany({
    where: {
      revenue: "revenue",
      user_id: id,
    },
  });
  const expenses = await prisma.transaction.findMany({
    where: {
      revenue: "expense",
      user_id: id,
    },
  });

  let revenueTotal: number = 0;

  let expenseTotal: number = 0;

  revenues.forEach((revenue) => {
    revenueTotal += revenue.value;
  });
  expenses.forEach((expense) => {
    expenseTotal += expense.value;
  });

  const balance = revenueTotal - expenseTotal;

  return NextResponse.json({
    transactions,
    balance,
    expense: expenseTotal,
    revenue: revenueTotal,
  });
};
