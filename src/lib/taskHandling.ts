import { parse } from "mathjs";
import operators from "../data/operators";
import { ITask, Operator, TaskVariant } from "../data/types";

/**
 * 
 * @returns A task with numerical values for variables, and the solution to the task
 */
export function createTaskVariant(task: ITask): TaskVariant{
    let variablesMap = new Map<string, number>();
    task.variables.forEach(variable => {
        //TODO: Tar foreløpig bare heltall mellom 1 og 10. Her bør man ha funksjonalitet for range og verdi-type
        const value = Math.floor(Math.random() * 10) + 1;
        variablesMap.set(variable, value);
    });
    const variant: string = replaceVariables(task, variablesMap);
    const solution: string = calculateSolution(task, variablesMap);
    return {variant: variant, solution: solution}
}

function calculateSolution(task: ITask, variables: Map<string, number>): string{
    let calculatedSteps: number[] = []; //Kan hende jeg må endre her om jeg ikke lenger bare skal ha utreninger
    task.solutionSteps.forEach((step, index) => {
        console.log("Step: ", index, step);
        console.log("Variables: ", variables);
        const solution = calculateStep(step, variables);
        calculatedSteps.push(solution);
        variables.set("s_" + index.toString(), solution);
    });
    return roundToFixedIfNeeded(calculatedSteps[calculatedSteps.length - 1], task.decimals);
}

function calculateStep(step: string, variables: Map<string, number>): number{
    const operator = extractOperator(step);
    console.log("Variables in step: ", variables);
    if (operator) { //Custom operator
        const relevantVariables = extractRelevantVariables(step);
        return operator.calculate(step, relevantVariables, variables);
    } else { //Use evaluate
        const stepEq = parse(step).compile().evaluate(variables);
        return stepEq;
    }
}

function replaceVariables(task: ITask, variableMap: Map<string, any>): string {
    return task.ordinaryVersion.replace(/\$/g, "").replace(/&([^&]+)&/g, (match, p1) => {
        const key = p1.trim();
        return variableMap.has(key) ? variableMap.get(key).toString() : match;
    });
}

function extractOperator(step: string): Operator | undefined { //Forventer ikke at operator har rare tegn rundt seg
    const matchingOperator = operators.find(operator => step.includes(operator.sign));
    return matchingOperator ? matchingOperator : undefined;
}

function extractRelevantVariables(step: string): string[] {
    const variableRegex = /\b([a-zA-Z_]\w*)\b/g; // Regular expression to match variable names
    const variableMatches = step.match(variableRegex);
    
    if (variableMatches) {
        // Filter unique variable names
        const uniqueVariables = Array.from(new Set(variableMatches));
        return uniqueVariables;
    }

    return [];
}

function roundToFixedIfNeeded(value: number, decimalPlaces: number): string {
    const currentDecimalPlaces = (value.toString().split('.')[1] || '').length;

    if (currentDecimalPlaces > decimalPlaces) {
      const factor = 10 ** decimalPlaces;
      return (Math.round(value * factor) / factor).toString();
    }

    return value.toString();
}