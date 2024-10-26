const button = document.querySelectorAll("button")
const input = document.querySelector("#input")

button.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        let valueNumber = e.target.textContent

        if(/^[^\w\s]+$/.test(valueNumber) || /^\d+(\.\d+)?$/.test(valueNumber)) {
            if(!/^[^\w\s]+$/.test(input.value))
            input.value += valueNumber;
        }
    })
})