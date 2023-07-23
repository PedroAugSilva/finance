import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const revenues = await prisma.transaction.findMany({
    where: {
      revenue: "revenue",
    },
  });
  const expenses = await prisma.transaction.findMany({
    where: {
      revenue: "expense",
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
    balance: balance,
    expense: expenseTotal,
    revenue: revenueTotal,
  });
};
