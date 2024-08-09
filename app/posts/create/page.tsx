"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { time } from "@/utils/GetTime";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/typography";
import SidebarLayout from "@/components/sidebar-layout";
const CreatePost = () => {
    const router = useRouter();
    const { data: session }: any = useSession();

    useEffect(() => {
        if (!session) {
            router.replace("/auth/login");
        }
    }, [session, router]);

    const handlePost = async (e: any) => {
        e.preventDefault();
        const title = e.target[0].value;
        const body = e.target[1].value;
        const tags = e.target[2].value;

        if (!title || !body) {
            toast.error("Fill all fields");
        }
        try {
            const authorId = session.user?.id;
            const authorUsername = session.user?.username;

            const res = await fetch("/api/createpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    body,
                    authorUsername,
                    authorId,
                    tags,
                    time,
                }),
            });
            if (res.status === 200) {
                toast.success("Posted successfully");
                router.push("/posts");
            }
        } catch (error) {
            console.log("Error in posting");
        }
    };
    return (
        <>
            <SidebarLayout selectedOption={"posts"}>
                <div className="container py-4">
                    <TypographyH1 title={"Write a public post"} />
                    <div className="mt-5 rounded-sm dark:bg-blue-950 bg-blue-400 px-8 py-4">
                        <h2 className="text-2xl">Writing a good post</h2>
                        <p className="my-2">
                            This form might help you write a good post
                        </p>

                        <small>
                            <b>Steps</b>
                            <ul className="list-disc list-inside">
                                <li>Your title should summarize the post</li>
                                <li>
                                    Write whats on your mind, share your
                                    feelings, thoughts, knowledge.
                                </li>
                                <li>
                                    Include tags to describe what your post is
                                    about.
                                </li>
                                <li>
                                    Write text inside Asterisk(*) to make it
                                    bold.
                                </li>
                                <li>
                                    Do NOT post abusive words, hate speech, racism or any propaganda.
                                </li>
                            </ul>
                        </small>
                    </div>
                    <div className="w-full mt-4">
                        <form onSubmit={handlePost} className="inputfld">
                        <div className="bg-[var(--info-bg)] px-4 py-2 rounded-sm mb-2">
                            <label htmlFor="title">Post title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="mt-2"
                                placeholder="Post title"
                            /></div>
                            <div className="bg-[var(--info-bg)] px-4 py-2 rounded-sm mb-2">
                            <label htmlFor="content">Post Content</label>
                            <textarea
                                className="min-h-[150px] mt-2"
                                id="content"
                                name="content"
                                placeholder="Content..."
                            /></div>
                            <div className="bg-[var(--info-bg)] px-4 py-2 rounded-sm mb-2">
                            <label htmlFor="tag">Add custom tag</label>
                            <input
                                type="text"
                                placeholder="#bhfs"
                                id="tag"
                                name="tag"
                                className="lg:mr-4 mt-2"
                            /></div>
                            <Button type="submit" variant="blue">
                                Post
                            </Button>
                        </form>
                    </div>
                </div>
            </SidebarLayout>
        </>
    );
};

export default CreatePost;
