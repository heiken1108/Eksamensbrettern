import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await clientPromise;
  const db = client.db("BrettEksamen");
  const params = req.query;

  switch (req.method) {
    case "GET":
      await getTasks();
      break;
    case "POST":
      await postTask();
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
  }

  async function getTasks() {
    const filters: {
      category?: string;
      approved?: boolean;
    } = {};
    if (params.category) {
      const category = params.category.toString();
      filters.category = category;
    }
    if (params.approved) {
      const approved = params.approved.toString();
      filters.approved = approved === "true";
    }
    const tasks = await db.collection("tasks").find(filters).toArray();
    res.json(tasks);
  }

  async function postTask() {
    const newTask = req.body;
    await db.collection("tasks").insertOne(newTask);
    res.json(newTask);
  }
}
