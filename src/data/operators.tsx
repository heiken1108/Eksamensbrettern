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

export default operators;