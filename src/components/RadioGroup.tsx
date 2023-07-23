"use client";
import * as Radiogroup from "@radix-ui/react-radio-group";
import { Controller, Control } from "react-hook-form";

interface ITransactionForm {
  description: string;
  value: number;
  revenue: "revenue" | "expense";
}

interface IProps {
  control: Control<ITransactionForm, any>;
}

export const RadioGroup = ({ control }: IProps) => {
  return (
    <Controller
      name="revenue"
      control={control}
      render={({ field }) => (
        <Radiogroup.Root
          className="flex flex-row items-center gap-4"
          radioGroup="1"
          defaultValue="revenue"
          onValueChange={field.onChange}
          ref={field.ref}
          name={field.name}
          value={field.value}
        >
          <div className="flex flex-row items-center gap-2">
            <Radiogroup.Item
              value="revenue"
              className="w-7 h-7 rounded-full bg-zinc-800"
              id="r1"
            >
              <Radiogroup.Indicator className=" flex items-center justify-center w-full h-full relative after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet-500" />
            </Radiogroup.Item>
            <label htmlFor="r1">Entrada</label>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Radiogroup.Item
              value="expense"
              className="w-7 h-7 rounded-full bg-zinc-800"
              id="r2"
            >
              <Radiogroup.Indicator className="flex items-center justify-center w-full h-full relative after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet-500" />
            </Radiogroup.Item>
            <label htmlFor="r2">Saída</label>
          </div>
        </Radiogroup.Root>
      )}
    />
  );
};
