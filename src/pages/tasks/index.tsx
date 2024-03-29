import type { NextPage } from "next";
import { ITask } from "../../data/types";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useRouter } from "next/router";
import categories from "../../data/categories";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS_BY_FILTER } from "../../graphql/queries";

const Tasks: NextPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    data: dataTasks,
    loading: dataLoading,
    error: dataError,
  } = useQuery(GET_TASKS_BY_FILTER, {
    variables: { category: selectedCategory },
  });

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(categoryName);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-2 border-b-2">
        <h2 className="text-2xl p-5">Oppgaver</h2>
        <button
          className="rounded-2xl text-lg text-left py-2 px-4 border-black bg-black text-white hover:bg-gray-800"
          onClick={() => router.push("/tasks/add")}
        >
          Add Task
        </button>
      </div>
      <div className="flex items-center space-x-2 p-5">
        <h2 className="text-xl">Fag:</h2>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${
                selectedCategory === category.name
                  ? "bg-blue-800 text-white"
                  : "bg-white"
              } 
            flex items-center space-x-1 border-black border p-2 rounded-full cursor-pointer select-none`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="text-sm">{category.name}</span>
              <svg width="24" height="24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  className={`stroke-current stroke-2 fill-${category.backgroundColor}`}
                  fill={category.backgroundColor}
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        {dataLoading && <p>Laster...</p>}
        {dataError && <p>Error</p>}
        {dataTasks &&
          dataTasks.getTasksByFilters.map((task: ITask) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default Tasks;
