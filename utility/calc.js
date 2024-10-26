const button = document.querySelectorAll("button")
const input = document.querySelector("#input")
const secundInput = document.querySelector("#secundInput")

const calc = () => {
    console.log(input.value);
    console.log(parseFloat(input.value));
    console.log(eval(input.value.replace(/÷/g, "/").replace(/×/g, "*")));

    try {
        const result = eval(input.value.replace(/÷/g, "/").replace(/×/g, "*"))
        secundInput.value = input.value
        input.value = result
    } catch (error) {
        console.error(error);
        input.value = "Error"
    }
    
    
}

button.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        let valueNumber = e.target.textContent

        if(/^\d+(\.\d+)?$/.test(valueNumber)) { // Number
            input.value += valueNumber;
        }
        if(/^[^\w\s]+$/.test(valueNumber) && !/[^\w\s]/.test(input.value)) { // Symbol
            input.value += valueNumber;
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