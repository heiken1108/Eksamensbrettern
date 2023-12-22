import type { InferGetServerSidePropsType } from 'next'
import { ITask } from '../data/types'
import TaskCard from '../components/TaskCard/TaskCard'

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URI + "/tasks", {
    method: "GET",
  })
  const tasks: ITask[] = await res.json()
  return { props: { tasks }}
}

export default function Home({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div id="topPicksDiv" className="flex justify-start flex-col">
      <h2 className="text-3xl p-5">Oppgaver</h2>
      <div className="grid grid-cols-3 gap-3 p-3">
        {
          tasks.map((task: ITask) => {
            return <TaskCard key={task._id} task={task} />
          })
        }
      </div>
    </div>
  )
}