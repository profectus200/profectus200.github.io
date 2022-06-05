const getRecipeBtn = document.getElementById('get-recipe-btn');
const drink = document.getElementById('drink');
const instructions = document.getElementById('instructions');
const ingredients = document.getElementById('ingredients');
const drinkThumb = document.getElementById('drinkThumb');

function fetchSomeRecipe() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(r => r.json());
}

function handleRecipe(recipeObj) {
    const {drinks} = recipeObj;
    const {
        strDrink,
        strInstructions,
        strDrinkThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8
    } = drinks[0];
    const ingredient_list = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8];
    let strIngredients = "";
    for (let i = 0; i < 8; i++) {
        if (ingredient_list[i] != null) {
            strIngredients += ingredient_list[i] + ", ";
        }
    }
    strIngredients = strIngredients.slice(0, -2);
    ingredients.textContent = strIngredients;
    drink.textContent = strDrink;
    instructions.textContent = strInstructions;
    drinkThumb.src = strDrinkThumb;
}

getRecipeBtn.addEventListener('click', async function (e) {
    drink.textContent = instructions.textContent = 'Loading...';
    const recipe = await fetchSomeRecipe();
    handleRecipe(recipe);
});