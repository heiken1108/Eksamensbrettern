import type { InferGetServerSidePropsType } from 'next'
import { ITask } from '../data/types'
import TaskCard from '../components/TaskCard/TaskCard'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  
  const res = await fetch(process.env.API_URI + "/tasks", {
    method: "GET",
  })
  const tasks: ITask[] = await res.json()
  return { props: { tasks }}
}

export default function Home({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  
  return (
    <div id="topPicksDiv" className="flex justify-start flex-col">
      <div className='flex flex-row justify-between p-2 border-b-2'>
        <h2 className="text-2xl p-5">Oppgaver</h2>
        <button className="rounded-2xl text-lg text-left py-2 px-16 border-black bg-black text-white" onClick={() => {router.push("/tasks/add")}}>Add task</button>
      </div>
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