const container = document.querySelector("#containerBtn")

const arrayCalc = ["DEL", "AC", "%", "÷", 7, 8, 9, "×", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "RESULT"]

for(let i = 0; i < arrayCalc.length; i++) {

    let newBtn = document.createElement("button")

    newBtn.textContent = arrayCalc[i]

    container.appendChild(newBtn)  
}