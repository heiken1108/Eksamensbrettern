import { useRouter } from "next/router";
import { ITask } from "../../data/types";
import categories from "../../data/categories";
import { MathJax } from "better-react-mathjax";
import { addMathJax, createTaskVariant } from "../../lib/taskHandling";

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

    const variant = createTaskVariant(task);
    

    return (
        <MathJax>
            <div className="flex justify-start flex-col border-black border p-2 cursor-pointer" onClick={handleCardClick} style={cardStyle}>
                <h1 className="font-bold">{task.title}</h1>
                <h2 suppressHydrationWarning>{variant.variant}</h2> {/*Er vel rimelig ræv kvalitet med suppress*/}
            </div>
        </MathJax>
    )
}