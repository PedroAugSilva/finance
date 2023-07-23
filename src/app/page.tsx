"use client";
import { Card } from "@/components/Card";
import { Transaction } from "@/components/Transaction";
import { useForm, SubmitHandler } from "react-hook-form";
import { Plus, Bank, ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { RadioGroup } from "@/components/RadioGroup";
import { useEffect, useState } from "react";
import { formatValue } from "@/utils/formatValue";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

interface ITransactionForm {
  description: string;
  value: number;
  revenue: "revenue" | "expense";
}

interface ITransaction extends ITransactionForm {
  id: string;
}

interface IBalance {
  balance: number;
  expense: number;
  revenue: number;
}

export default function Home() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<IBalance>({
    balance: 0,
    expense: 0,
    revenue: 0,
  });

  const schema = z.object({
    description: z.string().nonempty("Há algum campo vazio"),
    value: z.string().nonempty("Há algum campo vazio"),
    revenue: z.string().nonempty("Há algum campo vazio"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITransactionForm>({
    defaultValues: {
      description: "",
      revenue: "revenue",
    },
    resolver: zodResolver(schema),
  });

  const refreshTransactions = async () => {
    const dataTransaction = await fetch("/api/transaction", {
      method: "GET",
    });
    const dataBalance = await fetch("/api/balance", {
      method: "GET",
    });
    setTransactions(await dataTransaction.json());
    setBalance(await dataBalance.json());
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  const handleCreateTransaction: SubmitHandler<ITransactionForm> = async (
    data
  ) => {
    await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify({
        description: data.description,
        revenue: data.revenue,
        value: Number(data.value),
      }),
    });
    refreshTransactions();
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    await fetch(`/api/transaction/${transactionId}`, {
      method: "DELETE",
    });
    refreshTransactions();
  };

  return (
    <>
      <section className="w-full max-w-4xl  h-max bg-zinc-900 rounded-xl p-4 flex items-center flex-row gap-4">
        <aside className="h-max w-max flex flex-col items-center gap-4">
          <Card
            title="Saldo"
            content={formatValue(balance!.balance)}
            TitleIcon={Bank}
          />
          <Card
            title="Entrada"
            content={formatValue(balance!.revenue)}
            TitleIcon={ArrowCircleUp}
          />
          <Card
            title="Saída"
            content={formatValue(balance!.expense)}
            TitleIcon={ArrowCircleDown}
          />
        </aside>
        <div className="flex flex-col items-start justify-start flex-1 h-full gap-4 ">
          <form
            className="w-full h-max flex items-center flex-row gap-4"
            onSubmit={handleSubmit(handleCreateTransaction)}
          >
            <input
              type="text"
              className={clsx(
                "bg-zinc-800 outline-none h-10 w-40 rounded-lg border-2  focus:border-violet-500 transition-all px-3 ",
                {
                  "border-red-500": errors.description,
                  "border-zinc-700": !errors.description,
                }
              )}
              placeholder="Descrição..."
              {...register("description")}
            />
            <input
              type="number"
              className={clsx(
                "bg-zinc-800 outline-none h-10 w-40 rounded-lg border-2  focus:border-violet-500 transition-all px-3",
                {
                  "border-red-500": errors.value,
                  "border-zinc-700": !errors.value,
                }
              )}
              placeholder="Valor..."
              {...register("value")}
            />

            <RadioGroup control={control} />

            <button className="flex-1 h-10 rounded-lg bg-violet-600 grid place-items-center transition-all hover:bg-violet-700 ">
              <Plus size={28} />
            </button>
          </form>
          <div className="w-full h-[360px] bg-zinc-800 rounded-xl p-3 gap-2 flex flex-col items-center">
            {transactions.map((transaction, index) => {
              const { description, revenue, value, id } = transaction;
              return (
                <Transaction
                  key={index}
                  description={description}
                  value={formatValue(value)}
                  revenue={revenue}
                  onDelete={() => handleDeleteTransaction(id)}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
