const snowGlobe = document.querySelector('.snow-globe')

function createSnowflake() {
  const snowflake = document.createElement('p')
  snowflake.textContent = '❄️'
  snowflake.classList.add('snowflake')
  const snowflakePosition = Math.random() * snowGlobe.offsetWidth
  snowflake.style.left = `${snowflakePosition}px`
  snowGlobe.appendChild(snowflake)
  fall(snowflake)
/* 
Challenge:
1. Write JavaScript to create a snowflake and make it fall inside the snow globe. The snowflake should have a random starting position, animation duration, and size.
2. See index.css
*/ 
}

function fall(snowflake) {
  const fallSpeed = Math.random() * 5 + 5
  snowflake.style.transition = `top ${fallSpeed}s linear`
  snowflake.style.top = `${snowGlobe.offsetHeight}px`
  
  setTimeout(() => {
      snowflake.remove()
  }, (fallSpeed) * 1000)
}

setInterval(createSnowflake, 100) // Let's create a snowflake every 100 milliseconds!

/* Stretch goals: 
- Give some variety to your snowflakes, so they are not all the same. Perhaps every 25th one could be a snowman ☃️?
- Remove each snowflake after a set time - this will stop the scene from being lost in a blizzard!
- Add a button that makes the snow start falling, it could trigger a CSS-animated shake of the snow globe. Then make the snow become less frequent until it slowly stops - until the button is pressed again.  
- Change the direction of the snowflakes so they don’t all fall vertically.
- Make the style your own! 
*/