// Santa needs your help to figure out if he has enough money to give everyone change!
// Your goal will be to return true if everyone gets their correct change, and false if at least one person does not receive their correct change! Use the function below to get started!

// Good luck and happy coding!!
function correctChangeFromSanta(bills) {
  let fives = 0
  let tens = 0
  let twenties = 0
  let changeGiven = true
  bills.forEach(bill => {
    switch(bill) {
      case 5:
        fives++
        break
      case 10:
        tens++
        if(fives>0){
          fives--
        } else {
          changeGiven = false
        }
        break
      case 20:
        twenties++
        if(fives>0){
          fives--
          if(tens>0){
            tens--
          } else {
            changeGiven = false
          }
        } else {
          changeGiven = false
        }
        break
      default:
        console.error('unrecognzied bill')
    }
  })
  console.log('fives: ', fives)
  console.log('tens: ', tens)
  console.log('twenties: ', twenties)
  return changeGiven
}





// You can leave this code as is, this will simply console.log() different text depending on if the test case returns true or false. Feel free to add additional test cases if you would like!

// Should return true
if (correctChangeFromSanta([5,5,5,10,20])) {
    console.log("Nice job Santa, everyone got their correct change!")
}else {
    console.log("Looks like you have some work to do Santa, and bring some money next time!")
}

// Should return false
if (correctChangeFromSanta([5,5,10,10,20])) {
    console.log("Nice job Santa, everyone got their correct change!")
}else {
    console.log("Looks like you have some work to do Santa, and bring some money next time!")
}