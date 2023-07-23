import { DeepMap, FieldError } from "react-hook-form";

declare type FieldErrors<
  TFieldValues extends {
    description: string;
    value: number;
    revenue: string;
  } = { description: string; value: number; revenue: string }
> = DeepMap<TFieldValues, FieldError>;
