"use client";

import { Transaction } from "@/components/Transaction";
import { useForm, SubmitHandler } from "react-hook-form";
import { Plus, Bank, ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { RadioGroup } from "@/components/RadioGroup";
import { useEffect, useState } from "react";
import { formatValue } from "@/utils/formatValue";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/axios";
import Card from "@/components/card";

const schema = z.object({
  description: z.string().nonempty(),
  value: z.string().nonempty(),
  revenue: z.enum(["revenue", "expense"]),
});

type ITransactionForm = z.infer<typeof schema>;

type ITransaction = ITransactionForm & {
  id: string;
};

interface IReceiveTransactions {
  transactions: ITransaction[];
  balance: number;
  expense: number;
  revenue: number;
}

export default function Home() {
  const { user, signout } = useAuth();

  const [transaction, setTransaction] = useState<IReceiveTransactions | null>(
    null
  );

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
    const dataTransaction = await api.get("/transaction/" + user?.id);
    setTransaction(dataTransaction.data);
  };

  useEffect(() => {
    if (user) {
      api.get("/transaction/" + user.id).then((response) => {
        setTransaction(response.data);
      });
    }
  }, [user]);

  const handleCreateTransaction: SubmitHandler<ITransactionForm> = async (
    data
  ) => {
    await api.post("/transaction/" + user!.id, {
      description: data.description,
      revenue: data.revenue,
      value: Number(data.value),
    });
    refreshTransactions();
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    await api.delete(`/transaction/${transactionId}`);
    refreshTransactions();
  };

  return (
    <>
      <div className="w-full max-w-4xl flex flex-row items-start gap-2 mb-2">
        <span className="py-1.5 px-3 bg-zinc-900 rounded ">
          {user?.username}
        </span>
        <button
          className="py-1.5 px-3 bg-red-900 rounded transition-all hover:bg-red-800"
          onClick={signout}
        >
          loggout
        </button>
      </div>
      <section className="w-full max-w-4xl  h-max bg-zinc-900 rounded-xl p-4 flex items-center flex-row gap-4">
        <aside className="h-max w-max flex flex-col items-center gap-4">
          <Card.Root>
            <div className="w-full flex flex-row justify-between items-center">
              <Card.Title title="Saldo" />
              <Card.Icon icon={Bank} className="text-3xl" />
            </div>
            <Card.Content
              content={
                transaction?.balance
                  ? formatValue(transaction.balance)
                  : "loading..."
              }
            />
          </Card.Root>
          <Card.Root>
            <div className="w-full flex flex-row justify-between items-center">
              <Card.Title title="Entrada" />
              <Card.Icon
                icon={ArrowCircleUp}
                className="text-3xl text-emerald-500"
              />
            </div>
            <Card.Content
              content={
                transaction?.revenue
                  ? formatValue(transaction.revenue)
                  : "loading..."
              }
            />
          </Card.Root>
          <Card.Root>
            <div className="w-full flex flex-row justify-between items-center">
              <Card.Title title="Saída" />
              <Card.Icon
                icon={ArrowCircleDown}
                className="text-3xl text-red-500"
              />
            </div>
            <Card.Content
              content={
                transaction?.expense
                  ? formatValue(transaction.expense)
                  : "loading..."
              }
            />
          </Card.Root>
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
            {transaction?.transactions?.map((transaction, index) => {
              const { description, id, revenue, value } = transaction;

              return (
                <Transaction
                  key={index}
                  description={description}
                  value={formatValue(Number(value))}
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
