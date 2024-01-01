import { getTaskById } from "../../lib/api";
import type { InferGetServerSidePropsType } from 'next'
import { createVariant } from "../../lib/taskSetup";
import { useState } from "react";


export default function Task({ task, variant }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

    const handleCheckAnswer = () => {
        const isCorrect = userAnswer.trim().toLowerCase() === variant[1].trim().toLowerCase();
        setIsAnswerCorrect(isCorrect);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
                    <p className="text-gray-600 mb-4">{variant[0]}</p>
                    <p className="text-gray-700 mb-4">Category: {task.category}</p>
                    <p className="text-gray-700 mb-4">Maks antall desimaler: {task.decimals}</p>

                    <label className="block mb-4">
                        Your Answer:
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleCheckAnswer()}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>

                    <button
                        onClick={handleCheckAnswer}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Check Answer
                    </button>

                    {isAnswerCorrect !== null && (
                        <p className={`mt-4 ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            Your answer is {isAnswerCorrect ? "correct" : "incorrect"}!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { id } = context.query;

    const task = await getTaskById(id);
    const variant = createVariant(task);
    return {
        props: {
            task,
            variant
        }
    }
}