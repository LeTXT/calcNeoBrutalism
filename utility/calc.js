const button = document.querySelectorAll("button")
const input = document.querySelector("#input")
const secundInput = document.querySelector("#secundInput")

let calculated = false
let putPoint = true

// Calcula quando o botão result é apertado
const calc = () => {
    try {
        // caso seja uma conta de porcentagem
        if(/\%/.test(input.value)) {
            // Procura o primeiro símbolo
            const searchSymbol = input.value.search(/[^a-zA-Z0-9]/)
            // Obtem o número até esse primeiro símbolo
            const searchResult = input.value.substring(0, searchSymbol)
            // Obtem o símbolo
            const getSymbol = input.value.match(/[^a-zA-Z0-9]/)[0]
            // Obtem o valor da porcentagem
            const searchPercent = input.value.substring(searchSymbol + 1, input.value.length -1)

            let percentValue = searchResult * searchPercent / 100

            // adiciona conta no input.value
            input.value = searchResult + getSymbol + percentValue
        }
                const result = eval(input.value.replace(/÷/g, "/").replace(/×/g, "*"))

                secundInput.value = input.value

                input.value = result.toFixed(2)
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
        secundInput.value = input.value
        input.value = eNumber
        calculated = false
    }
}

const percent = (e) => {
    if(!/\%/.test(input.value) && /[^\w\s]/.test(input.value) && /^\d+(\.\d+)?$/.test(input.value.slice(-1))) {
        input.value += e
    }
    
}

const point = (e) => {
    
    // Não tem ponto e não tem simbolo
    if(!/\./.test(input.value) && !/[^\w\s.]/.test(input.value)) {
        input.value += e
        return
    } 
    // Não tem ponto e tem simbolo
    if(!/\./.test(input.value) && /[^\w\s.]/.test(input.value)) {
        input.value += e
        putPoint = false
        return
    }
    // Tem apenas um ponto
    if((input.value.match(/\./g) || []).length == 1 && putPoint) {
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
    if(eSymbol == "." || eSymbol == "%") {
        if(eSymbol == ".") {
            point(eSymbol)
        }
        if( eSymbol == "%") {
            percent(eSymbol)
        }
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