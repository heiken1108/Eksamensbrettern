import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    hello: String!
    getTasks: [Task]
    getTaskByID(id: ID!): Task
    getTasksByCategory(category: String!): [Task]
    getTasksByFilters(category: String, approved: Boolean): [Task]
  }

  type Mutation {
    createTask(task: TaskInput): Task
  }

  type Task {
    _id: ID!
    title: String!
    description: String!
    approved: Boolean!
    ordinaryVersion: String!
    solutionSteps: [String!]!
    variables: [Variable!]!
    example: String!
    exampleSolution: String!
    category: String!
    decimals: Int!
    nextTask: ID
    prevTask: ID
  }

  type VariableDomain {
    min: Float
    max: Float
    stepSize: Float
    values: [Float]
    maxDecimals: Int
  }

  type Variable {
    name: String!
    type: VariableType!
    domain: VariableDomain!
  }

  enum VariableType {
    Integer
    Semicontinuous
    Continuous
    Specific
  }

  input TaskInput {
    title: String!
    description: String!
    approved: Boolean!
    ordinaryVersion: String!
    solutionSteps: [String!]!
    variables: [VariableInput!]!
    example: String!
    exampleSolution: String!
    category: String!
    decimals: Int!
    nextTask: ID
    prevTask: ID
  }

  input VariableInput {
    name: String!
    type: VariableType!
    domain: VariableDomainInput!
  }

  input VariableDomainInput {
    min: Float
    max: Float
    stepSize: Float
    values: [Float]
    maxDecimals: Int
  }
`;

export default typeDefs;
