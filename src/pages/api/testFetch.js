import clientPromise from '../../../lib/mongodb'

export default async(req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Test"); //Selve Databasen

        const svar = await db.collection("Testdatabase").find().toArray();

        res.json(svar);
    } catch (error) {
        console.log("Gikk ikke");
    }
}