import { connectDB } from "@/helpers/server-helper";
import prisma from "@/prisma";

export const getPostsById = async (id: string | undefined) => {
    try {
        await connectDB();
        const post = await prisma.posts.findUnique({
            where: { id: id },
            include: {comments: true, author: true }
        });

        return post;
    } catch {
        await prisma.$disconnect();
        return null;
    }
};