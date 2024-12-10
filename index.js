// Guest and her preferences
const guest = {
  name: 'Alice',
  loves: ['avocado', 'quinoa', 'kale'],
  dislikes: ['pork', 'chicken', 'turkey', 'beef', 'dairy', 'butter', 'eggs', 'gluten', 'nuts', 'soy', 'flour'],
};

// List of Christmas-themed recipes with their ingredients
const recipes = [
  {
    name: 'Honey-Glazed Ham',
    ingredients: ['pork', 'honey', 'brown sugar', 'cloves', 'butter'],
  },
  {
    name: 'Roast Turkey with Stuffing',
    ingredients: ['turkey', 'bread crumbs', 'gluten', 'celery', 'onions', 'tomatoes', 'butter'],
  },
  {
    name: 'Classic Beef Wellington',
    ingredients: ['beef', 'mushrooms', 'puff pastry', 'eggs'],
  },
  {
    name: 'Gingerbread Cookies',
    ingredients: ['flour', 'molasses', 'ginger', 'cinnamon', 'butter', 'eggs'],
  },
  {
    name: 'Vegan Stuffed Peppers',
    ingredients: ['bell peppers', 'quinoa', 'black beans', 'corn', 'tomato sauce', 'kale'],
  },
  {
    name: 'Roasted Brussels Sprouts',
    ingredients: ['brussels sprouts', 'olive oil', 'garlic'],
  },
  {
    name: 'Vegan Avocado Chocolate Mousse',
    ingredients: ['avocado', 'cocoa powder', 'maple syrup', 'flour'],
  },
  {
    name: 'Vegan Christmas Cookies',
    ingredients: ['oats', 'maple syrup', 'vanilla extract'],
  },
  {
    name: 'Quinoa Salad',
    ingredients: ['kale', 'quinoa', 'cranberries', 'lemon juice'],
  },
  {
    name: 'Vegan Lentil Loaf',
    ingredients: ['lentils', 'carrots', 'celery', 'onions', 'tomato paste'],
  },
];

// Requirements for a suitable recipe
// 1: Contains at least one ingredient Alice likes
// 2: Contains zero ingredients that Alice dislikes

// Step 1: Filter recipes based on Alice's preferences

function buildMenu() {
  const currentMenu = filterLikes(recipes, guest.dislikes, false)
  let finalMenu = []
  if(currentMenu.length > 0) {
    finalMenu = filterLikes(currentMenu, guest.loves, true)
  } else {
    return currentMenu
  }
  return finalMenu
}

function filterLikes(menu, list, inclusive) {
  const likeFilter = menu.map((menuItem) => {

    let valid = !inclusive
    for(let item of list) {
      valid = checkItems(menuItem.ingredients, item)
      if(valid) {
        break
      }
    }
    if(valid === inclusive) {
      return menuItem
    }
  })
  const finalFilter = likeFilter.filter(menuItem => menuItem != undefined)
  return finalFilter
}

function filterDislike(menu, list) {
  const possibleMenu = menu.map((recipe) => {
    let valid = true
    for(let item of list) {
      valid = !checkItems(recipe.ingredients, item)
      if(!valid) {
        break
      }
    }
    if(valid) {
      return recipe
    }
  })
  const dislikeFilter = possibleMenu.filter(menuItem => menuItem != undefined)
  return dislikeFilter
}

function checkItems(ingredients, item) {
  //funcion checks whether an item is in a list of ingredients.
  //returns true if the item is, returns false if it isn't
  let foundValue = false
  if(ingredients) {
    ingredients.forEach(ingredient => {
      if(ingredient === item) {
        foundValue = true
      }
      
    })
  } else {
    return false
  }
  return foundValue
}

const filteredMenu = buildMenu()
filteredMenu.forEach(element => {
  console.log(element.name)
  console.log(element.ingredients.join(' '))
});


// Step 2: Output the suitable recipes
