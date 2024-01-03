import { parse } from "mathjs";
import { Operator } from "./types";


const operators: Operator[] = [
    {   
        name: "Summation",
        sign: "S",
        calculate: summation
    },
    /*{   
        name: "Subtraction",
        sign: "-",
        calculate: subtraction
    },
    {   
        name: "Multiplication",
        sign: "*",
        calculate: multiplication
    },
    
    {
        name: "Cosine",
        sign: "cos",
        calculate: cosine
    },
    {
        name: "Sine",
        sign: "sin",
        calculate: sine
    },
    {
        name: "Tangent",
        sign: "tan",
        calculate: tan
    }, 
    {
        name: "Sum",
        sign: "sum",
        calculate: sum
    },
    {
        name: "Product",
        sign: "prod",
        calculate: product
    },
    {
        name: "Defined integral",
        sign: "I",
        calculate: definedIntegral
    }, 
    {
        name: "Derivative",
        sign: "D",
        calculate: derivative
    }*/
]

function summation(step: string, relevantVariables: string[], variables: Map<string, number>): number {
    const relevantValues = relevantVariables.map(variable => variables.get(variable));
    let s = 0;
    relevantValues.forEach(value => {
        s += value ?? 0;
    });
    return s;
}
/*
function subtraction(variables: number[]): number {
    return variables[0] - variables[1];
}

function multiplication(variables: number[]): number {
    return variables[0] * variables[1];
}

function division(variables: number[]): number {
    return variables[0] / variables[1];
}

function cosine(variables: number[]): number {
    return Math.cos(variables[0]);
}

function sine(variables: number[]): number {
    return Math.sin(variables[0]);
}

function tan(variables: number[]): number {
    return Math.tan(variables[0]);
}

function sum(variables: number[]): number {
    let sum = 0;
    variables.forEach(variable => {
        sum += variable;
    });
    return sum;
}

function product(variables: number[]): number {
    let product = 1;
    variables.forEach(variable => {
        product *= variable;
    });
    return product;
}

function definedIntegral(variables: number[]): number {
    //TODO: Implement defined integral
    return 0;
}

function derivative(variables: number[]): number {
    //TODO: Implement derivative
    return 0
}*/



export default operators;