import { useRouter } from "next/router";
import { NextPage } from "next";
import { MathJax } from "better-react-mathjax";

import { GET_ALL_TASKS, HELLO } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const Home: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ALL_TASKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  
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
        <p>{data.getTasks[0].title}</p>
      </div>
    </div>
    </>
  )
}

export default Home;
