'use strict'

const DEFAULT_VALUE = ''

function formHandler(firstId, secondId) {
    const firstValue = document.querySelector(`#${firstId} select`).value
    
    if (!firstValue) {
        return null
    }

    changeVisabilityForm(firstId, secondId)
}

/**
 * function hide first el and show second el
 * @param {string} firstId - element's id which will be hidden
 * @param {string} secondId - element's id which will be shown
 */
function changeVisabilityForm(firstId, secondId) {
    const firstW = document.getElementById(firstId)
    const secondW = document.getElementById(secondId)
    
    firstW.style.display = 'none'
    secondW.style.display = 'inline-grid'
}

function finalHandler(thirdId, forthId) {
    const thirdValue = document.getElementById('capacity').value
    
    if (!thirdValue) {
        return null
    }

    changeVisabilityForm(thirdId, forthId)
    countOrder()
}

function concreteMarkPrice() {
    const concreteMark = document.getElementById('concreteMark').value

    switch (concreteMark) {
        case "М100 В7,5":
            return 2250
        case "М150 В12,5":
            return 2320  
        case "М200 В15":
            return 2440
        case "М250 В20":
            return 2560
        case "М300 В22,5":
            return 2600
        case "М350 В25":
            return 2760
        case "М400 В30":
            return 2870
        case "М450 В35":
            return 3010
        case "М500 В40":
            return 3160
    }

    return 0
}

function concreteFillerPrice() {
    const concreteFiller = document.getElementById('filler').value

    switch (concreteFiller) {
        case "Гравий":
            return 650
        case "Гранит":
            return 1100 
    }

    return 0
}

function countOrder() {
    const capacity = document.getElementById('capacity').value
    const concreteMark = document.getElementById('concreteMark').value
    const concreteFiller = document.getElementById('filler').value
    const finalPrice = (concreteMarkPrice() + concreteFillerPrice()) * parseInt(capacity, 10)
    
    fillForm({ concreteMark, concreteFiller, capacity, finalPrice })
}

function fillForm({ concreteMark, concreteFiller, capacity, finalPrice }) {
    const formData = [
        {
            text: `Марка бетона: ${concreteMark}`,
            value: concreteMark,
            id: 'concreteMarkInput'
        },
        {
            text: `Наполнитель: ${concreteFiller}`,
            value: concreteFiller,
            id: 'fillerInput'
        },
        {
            text: `Объем: ${capacity} м3`,
            value: capacity,
            id: 'capacityInput'
        },
        {
            text: `Цена: ${finalPrice} руб.`,
            value: finalPrice,
            id: 'finalPriceInput'
        },
    ]

    formData.forEach(el => {
        document.getElementById(el.id).innerText = el.text

        const [input] = [...document.getElementsByName(el.id)]
        input.value = el.value
    })
}

function cancel(firstId, secondId) {
    finalHandler(firstId, secondId)
    formRevert()
}

function formRevert() {
    const formIds = ['capacity', 'concreteMark', 'filler']

    formIds.forEach(id => document.getElementById(id).value = DEFAULT_VALUE)
}