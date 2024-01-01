import operators from "../data/operators";
import { ITask } from "../data/types";

export function extractVariables(input: string): string[] {
    const regex = /\&([a-zA-Z0-9_][a-zA-Z0-9_]*)\&/g;
    const matches = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        console.log(match);
        matches.push(match[1]);
    }

    return matches;
}

export function extractOperators(input: string): string[] {
    const regex = /\$\s*([^\$\s]+)\s*\$/g;
    const matches = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

export function createVariant(inputTask: ITask): string[] {
    let variablesMap = new Map<string, number>();
    inputTask.variables.forEach(variable => {
        //Tar foreløpig bare heltall mellom 1 og 10. Her bør man ha funksjonalitet for range og verdi-type
        const value = Math.floor(Math.random() * 10) + 1;
        variablesMap.set(variable, value);
    });
    const variant = replaceVariables(inputTask.ordinaryVersion, variablesMap);
    const solution = calculateSolution(inputTask, variablesMap);
    return [variant, solution];
}

function replaceVariables(input: string, variableMap: Map<string, any>): string {
    return input.replace(/\$/g, "").replace(/&([^&]+)&/g, (match, p1) => {
        const key = p1.trim();
        return variableMap.has(key) ? variableMap.get(key).toString() : match;
    });
}

function calculateSolution(inputTask: ITask, variableMap: Map<string, any>): string {
    let calculatedSteps: number[] = [];
    inputTask.solutionSteps.forEach((step, index) => {
        console.log(step); 
        const variables = extractVariables(step);
        console.log(variables);
        const values = variables.map(variable => variableMap.get(variable));
        const operator = operators.find((operator) => operator.sign === extractOperators(step)[0]);
        if (operator) {
            const solution = operator.calculate(values);
            calculatedSteps.push(solution);
            variableMap.set(index.toString(), solution);
        }
        console.log(variableMap);

    });
    return calculatedSteps[calculatedSteps.length - 1].toString();
}