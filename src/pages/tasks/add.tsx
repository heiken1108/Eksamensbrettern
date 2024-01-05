import { useState } from "react";
import { ITask, Variable, VariableTypes } from "../../data/types";
import categories from "../../data/categories";
import { useRouter } from "next/router";

export default function AddTask() {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [ordinaryVersion, setOrdinaryVersion] = useState<string>("");
    const [textualVersion, setTextualVersion] = useState<string>("");
    const [variables, setVariables] = useState<Variable[]>([]);
    const [newVariable, setNewVariable] = useState<string>("");
    const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
    const [newStep, setNewStep] = useState<string>("");
    const [example, setExample] = useState<string>("");
    const [exampleSolution, setExampleSolution] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [decimals, setDecimals] = useState<number>(0);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert("Submitted: " + title);
        const task: ITask = {
            title: title,
            description: description,
            approved: false,
            ordinaryVersion: ordinaryVersion,
            textualVersion: textualVersion,
            solutionSteps: solutionSteps,
            variables: variables,
            example: example,
            exampleSolution: exampleSolution,
            category: category,
            decimals: decimals,
        }
        //await createTask(task);
        const res = await fetch("/api/tasks", { //Denne må være her av en eller annen grunn, sier den ikke finner dns-module...
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        router.push(".")
    }

    const handleAddStep = () => {
        if (newStep.trim() !== '') {
            setSolutionSteps([...solutionSteps, newStep]);
            setNewStep(''); 
        }
    };

    const handleAddVariable = () => {
        if (newVariable.trim() !== '') {
            const newVariableObject: Variable = {
                name: newVariable,
                type: "Integer",
                domain: {}
            }
            setVariables([...variables, newVariableObject]);
            setNewVariable(''); 
        }
    }

    const handleChangeVariableType = (value: string, index: number) => {
        const newVariables = [...variables];
        newVariables[index].type = value as "Integer" | "Semicontinuous" | "Continuous" | "Specific";
        setVariables(newVariables);
    }

    //Kan det gjøres på en bedre måte enn å ha mange forskjelige funksjoner som gjør nesten samme greia? Svaret er nok ja
    const handleChangeMin = (value: string, index: number) => {
        const newVariables = [...variables];
        newVariables[index].domain.min = Number(value);
        setVariables(newVariables);
    }

    const handleChangeMax = (value: string, index: number) => {
        const newVariables = [...variables];
        newVariables[index].domain.max = Number(value);
        setVariables(newVariables);
    }

    const handleChangeStepsize = (value: string, index: number) => {
        const newVariables = [...variables];
        newVariables[index].domain.stepSize = Number(value);
        setVariables(newVariables);
    }

    const handleChangeMaxDecimals = (value: string, index: number) => {
        const newVariables = [...variables];
        newVariables[index].domain.maxDecimals = Number(value);
        setVariables(newVariables);
    }

    const handleChangeValues = (values: string, index: number) => {
        const newVariables = [...variables];
        newVariables[index].domain.values = values.split(",").map(value => Number(value));
        setVariables(newVariables);
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-max p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl mb-8 text-center">Add Task</h1>
                <form onSubmit={handleSubmit}>
                <label className="mb-4" htmlFor="title">
                    Title:
                <input
                    className="border p-2 w-full"
                    type="text"
                    name="title"
                    id="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                </label>
                <label className="mb-4" htmlFor="description">
                Description:
                <input
                    className="border p-2 w-full"
                    type="text"
                    name="description"
                    id="description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
                </label>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">
                    Category:
                </label>
            <select
                className="border p-2 w-full rounded-md"
                name="category"
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
                <option key={category.name} value={category.name}>
                    {category.name}
                </option>
            ))}
            </select>
            </div>
            <label className="mb-4" htmlFor="ordinaryVersion">
                Ordinary version (& for equation, $ for LaTeX):
                <input
                    className="border p-2 w-full"
                    type="text"
                    name="ordinaryVersion"
                    id="ordinaryVersion"
                    required
                    onChange={(e) => setOrdinaryVersion(e.target.value)}
                />
            </label>
            <label className="mb-4" htmlFor="textualVersion">
                Textual version:
                <input
                    className="border p-2 w-full"
                    type="text"
                    name="textualVersion"
                    id="textualVersion"
                    required
                    onChange={(e) => setTextualVersion(e.target.value)}
                />
            </label>
            <label className="mb-4" htmlFor="variables">
                Variables:
                <div className="flex items-center space-x-2">
                    <input
                        className="border p-2 flex-grow"
                        type="text"
                        name="variables"
                        id="variables"
                        value={newVariable}
                        onChange={(e) => setNewVariable(e.target.value)}
                    />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="button"
                    onClick={handleAddVariable}
                >
                    Add variable
                </button>
                </div>
                <div>
                    {variables.map((step, index) => (
                    <div key={index} className="flex items-center justify-between mt-2">
                        <span>{variables[index].name}:</span>
                        <div className="flex-1 items-center space-x-2 w-full">
                        <select
                            className="flex-1 border p-2 rounded-md mr-2"
                            name="variableType"
                            id="variableType"
                            required
                            onChange={(e) => handleChangeVariableType(e.target.value, index)}
                        >
                            {VariableTypes.map((variableType) => (
                                <option key={variableType} value={variableType}>
                                    {variableType}
                                </option>
                            ))}
                        </select>
                        {variables[index].type === "Integer" && (
                            <>  
                                Min:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Minimum value" onChange={(e) => handleChangeMin(e.target.value, index)}/>
                                Max:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Maximum value" onChange={(e) => handleChangeMax(e.target.value, index)}/>
                            </>
                        )}

                        {variables[index].type === "Semicontinuous" && (
                            <>
                                Min:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Minimum value" onChange={(e) => handleChangeMin(e.target.value, index)}/>
                                Max:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Maximum value" onChange={(e) => handleChangeMax(e.target.value, index)}/>
                                Stepsize:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Stepsize" onChange={(e) => handleChangeStepsize(e.target.value, index)}/>
                            </>
                        )}

                        {variables[index].type === "Continuous" && (
                            <>
                                Min:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Minimum value" onChange={(e) => handleChangeMin(e.target.value, index)}/>
                                Max:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Maximum value" onChange={(e) => handleChangeMax(e.target.value, index)}/>
                                Max decimals:
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="Maximum decimals" onChange={(e) => handleChangeMaxDecimals(e.target.value, index)}/>
                            </>
                        )}

                        {variables[index].type === "Specific" && (
                            <>
                                Values (comma-separated):
                                <input required className="flex-1 border p-2 rounded-md" type="text" placeholder="E.g 1,2,3" onChange={(e) => handleChangeValues(e.target.value, index)}/>
                            </>
                        )}

                        </div>
                        <button
                            className="text-red-500 ml-2"
                            type="button"
                            onClick={() => {
                            const newVariables = [...variables];
                            newVariables.splice(index, 1);
                            setVariables(newVariables);
                            }}
                        >
                            Remove variable
                        </button>
                    </div>
                    ))}
                </div>
            </label>
            <label className="mb-4" htmlFor="solutionSteps">
                Solution Steps:
                <div className="flex items-center space-x-2">
                    <input
                        className="border p-2 flex-grow"
                        type="text"
                        name="solutionSteps"
                        id="solutionSteps"
                        value={newStep}
                        onChange={(e) => setNewStep(e.target.value)}
                    />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="button"
                    onClick={handleAddStep}
                >
                    Add Step
                </button>
                </div>
                <div>
                    {solutionSteps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between mt-2">
                        <span>{index}: {solutionSteps[index]}</span>
                        <button
                            className="text-red-500"
                            type="button"
                            onClick={() => {
                            const newSteps = [...solutionSteps];
                            newSteps.splice(index, 1);
                            setSolutionSteps(newSteps);
                            }}
                        >
                            Remove Step
                        </button>
                    </div>
                    ))}
                </div>
            </label>
            <label className="mb-4" htmlFor="example">
                Example:
                <input
                    className="border p-2 w-full"
                    type="text"
                    name="example"
                    id="example"
                    required
                    onChange={(e) => setExample(e.target.value)}
                />
            </label>
            <label className="mb-4" htmlFor="exampleSolution">
                Example solution:
                <input
                    className="border p-2 w-full"
                    type="text"
                    name="exampleSolution"
                    id="exampleSolution"
                    required
                    onChange={(e) => setExampleSolution(e.target.value)}
                />
            </label>
            <label className="mb-4" htmlFor="decimals">
                Decimals:
                <input
                    className="border p-2 w-full"
                    type="number"
                    name="decimals"
                    id="decimals"
                    max={20}
                    min={0}
                    value={decimals}
                    required
                    onChange={(e) => setDecimals(Number(e.target.value))}
                />
            </label>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mb-4" type="submit">
                Add Task
            </button>
            </form>
        </div>
    </div>
    );
}