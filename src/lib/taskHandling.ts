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
                if (variable.domain.max !== undefined && variable.domain.min !== undefined) {
                    value = Math.floor(Math.random() * (variable.domain.max - variable.domain.min + 1)) + variable.domain.min
                } else {
                    value = 0;
                }
                break;
            case "Semicontinuous":
                if (variable.domain.max !== undefined && variable.domain.min !== undefined && variable.domain.stepSize !== undefined) {
                    const h: number = (variable.domain.max - variable.domain.min) / variable.domain.stepSize; 
                    const i: number = Math.floor(Math.random() * (h + 1)); //Litt usikker akkurat denne utregningen
                    value = i * variable.domain.stepSize + variable.domain.min;
                } else {
                    value = 0;
                }
                break;
            case "Continuous": 
                if (variable.domain.max !== undefined && variable.domain.min !== undefined && variable.domain.maxDecimals !== undefined) {
                    value = parseFloat((Math.random() * (variable.domain.max - variable.domain.min) + variable.domain.min).toFixed(variable.domain.maxDecimals));
                } else {
                    value = 0;
                }
                break;
            case "Specific": 
                if (variable.domain.values !== undefined && variable.domain.values.length > 0) {
                    value = variable.domain.values[Math.floor(Math.random() * variable.domain.values.length)]
                } else {
                    value = 0;
                }
                break;
            default: 
                value = 0;  
        }
        variablesMap.set(variable.name, value);
    });
    console.log("Variables map: ", variablesMap);
    const variant: string = addMathJax(replaceVariables(task, variablesMap));
    const solution: string = calculateSolution(task, variablesMap);
    return {variant: variant, solution: solution}
}

function calculateSolution(task: ITask, variables: Map<string, number>): string{
    let calculatedSteps: number[] = []; //Kan hende jeg må endre her om jeg ikke lenger bare skal ha utreninger
    task.solutionSteps.forEach((step, index) => {
        const solution = calculateStep(step, variables);
        calculatedSteps.push(solution);
        variables.set("s_" + index.toString(), solution);
    });
    return roundToFixedIfNeeded(calculatedSteps[calculatedSteps.length - 1], task.decimals);
}

function calculateStep(step: string, variables: Map<string, number>): number{
    const operator = extractOperator(step);
    if (operator) { //Custom operator
        const relevantVariables = extractRelevantVariables(step);
        return operator.calculate(step, relevantVariables, variables);
    } else { //Use evaluate
        const stepEq = parse(step).compile().evaluate(variables);
        return stepEq;
    }
}

function replaceVariables(task: ITask, variableMap: Map<string, any>): string {
    //Finn index til alle likninger
    let equationEncapsulators: number[] = getAllIndexes(task.ordinaryVersion, "&");
    //Hent ut alle variabler
    const variables = Array.from(variableMap.keys());

    //Finn strengene til alle likningene
    const equations = [];
    for (let i = 0; i < equationEncapsulators.length; i+=2) {
        const equation = task.ordinaryVersion.substring(equationEncapsulators[i]+1, equationEncapsulators[i+1]);
        equations.push(equation);
    }
    
    //Lag et map der en generell likning mapper til en likning med variabler byttet ut med tall
    const equationMap = new Map<string, string>();
    equations.forEach((equation) => {
        let equationToChange = equation;
        variables.forEach((variable) => {
            if (equation.includes(variable)) {
                equationToChange = equationToChange.replace(new RegExp(variable, 'g'), variableMap.get(variable));
            }
        })
        equationMap.set(equation, equationToChange);
    })

    //Bytt ut alle likningene i hele oppgaven
    let replacedString = task.ordinaryVersion;
    for (let i = 0; i < equationEncapsulators.length; i+= 2) {
        //Finn likningen
        const equation = replacedString.substring(equationEncapsulators[i]+1, equationEncapsulators[i+1]);

        //Bytt ut med likningen med verdier
        const equationToReplace: string = equationMap.get(equation) as string; // Add type assertion
        const newReplacedString = replaceAtIndex(replacedString, equationEncapsulators[i], equationEncapsulators[i+1], equationToReplace)

        //Ta hensyn til at lengden på strengen har endret seg siden man fjerner &-ene og legger til et tall med potensielt annen lengde
        const lengthDifference = newReplacedString.length - replacedString.length;
        for (let j = i+2; j < equationEncapsulators.length; j++) {
            equationEncapsulators[j] = equationEncapsulators[j] + lengthDifference;
        }
        replacedString = newReplacedString;
    }
    return replacedString;


}

function replaceAtIndex(originalString: string, indexStart: number, indexEnd: number, replacement: string): string {
    const replaceString = originalString.substring(0, indexStart) + replacement + originalString.substring(indexEnd + 1);
    return replaceString;
}

function getAllIndexes(inputString: string, targetChar: string): number[] {
    const indexes: number[] = [];

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === targetChar) {
            indexes.push(i);
        }
    }

    return indexes;
}

function addMathJax(task: string): string {
    let newTaskString = task;
    let inEquation = false;
    while (newTaskString.includes("$")) {
        inEquation = !inEquation;
        if (inEquation) {
            newTaskString = newTaskString.replace("$", "\\(");
        } else {
            newTaskString = newTaskString.replace("$", "\\)");
        }
    }
    return newTaskString;
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