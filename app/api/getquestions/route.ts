import { connectDB } from "@/helpers/server-helper";
import { NextResponse } from "next/server";
import prisma from "@/prisma";

export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        await connectDB();

        const question = await prisma.questions.findMany({ include: { author: true } });

        return new NextResponse(JSON.stringify(question), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (error: any) {
        console.error("Error:", error);
        return new NextResponse(`Internal Server Error: ${error.message}`, {
            status: 500,
        });
    }finally{
        await prisma.$disconnect();
    }
};
