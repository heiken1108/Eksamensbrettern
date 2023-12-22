import { useState } from "react";
import { ITask } from "../../data/types";

export async function PostTask(task: ITask) {
    
    const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

export default function AddTask() {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [ordinaryVersion, setOrdinaryVersion] = useState<string>("");
    const [textualVersion, setTextualVersion] = useState<string>("");
    const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
    const [variables, setVariables] = useState<string[]>([]);
    const [operators, setOperators] = useState<string[]>([]);
    const [example, setExample] = useState<string>("");
    const [exampleSolution, setExampleSolution] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitted: " + title);
        const task: ITask = {
            title: title,
            description: description,
            approved: false,
            ordinaryVersion: ordinaryVersion,
            textualVersion: textualVersion,
            solutionSteps: solutionSteps,
            variables: variables,
            operators: operators,
            example: example,
            exampleSolution: exampleSolution
        }
        await PostTask(task);
    }

    return (
        <div>
            <h1 className="text-8xl text-center">Add Task</h1>
            <div className="flex justify-center">
                <form className="border-2 w-8/12 justify-center flex flex-col p-5"
                onSubmit={handleSubmit}
                >
                    <label htmlFor="title">
                        Title:
                        <input className=" border-2" type="text" name="title" id="title" required onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label htmlFor="description">
                        Description:
                        <input className=" border-2" type="text" name="description" id="description" required onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label htmlFor="ordinaryVersion">
                        Ordinary Version:
                        <input className=" border-2" type="text" name="ordinaryVersion" id="ordinaryVersion" required onChange={(e) => setOrdinaryVersion(e.target.value)} />
                    </label>
                    <label htmlFor="textualVersion">
                        Textual Version:
                        <input className=" border-2" type="text" name="textualVersion" id="textualVersion" required onChange={(e) => setTextualVersion(e.target.value)} />
                    </label>
                    <label htmlFor="example">
                        Example:
                        <input className=" border-2" type="text" name="example" id="example" required onChange={(e) => setExample(e.target.value)} />
                    </label>
                    <label htmlFor="exampleSolution">
                        Example Solution:
                        <input className=" border-2" type="text" name="exampleSolution" id="exampleSolution" required onChange={(e) => setExampleSolution(e.target.value)} />
                    </label>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>
    )
}