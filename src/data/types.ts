export interface ITask {
    _id?: string; //Will be generated when added, will be gotten when fetched
    title: string;
    description: string;
    approved: boolean;
    latexVersion?: string;
    ordinaryVersion: string;
    textualVersion: string;
    solutionSteps: string[];
    variables: string[];
    operators?: string[]; //Dårlig at den bae er ?, men blir sånn nå ass
    example: string;
    exampleSolution: string;
    category: string;
    decimals: number;
}

export type TaskVariant = {
    variant: string;
    solution: string;
}

export type Operator = {
    name: string;
    sign: string;
    calculate: (
        step: string,
        relevantVariables: string[],
        variables: Map<string, number>
    ) => number;
}