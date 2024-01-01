import { useRouter } from "next/router";
import Navbar from "../components/Navbar/Navbar";
import TaskCard from "../components/TaskCard/TaskCard";
import { ITask } from "../data/types";
import { NextPage } from "next";

const exampleTask: ITask = {
  _id: "6584c66e45b4fce0a881ca64",
  title: "Eksempel",
  description: "Eksempel erre",
  approved: false,
  ordinaryVersion: "&a&$+$$b$",
  textualVersion: "a+b",
  solutionSteps: ["&a&$+$&b&"],
  variables: ["a", "b"],
  operators: ["+"],
  example: "1+2",
  exampleSolution: "3",
  category: "Grunnleggende"
}

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
    <div id="HeaderDiv" className="flex justify-start bg-slate-50 font-SegoeUI border-b-2 border-black bg-[url('../assets/cube_pattern.jpg')]">
      <div className="flex-col m-12">
        <h1 className='font-bold text-7xl py-5'><span className="text-blue-800">Brett</span> Eksamen</h1>
        <h2 className="text-lg py-5">Øv deg på eksamensoppgaver</h2>
        <button onClick={() => {router.push("/tasks")}}
        className="rounded-2xl text-lg text-left py-2 px-16 border-black bg-black text-white">Start!</button>
      </div>
    </div>
    <div id="topPicksDiv" className="flex justify-start flex-col">
      <h2 className="text-3xl p-5">Top picks</h2>
      <div className="grid grid-cols-3 gap-3 p-3">
        <TaskCard task={exampleTask} />
        <TaskCard task={exampleTask} />
        <TaskCard task={exampleTask}/>
      </div>
    </div>
    </>
  )
}

export default Home;
