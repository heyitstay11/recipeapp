
const URL = `https://api.edamam.com/search?q=pav&app_id=${API_ID}&app_key=${API_KEY}`;

const inpName = document.getElementById("inpName"); 
const inpForm = document.getElementById("inpForm");
const  container = document.querySelector("#Recipe-container");
let recipe = document.createElement('div');

inpForm.addEventListener('submit',(e) => {
    e.preventDefault();
   let  name =  inpName.value ;
   if (!name) return
   container.innerHTML ='';
    getRecipes(name);
    inpName.value ='';
})

function getRecipes(query){
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) =>{


        for( let i = 0; i < 5; i++){
        let recipe = document.createElement('div');
        recipe.classList.add("recipe");
        var ul = ``;

        for(let m = 0; m < data.hits[i].recipe.ingredientLines.length - 1 ;m++){
         var li =`<li>${data.hits[i].recipe.ingredientLines[m]}</li>`;
         ul = ul +li
        }


        recipe.innerHTML = `
        <img class="image" src="${data.hits[i].recipe.image}" alt="food">
        <div class="info">
            <h3 class="recipe-title">${data.hits[i].recipe.label}</h3>
            <p class="recipe-info"> 
            Calories : ${Math.floor(data.hits[i].recipe.calories)}
            <ul>
                ${ul}
                </ul>
            </p>
        </div>`;

        container.appendChild(recipe);
        }
    }
    )
}
