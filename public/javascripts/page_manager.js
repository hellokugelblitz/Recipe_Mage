//The page starts with this checked
document.getElementById("contains").checked = true;

// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
// document.getElementsByTagName('head')[0].appendChild(script);



function fetchAutoComplete(){
    var availableTags = [];
    fetch('/api/recipes/ingredients/names')
    .then(response => response.json())
    .then(data => {
        for (const key in data) {
            const ingredientEntry = data[key];
            availableTags.push(ingredientEntry.term);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    return availableTags;
}

$(document).ready(function() {
    $("#tags").autocomplete({
      source: fetchAutoComplete(), // Make sure fetchAutoComplete() returns an array
      minLength:2
    });
  });



// $("#tags" ).autocomplete({
//     source: fetchAutoComplete()
// });


