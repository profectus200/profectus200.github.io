const getRecipeBtn: HTMLButtonElement = document.getElementById('get-recipe-btn') as HTMLButtonElement;
const drinkName: HTMLTextAreaElement = document.getElementById('drink') as HTMLTextAreaElement;
const instructions: HTMLTextAreaElement = document.getElementById('instructions') as HTMLTextAreaElement;
const ingredients: HTMLTextAreaElement = document.getElementById('ingredients') as HTMLTextAreaElement;
const drinkPhoto: HTMLImageElement = document.getElementById('drinkThumb') as HTMLImageElement;

interface RecipeJson {
    elements: Record<string, Array<Record<string, any>>>;
}

interface Recipe {
    drinkName: string;
    instructions: string;
    ingredients: string;
    drinkPhoto: string;
}

async function fetchSomeRecipe(): Promise<RecipeJson> {
    return {elements: await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(r => r.json())};
}

function parseRecipe(recipeJson: RecipeJson): Recipe {
    const drinks = recipeJson.elements.drinks;
    const {
        strDrink, strInstructions, strDrinkThumb, strIngredient1, strIngredient2, strIngredient3, strIngredient4,
        strIngredient5, strIngredient6, strIngredient7, strIngredient8
    } = drinks[0];
    const ingredient_list: Array<string | null> = [strIngredient1, strIngredient2, strIngredient3, strIngredient4,
        strIngredient5, strIngredient6, strIngredient7, strIngredient8];

    let strIngredients = "";
    for (let i = 0; i < 8; i++) {
        if (ingredient_list[i] != null) {
            strIngredients += ingredient_list[i] + ", ";
        }
    }
    strIngredients = strIngredients.slice(0, -2);

    return {
        drinkName: strDrink,
        ingredients: strIngredients,
        instructions: strInstructions,
        drinkPhoto: strDrinkThumb
    };
}

function setParams(recipe: Recipe) {
    ingredients.textContent = recipe.ingredients;
    drinkName.textContent = recipe.drinkName;
    instructions.textContent = recipe.instructions;
    drinkPhoto.src = recipe.drinkPhoto;
}

getRecipeBtn.addEventListener('click', async function (e) {
    drinkName.textContent = instructions.textContent = 'Loading...';
    const recipeJson: RecipeJson = await fetchSomeRecipe();
    const recipe: Recipe = parseRecipe(recipeJson);
    setParams(recipe);
});