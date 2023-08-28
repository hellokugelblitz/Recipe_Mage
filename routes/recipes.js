// routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeData = require('../data/recipes.json');
const path = require('path');

router.get('/recipes', (req, res) => {
    const queryTitle = req.query.word; // Get the title query parameter 
  
    // // Filter the JSON data based on titles containing the provided word
    const filteredData = {};
    try {
      for (const key in recipeData) {
        const recipe = recipeData[key];
        if((typeof(recipe.title) != "undefined")){
          // console.log(recipe.title);
          if (recipe.title.toLowerCase().includes(queryTitle.toLowerCase())) {
              // console.log(recipe.title);
              filteredData[key] = recipe;
          }     
        }
      }
    } catch(error){
      console.log(error);
    }

    // console.log("Done Searching")
    // console.log(filteredData);
    res.json(filteredData);
  });

  //test: http://localhost:3000/api/recipes/ingredients?ingredients=chicken,butter

  //API endpoint for retre
  // router.get('/recipes/ingredients', (req, res) => {
  //   try {
  //   const queryTitle = req.query.ingredients; // Get the ingredient query parameter 
  //   const ingredients = queryTitle.split(","); // We are going to split this by , as a test.
  //   // console.log(ingredients);
  //   console.log("reaching");
  //   const filteredData = {};
  //     for (const key in recipeData) {
  //       const recipe = recipeData[key];
        
  //       //We need to double check to make sure that the data is valid because there is some bad data.
  //       if(typeof(recipe.title) != "undefined"){
  //         if(doStringsOccurInList(ingredients, recipe.ingredients)){
  //           //very important, getting rid of some stupid stuff.
  //           filteredData[key] = recipe;
  //           // console.log(recipe);
  //         }
  //       }


  //     }
      
  //   } catch(error){
  //     console.log(error);
  //   }

  //   // console.log("Done Searching")
  //   console.log(filteredData);
  //   res.json(filteredData);
  // });

    //sends some of the ingredient data to client
    const ingredientData = require('../data/ingredients.json');
    router.get('/recipes/ingredients/names', (req, res) => {
      res.json(ingredientData);
    });

  router.get('/recipes/ingredients', (req, res) => {
    const queryTitle = req.query.ingredients; // Get the ingredient query parameter 
    const ingredients = queryTitle.split(","); // We are going to split this by , as a test.
    console.log(ingredients)

    const filteredData = {};
    try {
      console.log("getting here");
      for (const key in recipeData) {
        const recipe = recipeData[key];
        //We need to double check to make sure that the data is valid because there is some bad data.
        if((typeof(recipe.title) == "undefined")){
          continue;
        }

        if(doStringsOccurInList(ingredients, recipe.ingredients)){
          //very important, getting rid of some stupid stuff.
          filteredData[key] = recipe;
        }
      }
    } catch(error){
      console.log(error);
    }

    // console.log(filteredData);
    res.json(filteredData);

  });

  function doStringsOccurInList(stringsToCheck, targetList) {
    // Clean the strings by removing unwanted text
    const cleanedStringsToCheck = stringsToCheck.map(str => str.replace(/ADVERTISEMENT/g, '').trim());
    // console.log(stringsToCheck); Returning cheese???
  
    // Check if each cleaned string in cleanedStringsToCheck is present in targetList
    for (const str of cleanedStringsToCheck) {
      if (!targetList.some(targetStr => targetStr.includes(str))) {
        // console.log(str);
        return false; // If any string is not found, return false
      }
    }
  
    return true; // All strings are found
  }

  function doStringsOccurInList_exclusive(stringsToCheck, targetList) {
    // Create a set to store cleaned strings from stringsToCheck
    const cleanedStringsToCheck = new Set(stringsToCheck.map(str => str.replace(/ADVERTISEMENT/g, '').trim()));

    // Map over targetList and replace non-matching lines with an empty string
    const modifiedList = targetList.map(targetStr => {
      for (const cleanedStr of cleanedStringsToCheck) {
        if (targetStr.includes(cleanedStr)) {
          return targetStr; // Found a matching cleaned string, keep the line
        }
      }
      return ''; // No match found, replace with empty string
    });
    // console.log(modifiedList)
    return modifiedList;
  }

  function contains_empty_space(array){
    for(item of array){
      if(item == ''){
        return true;
      }
    }
    return false;
  }

module.exports = router;