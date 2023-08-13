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

    //This is a 
    function fetchRecipes(input) {
        var value = document.getElementById(input).value;
        fetch('/api/recipes/ingredients?ingredients=' + value)
        .then(response => response.json())
        .then(data => {
            // Call a function to represent the data using HTML
            // data.ingredients.map(str => str.replace(/ADVERTISEMENT/g, '').trim());
            renderDataAsHTML(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function cleanIngredients(listOfStrings){
        const cleanedStringsToCheck = listOfStrings.map(str => str.replace(/ADVERTISEMENT/g, '').trim());
        return cleanedStringsToCheck;
    }