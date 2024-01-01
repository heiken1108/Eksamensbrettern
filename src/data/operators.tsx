const operators = [
    {   
        name: "Addition",
        sign: "+",
        calculate: addition
    },
    {   
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
        name: "Division",
        sign: "/",
        calculate: division
    }

]

function addition(variables: number[]): number {
    return variables[0] + variables[1];
}

function subtraction(variables: number[]): number {
    return variables[0] - variables[1];
}

function multiplication(variables: number[]): number {
    return variables[0] * variables[1];
}

function division(variables: number[]): number {
    return variables[0] / variables[1];
}

export default operators;