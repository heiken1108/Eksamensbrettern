import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const { id } = req.query;

    const client = await clientPromise;
    const db = client.db("BrettEksamen");

    if (req.method === "GET") {
        const task = await db.collection("tasks").findOne({
            _id: ObjectId(id)
        });
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(400).send();
    }
}