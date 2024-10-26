const button = document.querySelectorAll("button")
const input = document.querySelector("#input")
const secundInput = document.querySelector("#secundInput")

let calculated = false

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

const addSymbol = (eSymbol) => {
    
    if(/[^\w\s]/.test(input.value.slice(-1))) {
        input.value = input.value.slice(0, -1)
        input.value += eSymbol;
        calculated = false   
    }
    if(!/[^\w\s]/.test(input.value)) {
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