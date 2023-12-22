import { useRouter } from "next/router";
import { ITask } from "../../data/types";

export default function TaskCard({task}: {task: ITask}) {
    const router = useRouter();

    const handleCardClick = () => {
        const taskId = task._id;
        router.push(`/tasks/${taskId}`);
    }

    return (
        <div className="flex justify-start flex-col border-black border p-2 cursor-pointer" onClick={handleCardClick}>
            <h1 className="font-bold">{task.title}</h1>
            <h2>{task.textualVersion}</h2>
        </div>
    )
}