var ingredients = [];

function renderDataAsHTML(data) {
    const container = document.getElementById('data-container'); // Id for data div container...
    
        if(container.innerHTML != ""){
            container.innerHTML = "";
        }

        for (const key in data) {
            const recipe = data[key];
            recipe.ingredients = recipe.ingredients.map(str => str.replace('ADVERTISEMENT', '').trim());
            const recipeDiv = document.createElement('div');
            recipeDiv.id = "recipe";
            recipeDiv.innerHTML = `<h2>${recipe.title}</h2><p>${recipe.ingredients}</p>`;
            container.appendChild(recipeDiv);
        }
    }

    function fetchRecipes() {
        fetch('/api/recipes/ingredients?ingredients=' + create_ingredient_string(ingredients))
        .then(response => response.json())
        .then(data => {
            // Call a function to represent the data using HTML;
            renderDataAsHTML(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    // function cleanIngredients(listOfStrings){
    //     const cleanedStringsToCheck = listOfStrings.map(str => str.replace(/ADVERTISEMENT/g, '').trim());
    //     return cleanedStringsToCheck;
    // }

    function add_ingredient(){
        var value = document.getElementById("tags").value
        var list = document.getElementById("ingredient-list");
        if(ingredients.length == 0 && value != ""){
            list.innerHTML = "";
            list.innerHTML = "<li>" + document.getElementById('tags').value + " <a>[x]</a>" + "</li>";

            ingredients.push(value);
        } else if(value != "") {
            list.innerHTML = list.innerHTML + "<li>" + document.getElementById('tags').value + " <a>[x]</a>" + "</li>";
            ingredients.push(value);
        }
        console.log(ingredients);
    }

    function create_ingredient_string(array){
        var empty = "";
        for(i of array){
            empty = empty + i + ",";
        }
        return empty.slice(0,-1);
    }