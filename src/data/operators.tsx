import { parse } from "mathjs";
import { Operator } from "./types";


const operators: Operator[] = [
    {   
        name: "Summation",
        sign: "S",
        calculate: summation
    }
]

function summation(step: string, relevantVariables: string[], variables: Map<string, number>): number {
    const relevantValues = relevantVariables.map(variable => variables.get(variable));
    let s = 0;
    relevantValues.forEach(value => {
        s += value ?? 0;
    });
    return s;
}

export default operators;