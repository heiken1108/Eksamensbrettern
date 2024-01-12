import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db("BrettEksamen");

  const task = await db.collection("tasks").findOne({
    _id: new ObjectId(id as string),
  });
  res.json(task);
}
