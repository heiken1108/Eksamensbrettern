import { ITask } from "../data/types";

export async function getAllTasks() {
    const res = await fetch(process.env.API_URI + "/tasks", {
        method: "GET",
    })
    const data = await res.json();
    return data;
}

export async function getTaskById(id: string) {
    const res = await fetch(process.env.API_URI + "/tasks/" + id, {
        method: "GET",
    })
    const data = await res.json();
    return data;
}

export async function createTask(task: ITask) {
    const res = await fetch("/api/tasks", { //Hvorfor må den ha sånn fakka link?
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}