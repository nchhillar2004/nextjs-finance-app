import { TypographyH1 } from "@/components/typography";
import React from "react";
import SidebarLayout from "@/components/sidebar-layout";
import SiteConfig from "@/config/site";
import { getQuestionById } from "@/data/question";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnswerForm from "./AnswerForm";
import AnswerCard from "@/components/common/AnswerCard";
import { parseContent } from "@/helpers/parse-content";

export const metadata = {
    title: `Questions - ${SiteConfig.title}`,
};

interface QuestionIdPageProps {
    params: {
        questionId: string;
    };
}

export default async function QuestionId({ params }: QuestionIdPageProps) {
    const question = await getQuestionById(params.questionId);

    return (
        <SidebarLayout selectedOption={"questions"}>
            <div className="container">
                <div>
                    <TypographyH1 title={`Q - ${question?.title}`} />

                    <hr className="my-5" />
                    <div className="box py-2 px-4 rounded-md">
                        <pre
                            className="mb-4 lg:text-lg text-base text-wrap font-sans"
                            dangerouslySetInnerHTML={{
                                __html: parseContent(question?.body),
                            }}
                        />
                        <time className="text-sm dark:text-zinc-400 text-zinc-600 select-none">
                            Asked: {question?.time}
                        </time>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="answers min-h-[10vh]">
                    <div className="flex justify-between items-center">
                        <TypographyH1
                            title={
                                question?.answers.length == 1
                                    ? `${question?.answers.length} Answer`
                                    : `${question?.answers.length} Answers`
                            }
                        />
                        <Button size="lg" variant="blue" asChild>
                            <Link href={`#answer`}>Answer</Link>
                        </Button>
                    </div>
                    <div className="answers-content py-4">
                        {question?.answers.length && question?.answers ? (
                            <ul>
                                {question?.answers.map((ans, index) => (
                                    <li key={index} className="list-none">
                                        <AnswerCard
                                            authorUsername={ans.authorUsername}
                                            answer={ans.answer}
                                            likes={ans.likes}
                                            time={ans.time}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Be the first one to answer.</p>
                        )}
                        <div id="answer">
                            <AnswerForm id={params.questionId} />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
