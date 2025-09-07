import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const deleteUser = async (id:string
) => {
    const user = await prisma.user.delete({
        where:{id:id}
    });

    return user;
};

export default deleteUser;
