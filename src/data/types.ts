export interface ITask {
    _id: string;
    title: string;
    description: string;
    approved: boolean;
    latexVersion?: string;
    ordinaryVersion: string;
    textualVersion: string;
    solutionSteps: string[];
    variables: string[];
    operators: string[];
    example: string;
    exampleSolution: string;
}