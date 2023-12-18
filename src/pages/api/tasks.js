import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("BrettEksamen");

    switch(req.method) {
        case "GET":
            await getTasks();
            break;
        case "POST":
            await postTask();
            break;
        case "PUT":
            await putTask();
            break;
        case "DELETE":
            await deleteTask();
            break;
    }

    

    async function getTasks() {
        const tasks = await db.collection("tasks").find({}).toArray();
        res.json(tasks);
    }

    async function postTask() {
        const newTask = req.body;
        await db.collection("tasks").insertOne(newTask);
        res.status(201).send();
    }
}