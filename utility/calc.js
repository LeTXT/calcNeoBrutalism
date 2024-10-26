const button = document.querySelectorAll("button")
const input = document.querySelector("#input")
const secundInput = document.querySelector("#secundInput")

let calculated = false

const inputValue = input.value
console.log(inputValue);

// Calcula quando o botão result é apertado
const calc = () => {
    console.log(input.value);
    console.log(parseFloat(input.value));
    console.log(eval(input.value.replace(/÷/g, "/").replace(/×/g, "*")));

    try {
        const result = eval(input.value.replace(/÷/g, "/").replace(/×/g, "*"))
        secundInput.value = input.value
        input.value = result
        calculated = true
    } catch (error) {
        console.error(error);
        input.value = "Error"
    }
    
    
}

// Adiciona número
const itsNumber = (eNumber) => {
    if(!calculated) {
        input.value += eNumber;
    } 
    if(calculated) {
        secundinput.value = input.value
        input.value = eNumber
        calculated = false
    }
}

const point = (e) => {
    console.log(/\./.test(input.value))
    console.log(input.value);
    
    if(!/\./.test(input.value) && !/[^\w\s.]/.test(input.value)) {
        input.value += e
        return
    } 
    if((input.value.match(/\./g) || []).length == 1) {
        input.value += e
        return
    }
    
}

const addSymbol = (eSymbol) => {
    // console.log(/\d/.test(input.value));
    
    // Verifica se existe numero no input
    if(!/\d/.test(input.value)) {
        return
    }
    // Verifica se o botão apertado foi o "." ou "%"
    if(eSymbol == ".") {
        point(eSymbol)
        return
    }
    // Verifica se já tem um sibolo, e caso tenha substitui o simbolo
    if(/[^\w\s]/.test(input.value.slice(-1)) && eSymbol !== ".") {
        input.value = input.value.slice(0, -1)
        input.value += eSymbol;
        calculated = false   
    }
    // Verifica se já existe simbolo, e caso não tenha adiciona
    if(!/[^\w\s.]/.test(input.value)) {
        input.value += eSymbol
        calculated = false
    }
    
}



button.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        let valueNumber = e.target.textContent

        if(/^\d+(\.\d+)?$/.test(valueNumber)) { // Number
            // input.value += valueNumber;
            itsNumber(valueNumber)
        }
        if(/^[^\w\s]+$/.test(valueNumber)) { // Symbol
            addSymbol(valueNumber)
        }
        if(valueNumber === "RESULT") {
            calc()
        }
        if(valueNumber === "DEL") {
            let delLast = input.value.slice(0, -1)
            input.value = delLast
        }
        if(valueNumber === "AC") {
            input.value = ""
        }
    })
})