import { prisma } from "../../../prisma/prisma";
import getUser from "./getUser";

function getToday(): string {
    const days = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
    const todayIndex = new Date().getDay();
    return days[todayIndex];
}

const getDayExercise = async (id?: string, phone?: string) => {
    const day = getToday();
    if (id) {
        try {
            const users = await prisma.userExercise.findMany({
                where: {
                    userId: id,
                    day: {
                        has: day,
                    },
                },
                include:{exercise:true}
            });
            return users;
        } catch (error) {
            return({error})
        }
    }else{
        console.log("no else do id")
        const user = await getUser(phone?phone:"")
        console.log(user?.id)
        try {
            const exercises = await prisma.userExercise.findMany({
                where: {
                    userId:user?.id,
                    day: {
                        has: day,
                    },
                },
                include:{exercise:true}

            }
            );
            return exercises;
        } catch (error) {
            return({error})
        }
    }

};

export default getDayExercise;
