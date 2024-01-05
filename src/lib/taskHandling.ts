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
        let value: number;
        switch (variable.type) {
            case "Integer": 
                console.log("Int: ", variable.name);
                if (variable.domain.max !== undefined && variable.domain.min !== undefined) {
                    value = Math.floor(Math.random() * (variable.domain.max - variable.domain.min + 1)) + variable.domain.min
                } else {
                    value = 0;
                }
                break;
            case "Semicontinuous":
                console.log("Semi: ", variable.name);
                if (variable.domain.max !== undefined && variable.domain.min !== undefined && variable.domain.stepSize !== undefined) {
                    const h: number = (variable.domain.max - variable.domain.min) / variable.domain.stepSize; 
                    const i: number = Math.floor(Math.random() * (h + 1)); //Litt usikker akkurat denne utregningen
                    value = i * variable.domain.stepSize + variable.domain.min;
                } else {
                    value = 0;
                }
                break;
            case "Continuous": 
                console.log("Cont: ", variable.name);
                if (variable.domain.max !== undefined && variable.domain.min !== undefined && variable.domain.maxDecimals !== undefined) {
                    value = parseFloat((Math.random() * (variable.domain.max - variable.domain.min) + variable.domain.min).toFixed(variable.domain.maxDecimals));
                } else {
                    value = 0;
                }
                break;
            case "Specific": 
                console.log("Specific: ", variable.name);
                if (variable.domain.values !== undefined && variable.domain.values.length > 0) {
                    value = variable.domain.values[Math.floor(Math.random() * variable.domain.values.length)]
                } else {
                    value = 0;
                }
                break;
            default: 
                console.log("Default: ", variable.name);   
                value = 0;  
        }
        variablesMap.set(variable.name, value);
    });
    console.log("Variables map: ", variablesMap);
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
    let replacedString = "";
    let variableName = "";
    let inEquation = false;

    for (let i = 0; i < task.ordinaryVersion.length; i++) {
        const char = task.ordinaryVersion[i];

        if (char === "&") {
            inEquation = !inEquation;
            if (!inEquation) {
                // Check if the variableName is in the variableMap
                if (variableMap.has(variableName)) {
                    replacedString += variableMap.get(variableName);
                } else {
                    replacedString += "&" + variableName; // If not found, append the original variable name
                }
                variableName = ""; // Reset variableName
            }
        } else if (inEquation) {
            variableName += char;
        } else {
            replacedString += char;
        }
    }

    // Check if there's an unfinished variableName at the end
    if (inEquation && variableMap.has(variableName)) {
        replacedString += variableMap.get(variableName);
    } else if (inEquation) {
        replacedString += "&" + variableName; // If not found, append the original variable name
    }

    return replacedString;
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