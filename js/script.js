"use strict";
/*** Variables ***/
// Section 4 - Battery
const animatedElement1 = document.querySelector("#countUpValue--1");
const animatedElement2 = document.querySelector("#countUpValue--2");

// Section 5 - House
let redDots = document.querySelectorAll('.red-dot__circle');

// Section 6 - Filters, Modal
let filtersButtons = document.querySelectorAll('.h6__06-filters__indicators__indicator__btn');
let filterImages = document.querySelectorAll('.h6__06-filters__images__machine');
const cloneFilterImagesContainingClassDisplayBlock = [];
const readAboutAllergensBtn = document.querySelector('.readMoreBtn');
const closeAllergensModalBtn = document.querySelector('.h6__06-filters__modal__close-btn');
const allergensModalOverlay = document.querySelector('.h6__06-filters__modal__overlay');
const allergensModalContent = document.querySelector('.h6__06-filters__modal__content');
let keyboardFocusableElements = document.querySelectorAll('a, button, input, textarea, slect, details, [tabindex]:not([tabindex="-1]');

// Section 8 - Mop
const mopCarpet = document.querySelector('.h6__08-mop__item--carpet');
const mopFloor = document.querySelector('.h6__08-mop__item--floor');

// Section 10 - Screen
let screenButtons = document.querySelectorAll('.h6__10-screen__button');
let screenVideos = document.querySelectorAll('.h6__10-screen__video');
let screenVideoLock = document.querySelector('.h6__10-screen__video--lock');

// Section 15 - Brushes
let brushItems = document.querySelectorAll('.h6__15-brushes__item');
const brushAdditionalText = document.querySelector('.h6__15-brushes__item__additional-text');


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


/*** Create video - Section 2 - Video ***/
createVideosSectionVideo();

function createVideosSectionVideo() {
  const lockMatchMedia = window.matchMedia("(max-width: 601px)");
  if (lockMatchMedia.matches) {
    addVideo('.h6__02__video-box', '../video/Roborock_H6_360p.mp4', 'h6__02__video h6__02__video--small', '100%', 'auto');
  } else {
    addVideo('.h6__02__video-box', '../video/Roborock_H6_720p.mp4', 'h6__02__video h6__02__video--large', '100%', 'auto');
  }
}

const createdVideoSectionVideo = document.querySelector('.h6__02__video');
createdVideoSectionVideo.autoplay = true;
createdVideoSectionVideo.loop = true;

// Adds a new video to the document under the first element matching the parentSelector
function addVideo(parentSelector, src, className, width, height) {
  const parent = document.querySelector(parentSelector);
  // Check that parent exists before proceeding
  if(parent) {
    // Create new video element
    const video = document.createElement('video');
    video.muted = true;   
    video.setAttribute('playsinline', "");
    video.setAttribute('class', className);    
    if(width) {
      video.setAttribute('width', width);
    }
    if(height) {
      video.setAttribute('height', height);
    }
    // Create a new source element and populate it with the src attribute
    const source = document.createElement('source');    
    source.setAttribute('src', src);    
    // Add source element to the video we're inserting and add the video element to the document element
    video.appendChild(source);    
    parent.appendChild(video);    
  }
}
/** END OF: Section 2 - Video **/


/*** Animate countup - Section 4 - Battery ***/
window.addEventListener('scroll', startCountupWhenInViewport);

