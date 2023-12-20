import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type {InferGetStaticPropsType } from 'next'

type task = {
  _id: string
  name: string
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/tasks", {
    method: "GET",
  })
  const testSvar: task[] = await res.json()
  return { props: { testSvar }}
}

export default function Home({ testSvar }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <h1 className='font-bold text-3xl'>Hei</h1>
  )
}
