const input = document.getElementById("get-input");
const mealLists = document.getElementById("meals");
const results = document.getElementById("output-area");
const foodItem= elements => {
    const mealCategory = input.value;
    if(mealCategory.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealCategory}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
            results.innerHTML =`<h1>'${mealCategory}'</h1>`;
            if(data.meals === null){
                results.innerHTML =`<h3> Please Enter your desired meal correctly  and try again </p>`;
            }else{
                mealLists.innerHTML = data.meals.map( mealInfo).join('');
            }
        });
        input.value = '';
    }
    else{
        alert('Please enter a Meal name.')
    }
}
const mealInfo = meal => `
<div class="meal">
<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
<div class="meal-info" data-mealId="${meal.idMeal}" >
    <h3>${meal.strMeal}</h3>
</div>
</div>
`

const getMealById = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data =>{
        const meal = data.meals[0];
        addMealItem(meal);
    })
}


const addMealItem = meal =>{
    const ingredients = [];

    for(let i = 1; i<=10; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break
        }
    }
    const individualMeal = document.getElementById("individual-meal");
    individualMeal.innerHTML  = `
    <div class="individual-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="individual-meal-info">
        <p>${meal.strCategory}</p>
        <p>${meal.strArea}</p>
        </div>
        <div class="description">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>
    `
  
}

/**To see the individual list please click on the  mealLists  div */


const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click',foodItem);
mealLists.addEventListener('click',elements => {
    const mealInfo = elements.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });
    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealId');
        getMealById(mealID);
    }
})