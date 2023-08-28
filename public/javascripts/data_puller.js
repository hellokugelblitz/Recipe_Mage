var ingredients = [];

function renderDataAsHTML(data) {
    const container = document.getElementById('data-container'); // Id for data div container...
    
        if(container.innerHTML != ""){
            container.innerHTML = "";
        }

        for (const key in data) {
            const recipe = data[key];
            recipe.ingredients = recipe.ingredients.map(str => str.replace('ADVERTISEMENT', '').trim());
            // console.log(recipe.ingredients);
            const recipeDiv = document.createElement('div');
            recipeDiv.id = "recipe"
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
            list.innerHTML = "<li>" + document.getElementById('tags').value + "<svg version='1.1' id='x_btn' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 50 50' xml:space='preserve'> <circle id='x_circle' cx='25' cy='25' r='25' onclick='add_ingredient()' /> <line style='fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;' x1='15' y1='15' x2='35' y2='35'/> <line style='fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;' x1='35' y1='15' x2='15' y2='35'/> </svg>" + "</li>";

            ingredients.push(value);
        } else if(value != "") {
            list.innerHTML = (list.innerHTML + "<li>" + document.getElementById('tags').value  + "<svg version='1.1' id='x_btn' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 50 50' xml:space='preserve'> <circle id='x_circle' cx='25' cy='25' r='25' onclick='add_ingredient()' /> <line style='fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;' x1='15' y1='15' x2='35' y2='35'/> <line style='fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;' x1='35' y1='15' x2='15' y2='35'/> </svg>" + "</li>");
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