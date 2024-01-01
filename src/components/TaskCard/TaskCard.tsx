import { useRouter } from "next/router";
import { ITask } from "../../data/types";
import categories from "../../data/categories";

export default function TaskCard({task}: {task: ITask}) {
    const router = useRouter();

    const handleCardClick = () => {
        const taskId = task._id;
        router.push(`/tasks/${taskId}`);
    }

    const getCategoryBackgroundColor = (categoryName: string) => {
        const category = categories.find(cat => cat.name === categoryName);
        return category ? category.backgroundColor : "#FFFFFF"; // Default to white if category not found
    }

    const cardStyle = {
        backgroundColor: getCategoryBackgroundColor(task.category),
    };

    return (
        <div className="flex justify-start flex-col border-black border p-2 cursor-pointer" onClick={handleCardClick} style={cardStyle}>
            <h1 className="font-bold">{task.title}</h1>
            <h2>{task.textualVersion}</h2>
        </div>
    )
}