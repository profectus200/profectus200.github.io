const getRecipeBtn: HTMLButtonElement = document.getElementById('get-recipe-btn') as HTMLButtonElement;
const drink: HTMLTextAreaElement = document.getElementById('drink') as HTMLTextAreaElement;
const instructions: HTMLTextAreaElement = document.getElementById('instructions') as HTMLTextAreaElement;
const ingredients: HTMLTextAreaElement = document.getElementById('ingredients') as HTMLTextAreaElement;
const drinkThumb: HTMLImageElement = document.getElementById('drinkThumb') as HTMLImageElement;

function fetchSomeRecipe() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(r => r.json());
}

function handleRecipe(recipeObj: Record<string, Array<Record<string, any>>>) {
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
    const ingredient_list: Array<string | null> = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8];
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