const resolvers = {
  Query: {
    hello: () => "Hello world!" + process.env.API_URI,
    getTasks: async () => {
      const response = await fetch(`${process.env.API_URI}/tasks`);
      const data = await response.json();
      return data.map((task) => {
        return {
          _id: task._id,
          title: task.title,
          description: task.description,
          approved: task.approved,
          ordinaryVersion: task.ordinaryVersion,
          solutionSteps: task.solutionSteps,
          variables: task.variables,
          example: task.example,
          exampleSolution: task.exampleSolution,
          category: task.category,
          decimals: task.decimals,
          nextTask: task.nextTask,
          prevTask: task.prevTask,
        };
      });
    },
    getTaskByID: async (_, { id }) => {
      const response = await fetch(`${process.env.API_URI}/tasks/${id}`);
      const data = await response.json();
      return {
        _id: data._id,
        title: data.title,
        description: data.description,
        approved: data.approved,
        ordinaryVersion: data.ordinaryVersion,
        solutionSteps: data.solutionSteps,
        variables: data.variables,
        example: data.example,
        exampleSolution: data.exampleSolution,
        category: data.category,
        decimals: data.decimals,
        nextTask: data.nextTask,
        prevTask: data.prevTask,
      };
    },
    getTasksByCategory: async (_, { category }) => {
      const response = await fetch(
        `${process.env.API_URI}/tasks?category=${category}`,
      );
      const data = await response.json();
      return data.map((task) => {
        return {
          _id: task._id,
          title: task.title,
          description: task.description,
          approved: task.approved,
          ordinaryVersion: task.ordinaryVersion,
          solutionSteps: task.solutionSteps,
          variables: task.variables,
          example: task.example,
          exampleSolution: task.exampleSolution,
          category: task.category,
          decimals: task.decimals,
          nextTask: task.nextTask,
          prevTask: task.prevTask,
        };
      });
    },
    getTasksByFilters: async (_, { category, approved }) => {
      let query = "";
      if (category) {
        query += `category=${category}&`;
      }
      if (approved !== undefined) {
        query += `approved=${approved}&`;
      }
      const response = await fetch(`${process.env.API_URI}/tasks?${query}`);
      const data = await response.json();
      return data.map((task) => {
        return {
          _id: task._id,
          title: task.title,
          description: task.description,
          approved: task.approved,
          ordinaryVersion: task.ordinaryVersion,
          solutionSteps: task.solutionSteps,
          variables: task.variables,
          example: task.example,
          exampleSolution: task.exampleSolution,
          category: task.category,
          decimals: task.decimals,
          nextTask: task.nextTask,
          prevTask: task.prevTask,
        };
      });
    },
  },
  Mutation: {
    createTask: async (_, { task }) => {
      const response = await fetch(`${process.env.API_URI}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return {
        _id: data._id,
        title: data.title,
        description: data.description,
        approved: data.approved,
        ordinaryVersion: data.ordinaryVersion,
        solutionSteps: data.solutionSteps,
        variables: data.variables,
        example: data.example,
        exampleSolution: data.exampleSolution,
        category: data.category,
        decimals: data.decimals,
        nextTask: data.nextTask,
        prevTask: data.prevTask,
      };
    },
  },
};

export default resolvers;
