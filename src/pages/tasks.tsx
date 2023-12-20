import type { InferGetServerSidePropsType } from 'next'

type task = {
  _id: string
  name: string
}

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URI + "/tasks", {
    method: "GET",
  })
  const tasks: task[] = await res.json()
  return { props: { tasks }}
}

export default function Home({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <h1>
      {tasks.map((task) => (
        <li key={task._id}>{task.name}</li>
      ))}
    </h1>
  )
}