// routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeData = require('../data/recipes.json');
const path = require('path');

router.get('/recipes', (req, res) => {
    const queryTitle = req.query.word; // Get the title query parameter 
  
    // // Filter the JSON data based on titles containing the provided word
    const filteredData = {};
    
    for (const key in recipeData) {
      const recipe = recipeData[key];
      if((typeof(recipe.title) != "undefined")){
        // console.log(recipe.title);
        if (recipe.title.includes(queryTitle)) {
            // console.log(recipe.title);
            filteredData[key] = recipe;
        }     
      }
    }

    // console.log("Done Searching")
    // console.log(filteredData);
    res.json(filteredData);
  });

module.exports = router;