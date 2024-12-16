/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from './data.js'

const avatarSection = document.getElementById('feed-avatars')
const imageSection = document.getElementById('feed-images')
let imageIndex = 0

function setupPeople() {
  const people = feedData.map((person) => {
    return {url: person.avatarUrl, name: person.handle}
  })
  
  people.forEach(person => {
    const profilePic = document.createElement('img')
    profilePic.src = 'images/' + person.url
    profilePic.id = person.name
    profilePic.alt = person.name
    profilePic.classList.add('avatar')
    avatarSection.appendChild(profilePic)
  })
}

function rollImages() {
  const nextImage = getNextImage()
  if(nextImage.handle) {
    const currentPerson = nextImage.handle
    const currentPersonIcon = document.getElementById(currentPerson)
    clearHighlighting()
    currentPersonIcon.classList.add('highlight')

    const mainImageContainer = document.getElementById('feed-images')
    clearImages()
    const mainImage = document.createElement('img')
    mainImage.src = 'images/' + nextImage.imageUrl
    mainImage.alt = nextImage.alt
    mainImage.classList.add('feature-image')
    mainImageContainer.appendChild(mainImage)
    setTimeout(rollImages, 1500); 

  } else {
    clearHighlighting()
    clearImages()
    const mainImageContainer = document.getElementById('feed-images')
    mainImageContainer.textContent = "Refresh to load latest images"
  }
}

function clearHighlighting() {
  const peopleIcons = document.getElementsByClassName('avatar')
  for(const avatar of peopleIcons) {
    avatar.classList.remove('highlight')
  }
}

function clearImages(){
  const images = document.getElementById('feed-images')
  images.innerHTML = ''
}

function getNextImage() {
  const imageList = getImageArray()
  let currentImage = {}
  if(imageIndex < imageList.length) {
    currentImage = imageList[imageIndex]
    imageIndex++
  }
  return currentImage
}

function getImageArray() {
  const imageList = []
  feedData.forEach(person => {
    person.features.forEach(feature => {
      const fullFeature = {handle: person.handle, ...feature}
      imageList.push(fullFeature)
    })
  })
  return imageList
}

setupPeople()
rollImages()

