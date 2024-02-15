const fetch = require('node-fetch');
const fs = require('fs');

const apiUrl = 'https://dummyjson.com/products/categories';
const outputFilePath = 'categories.json';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    fs.writeFile(outputFilePath, JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log(`Categories data saved to ${outputFilePath}`);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
