const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    fs.writeFile('products.json', JSON.stringify(data, null, 2), err => {
      if (err) throw err;
      console.log('Data has been saved to products.json');
    });
  })
  .catch(err => console.error(err));
