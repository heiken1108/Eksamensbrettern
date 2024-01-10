import type { NextPage } from 'next'
import { useMemo, useState } from "react";
import { createTaskVariant } from "../../lib/taskHandling";
import { MathJax } from "better-react-mathjax";
import { GET_TASK_BY_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const Task: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const {data, loading, error} = useQuery(GET_TASK_BY_ID, {
        variables: { id: id}
    });
    

    const variant = useMemo(() => {
        return data ? createTaskVariant(data.getTaskByID) : { variant: "", solution: "" };
    }, [data]);


    const [userAnswer, setUserAnswer] = useState<string>("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

    const handleCheckAnswer = () => {
        const isCorrect = userAnswer.trim().toLowerCase() === variant.solution.trim().toLowerCase();
        setIsAnswerCorrect(isCorrect);
    };

    
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex-grow flex items-center justify-center">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && (
                <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                    <h1 className="text-2xl font-bold mb-4">{data.getTaskByID.title}</h1>
                    <MathJax>
                        <p className="text-gray-600 mb-4">{variant.variant}</p>
                    </MathJax>
                    <p className="text-gray-700 mb-4">Category: {data.getTaskByID.category}</p>
                    <p className="text-gray-700 mb-4">Bruk maksimalt {data.getTaskByID.decimals} desimaler i svaret</p>

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
                )}
            </div>
        </div>
    );
}

export default Task;

/*export async function getServerSideProps(context: any) {
    const { id } = context.query;

    const task = await getTaskById(id);
    const variant = createTaskVariant(task);

    console.log(variant);
    return {
        props: {
            task,
            variant
        }
    }
}*/