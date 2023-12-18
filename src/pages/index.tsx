import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("Test"); //Selve Databasen
    const svar = await db.collection("Testdatabase").find().toArray();

    return {
      props: {testSvar: JSON.parse(JSON.stringify(svar))},
    };

  } catch (error) {
    
  }
}

export default function Home({ testSvar }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <h1>
      {testSvar[1].name}
    </h1>
  )
}
