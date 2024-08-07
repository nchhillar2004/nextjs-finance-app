import { connectDB } from "@/helpers/server-helper";
import prisma from "@/prisma";

export const getQuestionById = async (id: string | undefined) => {
    try {
        await connectDB();
        const question = await prisma.questions.findUnique({
            where: { id: id },
            include: { answers: true },
        });

        return question;
    } catch {
        await prisma.$disconnect();
        return null;
    }
};
