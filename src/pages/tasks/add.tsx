import { useState } from "react";
import { ITask } from "../../data/types";
import { createTask } from "../../lib/api";
import { extractVariables } from "../../lib/taskSetup";

export async function PostTask(task: ITask) {
    await createTask(task);
}

export default function AddTask() {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [ordinaryVersion, setOrdinaryVersion] = useState<string>("");
    const [textualVersion, setTextualVersion] = useState<string>("");
    const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
    const [example, setExample] = useState<string>("");
    const [exampleSolution, setExampleSolution] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitted: " + title);
        const variables = extractVariables(ordinaryVersion);
        const operators = extractVariables(ordinaryVersion);
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
            exampleSolution: exampleSolution,
            category: category,
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
                        Ordinary Version (& for variables, $ for operators):
                        <input className=" border-2" type="text" name="ordinaryVersion" id="ordinaryVersion" required onChange={(e) => setOrdinaryVersion(e.target.value)} />
                    </label>
                    <label htmlFor="textualVersion">
                        Textual Version:
                        <input className=" border-2" type="text" name="textualVersion" id="textualVersion" required onChange={(e) => setTextualVersion(e.target.value)} />
                    </label>
                    <label>
                        Solution Steps:
                        <input className=" border-2" type="text" name="solutionSteps" id="solutionSteps" />
                        <button type="button" onClick={() => setSolutionSteps([...solutionSteps, (document.getElementById('solutionSteps') as HTMLInputElement)?.value])}>Add Step</button>
                        <div>
                            {solutionSteps.map((step, index) => {
                                return (
                                    <div key={index}>
                                        <span>{index}: {solutionSteps[index]} </span>
                                        <button type="button" onClick={() => {
                                            const newSteps = [...solutionSteps];
                                            newSteps.splice(index, 1);
                                            setSolutionSteps(newSteps);
                                        }}>Remove Step</button>
                                    </div>
                                )
                            })}
                        </div>
                    </label>
                    <label htmlFor="example">
                        Example:
                        <input className=" border-2" type="text" name="example" id="example" required onChange={(e) => setExample(e.target.value)} />
                    </label>
                    <label htmlFor="exampleSolution">
                        Example Solution:
                        <input className=" border-2" type="text" name="exampleSolution" id="exampleSolution" required onChange={(e) => setExampleSolution(e.target.value)} />
                    </label>
                    <label htmlFor="category">
                        Example Solution:
                        <input className=" border-2" type="text" name="category" id="category" required onChange={(e) => setCategory(e.target.value)} />
                    </label>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>
    )
}