var searchBtn = document.getElementById("serch-button");
var searchBox = document.getElementById("search-box");

searchBox.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if(event.key === 'Enter')
        searchBtn.click();
});


/*load meals*/
const searchFood = () =>{
    const searchBox = document.getElementById('search-box')
    const searchText = searchBox.value;
    searchBox.value = '';
    if(searchText.length == 0){
        return 'plese input something'
    }
    else if(searchText == ''){
        return 'invalid input'
    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
    }
    
}
/*display meals*/
const displayMeals = meals => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent= '';
    for(const meal of meals){
        // console.log(meal);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    </div>
        `
        searchResult.appendChild(div)
    }
}
/*load meal id*/
const loadMealDetail = mealid => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]))
}
/*display meal details*/
const displayMealDetail = meal => {
    const displayMealDetails = document.getElementById('display-meal-detail')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="Card title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>    

    `
    displayMealDetails.appendChild(div)
}
