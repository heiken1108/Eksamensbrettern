import { gql } from 'graphql-tag';

export const HELLO = gql`
    query Hello{
        hello
    }
`;

export const GET_ALL_TASKS = gql`
query GetAllTasks {
    getTasks {
        _id
        title
        description
        approved
        ordinaryVersion
        solutionSteps
        variables {
            name
            type
            domain {
                min
                max
                stepSize
                values
                maxDecimals
            }
        }
        example
        exampleSolution
        category
        decimals
        nextTask
        prevTask
    }
}
`;

export const GET_TASK_BY_ID = gql`
query MyQuery($id: ID!) {
    getTaskByID(id: $id) {
        title
        description
        approved
        ordinaryVersion
        solutionSteps
        variables {
            name
            type
            domain {
                min
                max
                stepSize
                values
                maxDecimals
            }
        }
        example
        exampleSolution
        decimals
        nextTask
        prevTask
    }
}
`;

export const CREATE_TASK = gql`
mutation CreateTask($input: TaskInput!) {
    createTask(task: $input) {
        _id
            title
            description
            approved
            ordinaryVersion
            solutionSteps
            variables {
                name
                type
                domain {
                    min
                    max
                    stepSize
                    values
                    maxDecimals
                }
            }
            example
            exampleSolution
            category
            decimals
            nextTask
            prevTask
    }
}
`;