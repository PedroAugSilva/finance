import { prisma } from "@/lib/prisma";
interface IParams {
  params: {
    id: string;
  };
}

export const DELETE = async (request: Request, { params }: IParams) => {
  const id = params.id;

  await prisma.transaction.delete({
    where: {
      id,
    },
  });
};
