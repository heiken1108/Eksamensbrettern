export interface ITask {
    _id?: string; //Will be generated when added, will be gotten when fetched
    title: string;
    description: string;
    approved: boolean;
    latexVersion?: string;
    ordinaryVersion: string;
    solutionSteps: string[];
    variables: Variable[];
    operators?: string[]; //Dårlig at den bare er ?, men blir sånn nå ass
    example: string;
    exampleSolution: string;
    category: string;
    decimals: number;
    nextTask?: string; //For når man har å gjøre med deloppgaver. Bør være en OID eller en ITask. Som et child eller et parent
    prevTask?: string;
}

export interface VariableDomain {
    min?: number;
    max?: number;
    stepSize?: number;
    values?: number[];
    maxDecimals?: number;
}

export const VariableTypes = [
    "Integer", "Semicontinuous", "Continuous", "Specific"
]

export interface Variable {
    name: string;
    type: "Integer" | "Semicontinuous" | "Continuous" | "Specific";
    domain: VariableDomain;
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