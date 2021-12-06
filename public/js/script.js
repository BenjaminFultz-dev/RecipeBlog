let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', function() {
    let newIngredients = ingredientDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredients);
});

let addInstructionsBtn = document.getElementById('addInstructionsBtn');
let instructionList = document.querySelector('.instructionList');
let instructionDiv = document.querySelectorAll('.instructionDiv')[0];

addInstructionsBtn.addEventListener('click', function() {
    let newInstructions = instructionDiv.cloneNode(true);
    let input = newInstructions.getElementsByTagName('input')[0];
    input.value = '';
    instructionList.appendChild(newInstructions);
});