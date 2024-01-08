import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
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

export async function getTaskByIdFaster(id: string) { //Synes vel uansett at opplegget med å fetche fra API er ganske dust. Men det får gå for nå
    const db = (await clientPromise).db("BrettEksamen");

    const task = await db.collection("tasks").findOne({
        _id: new ObjectId(id)
    });
    return task;
}

export async function getTasksByCategory(category: string) { //Funker itte du
    const db = (await clientPromise).db("BrettEksamen");
    const tasks = await db.collection("tasks").find({category: category}).toArray();
    return tasks;
}

export async function createTask(task: ITask) {
    const res = await fetch("/api/tasks", { //Hvorfor må den ha sånn fakka link?
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    const data = await res.json();
    return data;
}