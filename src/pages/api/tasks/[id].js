import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db("BrettEksamen");

    const task = await db.collection("tasks").findOne({
        _id: ObjectId(id)
    });
    res.json(task);

}