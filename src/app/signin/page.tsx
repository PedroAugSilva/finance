"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "A senha deve conter 6 ou mais caractéres")
    .refine(
      (val) => /[0-9]/.test(val) && /[a-zA-Z]/.test(val),
      "A senha deve conter números e letras."
    ),
});

type TUserForm = z.infer<typeof schema>;

export default function SignupPage() {
  const { signin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserForm>({
    resolver: zodResolver(schema),
  });

  const handleCreateUser: SubmitHandler<TUserForm> = async (data) => {
    const { email, password } = data;
    try {
      await signin({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full w-full max-w-sm flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
          Entrar na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form
          className="space-y-6 w-full"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="block outline-none bg-zinc-900 w-full px-2 rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && (
              <span className="block text-sm font-medium leading-6 text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className="block w-full bg-zinc-900 outline-none px-2 rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password && (
              <span className="block text-sm font-medium leading-6 text-red-400">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              Entrar
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Ainda não pussui conta?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-violet-600 hover:text-violet-500"
            >
              Crie.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