function startCountupWhenInViewport() {
  if (isElementInViewport(animatedElement1)) {
    animateValue("countUpValue--1", 0, 90, 2000);
    window.removeEventListener('scroll', startCountupWhenInViewport);
  }
  if (isElementInViewport(animatedElement2)) {  
    animateValue("countUpValue--2", 0, 10, 1500);
    window.removeEventListener('scroll', startCountupWhenInViewport);
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
/** END OF: Animate countup **/


/*** Tooltip on btn press - Section 5 - House * **/
redDots = Array.from(redDots);
for (let i=0; i<redDots.length; i++) {
  redDots[i].addEventListener('click', function() {
    const index = redDots.indexOf(redDots[i]);
    const cloneRedDots = redDots.slice();
    cloneRedDots.splice(index, 1);
    cloneRedDots.forEach(el => el.nextElementSibling.classList.remove('opacity1'));
    this.nextElementSibling.classList.toggle('opacity1');
  })
}
/** END OF: Tooltip on btn press **/


/*** Section 6 - Filters, Modal  ***/
/* Switch images, Allergens Modal */

/// Switch images
filterImages = Array.from(filterImages);
const baseFilterImage = filterImages[0];
filterImages.shift();
filterImages.reverse();
filtersButtons = Array.from(filtersButtons);

filterImages.forEach(el => el.style.display = "none");

for (let i=0; i<filtersButtons.length; i++) {
  filtersButtons[i].addEventListener('click', function() { 
    const index = filtersButtons.indexOf(filtersButtons[i]);
    const cloneFiltersButtons = filtersButtons.slice(0);
    cloneFiltersButtons.splice(index, 1);
    const cloneFilterImages = filterImages.slice(0);
    cloneFilterImages.splice(index, 1);

    // handle buttons' styles
    cloneFiltersButtons.forEach(el => el.firstElementChild.classList.remove('hoveredDigit'));
    cloneFiltersButtons.forEach(el => el.lastElementChild.lastElementChild.classList.remove('displayInline')); //contract button's inner text
    this.firstElementChild.classList.toggle('hoveredDigit');
    this.lastElementChild.lastElementChild.classList.toggle('displayInline'); //expand button's inner text

    // chceck if any button is active
    for (let i=0; i<cloneFilterImages.length; i++) {
      if (cloneFilterImages[i].classList.contains('displayBlock')) {
        cloneFilterImagesContainingClassDisplayBlock.push(cloneFilterImages[i]);
      }
    }

    // if any button is active, then hide base image
    if (cloneFilterImagesContainingClassDisplayBlock.length > 0) {
      baseFilterImage.style.display = "none";
      }

    // handle images' styles
    cloneFilterImages.forEach(el => el.classList.remove('displayBlock'));
    filterImages[i].classList.toggle('displayBlock');
    if (!filterImages[i].classList.contains('displayBlock')) {
      baseFilterImage.style.display = "block";
    }
  })
}


/// Allergens Modal
// disable focus on all elements besides modal elements when modal is open
keyboardFocusableElements = Array.from(keyboardFocusableElements);
let noModalKeyboardFocusableElements = keyboardFocusableElements.slice(0);

noModalKeyboardFocusableElements = noModalKeyboardFocusableElements.filter(function(item) {
  return item !== closeAllergensModalBtn;
})
noModalKeyboardFocusableElements = noModalKeyboardFocusableElements.filter(function(item) {
  return item !== allergensModalContent;
})

// open/close modal events
readAboutAllergensBtn.addEventListener('click', function() {
  allergensModalOverlay.classList.add('displayBlock');
  document.body.classList.add('overflowHidden');
  document.body.addEventListener('keydown', closeAllergensModalOnKeypress);
  noModalKeyboardFocusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
})

closeAllergensModalBtn.addEventListener('click', function() {
  closeAllergensModal();
})

allergensModalOverlay.addEventListener('click', closeAllergensModal);
allergensModalContent.addEventListener('click', allergensModalInsideContentClick);

function closeAllergensModalOnKeypress(e) {
  if (e.keyCode === 27) {
    event.preventDefault();
    closeAllergensModal();
  }
}

function closeAllergensModal() {
  allergensModalOverlay.classList.remove('displayBlock');
  document.body.classList.remove('overflowHidden');
  noModalKeyboardFocusableElements.forEach(el => el.setAttribute('tabindex', '0'));
}

function allergensModalInsideContentClick(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}
/** END OF: Section 6 - Filters, Modal **/


/*** Transform divs on hover - Section 8 - Mop ***/
const checkIfScreenOver801pxWide = debounce(function() {
  const mopMatchMedia = window.matchMedia("(min-width: 801px)");
  
  if (mopMatchMedia.matches) {
    mopFloor.classList.add('mop-floor');
    mopFloor.addEventListener('mouseover', hideMopCarpet);
    mopFloor.addEventListener('mouseout', hideMopFloor);
    mopFloor.addEventListener('focus', hideMopCarpet);
    mopFloor.addEventListener('blur', hideMopFloor);
  } else {
    mopCarpet.classList.remove('mop-carpet');
    mopFloor.classList.remove('mop-floor');
    mopFloor.removeEventListener('mouseover', hideMopCarpet);
    mopFloor.removeEventListener('mouseout', hideMopFloor);
    mopFloor.removeEventListener('focus', hideMopCarpet);
    mopFloor.removeEventListener('blur', hideMopFloor);
  }
}, 100);

window.addEventListener('load', checkIfScreenOver801pxWide);
window.addEventListener('resize', checkIfScreenOver801pxWide);

function hideMopCarpet() {
  mopCarpet.classList.add('mop-carpet');
  mopFloor.classList.remove('mop-floor');
}

function hideMopFloor() {
  mopCarpet.classList.remove('mop-carpet');
  mopFloor.classList.add('mop-floor');
}



/** END OF: Section 8 - Mop **/


/*** Section 10 - Screen  ***/
// Play video once on load to make it appear on iPhones
setTimeout(() => {
  screenVideoLock.play();
}, 3000);

screenButtons = Array.from(screenButtons);
screenVideos = Array.from(screenVideos);

screenButtons[0].classList.add('screenButtonPressed');
screenVideos[0].classList.add('displayBlock');

for (let i=0; i<screenButtons.length; i++) {
  screenButtons[i].addEventListener('click', function() {
    const index = screenButtons.indexOf(screenButtons[i]);
    const clonedScreenButtons = screenButtons.slice(0);
    clonedScreenButtons.splice(index, 1);
    clonedScreenButtons.forEach(el => el.classList.remove('screenButtonPressed'));
    this.classList.add('screenButtonPressed');

    const clonedScreenVideos = screenVideos.slice(0);
    clonedScreenVideos.splice(index, 1);
    clonedScreenVideos.forEach(el => el.classList.remove('displayBlock'));
    screenVideos[i].classList.add('displayBlock');
    screenVideos[i].play();
  })
}
/** END OF: Section 10 - Screen **/


/*** Section 11 - Lock ***/
/* Create and append videos */
/* Replace videos if window resize pass the screen width breakpoint value */
/* Play videos */

/// Create and append videos
createVideosSectionLock();

// You can find "addVideo" function code in Section 02 - Video
function createVideosSectionLock() {
  const lockMatchMedia = window.matchMedia("(max-width: 751px)");
  if (lockMatchMedia.matches) {
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-m.mp4', 'h6__11-lock__video h6__11-lock__video--lock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-m.mp4', 'h6__11-lock__video h6__11-lock__video--unlock hideVideoSectionLock', '100%', 'auto');
  } else {
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--lock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--unlock hideVideoSectionLock', '100%', 'auto');
  }
}

/// Replace videos if window resize pass the screen width breakpoint value
let lockCurrentScreenWidth = window.innerWidth;
const breakPointForSectionLock = 751; // screen width: 751px 

const appendHiResVideos = debounce(function() {
  const lockNewScreenWidth = window.innerWidth;
  if (lockNewScreenWidth > breakPointForSectionLock) {
    removeLockUnlockVideos();
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--lock hideVideoSectionLock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--unlock', '100%', 'auto');
  }
  lockCurrentScreenWidth = window.innerWidth;
  replaceLockUnlockVideos();
}, 250);

const appendLowResVideos = debounce(function() {
  const lockNewScreenWidth = window.innerWidth;
  if (lockNewScreenWidth <= breakPointForSectionLock) {
    removeLockUnlockVideos();
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-m.mp4', 'h6__11-lock__video h6__11-lock__video--lock hideVideoSectionLock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-m.mp4', 'h6__11-lock__video h6__11-lock__video--unlock', '100%', 'auto');
  }
  lockCurrentScreenWidth = window.innerWidth;
  replaceLockUnlockVideos();
}, 250);

function replaceLockUnlockVideos() {
  if (lockCurrentScreenWidth <= breakPointForSectionLock) {
    window.addEventListener('resize', appendHiResVideos);
  } else if (lockCurrentScreenWidth > breakPointForSectionLock) {
    window.addEventListener('resize', appendLowResVideos);
  }
}
replaceLockUnlockVideos();

function removeLockUnlockVideos() {
  const parent = document.querySelector('.h6__11-lock');
  const videoToRemove1 = document.querySelector('.h6__11-lock__video--lock');
  const videoToRemove2 = document.querySelector('.h6__11-lock__video--unlock');
  parent.removeChild(videoToRemove1);
  parent.removeChild(videoToRemove2);
}

/// Play videos
let lockVideoLock;
let lockVideoUnlock;
const playLockVideoLockBtn = document.querySelector('.h6__11-lock__buttons__button--lock');
const playLockVideoUnlockBtn = document.querySelector('.h6__11-lock__buttons__button--unlock');

playLockVideoLockBtn.classList.add('focusButtonSectionLock');
playLockVideoLockBtn.addEventListener('click', playLockVideoLock);
playLockVideoUnlockBtn.addEventListener('click', playLockVideoUnlock);

// Play video once on load to make it appear on iPhones
setTimeout(() => {
  playLockVideoLock();
}, 3000);

function playLockVideoLock() {
  getVideosSectionLock();
  playLockVideoUnlockBtn.classList.remove('focusButtonSectionLock');
  if (!playLockVideoLockBtn.classList.contains('focusButtonSectionLock')) {
    this.classList.add('focusButtonSectionLock');
  }
  lockVideoUnlock.classList.add('hideVideoSectionLock');
  lockVideoLock.classList.remove('hideVideoSectionLock');
  lockVideoLock.play();
}

function playLockVideoUnlock() {
  getVideosSectionLock();
  playLockVideoLockBtn.classList.remove('focusButtonSectionLock');
  if (!playLockVideoUnlockBtn.classList.contains('focusButtonSectionLock')) {
    this.classList.add('focusButtonSectionLock');
  }
  lockVideoLock.classList.add('hideVideoSectionLock');
  lockVideoUnlock.classList.remove('hideVideoSectionLock');
  lockVideoUnlock.play();
}

function getVideosSectionLock() {
  lockVideoLock = document.querySelector('.h6__11-lock__video--lock'); 
  lockVideoUnlock = document.querySelector('.h6__11-lock__video--unlock');
}
/** END OF: Section 11 - Lock **/


/*** Section 15 - Brushes ***/
brushItems = Array.from(brushItems);
const brushBreakPoint = 720;
let brushCurrentScreenWidth = window.innerWidth;

window.addEventListener('load', function() {
  if (brushCurrentScreenWidth <= brushBreakPoint) {
    brushMobileEvents();
  }
});

function brushMobileEvents() {
  for (let i=0; i<brushItems.length; i++) {
    const index = brushItems.indexOf(brushItems[i]);
    const clonedBrushItems = brushItems.slice(0);
    clonedBrushItems.splice(index, 1);
  
    brushItems[i].addEventListener('click', function() {
      clonedBrushItems.forEach(el => el.classList.remove('brushItemOpenHeight'));
      clonedBrushItems.forEach(el => el.lastElementChild.classList.remove('brushItemHideOverlay'));
      clonedBrushItems.forEach(el => el.firstElementChild.classList.remove('brushItemOpenText'));
      this.classList.toggle('brushItemOpenHeight');
      this.lastElementChild.classList.toggle('brushItemHideOverlay');
      this.firstElementChild.classList.toggle('brushItemOpenText');
      if (this.contains(brushAdditionalText)) {
        brushAdditionalText.classList.toggle('brushItemOpenText');
      } else {
        brushAdditionalText.classList.remove('brushItemOpenText');
      }
    })
  }
}

// When resizing window from over brushBreakPoint width to under brushBreakPoint width
if (brushCurrentScreenWidth > brushBreakPoint) {
  window.addEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
}

function whenResizedToMobileLoadMobileBrushEvents() {
  if (window.innerWidth <= brushBreakPoint) {
    brushMobileEvents();
    window.removeEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
  }
}

// When resizing window from under brushBreakPoint width to over brushBreakPoint width
const whenResizedToDesktop = debounce(function() {
  if (window.innerWidth > brushBreakPoint) {
    closeBrushAccordion();
    window.removeEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
  }
}, 250);

function closeBrushAccordion() {
  brushItems.forEach(el => el.classList.remove('brushItemOpenHeight'));
  brushItems.forEach(el => el.lastElementChild.classList.remove('brushItemHideOverlay'));
  brushItems.forEach(el => el.firstElementChild.classList.remove('brushItemOpenText'));
  brushAdditionalText.classList.remove('brushItemOpenText');
}

window.addEventListener('resize', whenResizedToDesktop);
/** END OF: Section 15 - Brushes **/