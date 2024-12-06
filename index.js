/* 
This Christmas, you’ve been tasked with running an anagram quiz at 
the family gathering.

You have been given a list of anagrams, but you suspect that some 
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would 
be considered a valid anagram of "Bethlehem".
*/ 

let anagrams = [
  ["Can Assault", "Santa Claus"],
  ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
  ["Frosty The Snowman", "Honesty Warms Front"],
  ["Drastic Charms", "Christmas Cards"],
  ["Congress Liar", "Carol Singers"],
  ["The Tin Glints", "Silent Night"],
  ["Be The Helm", "Betlehem"],
  ["Is Car Thieves", "Christmas Eve"]
];

function findAnagrams(array){
  console.log('array: ', array)
  const newArray = array.map((pair) => {
    const firstWord = pair[0].toLowerCase()
    const secondWord = pair[1].toLowerCase()
    if(compareWords(firstWord, secondWord)) {
      return pair
    }
  })
  const fixedArray = newArray.filter((item) => item != undefined)
  return fixedArray
}

function compareWords(first, second) {
  const letters1 = first.split('')
  const letters2 = second.split('')
  const nospace1 = letters1.filter((letter) => letter != ' ').sort()
  const nospace2 = letters2.filter((letter) => letter != ' ').sort()

  if(nospace1.length!=nospace2.length) {
    return false
  } else {
    let match = true
    for (let i = 0; i < nospace1.length; i++) {
      if(nospace1[i]!=nospace2[i]) {
        match = false
      }
    }
    return match
  }

}

console.log(findAnagrams(anagrams))

