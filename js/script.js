"use strict";
/*** Variables ***/
// Section 1 - Banner Video
const videoModalSectionBanner = document.querySelector('.h6__01-banner__modal');
const openVideoModalBtnsSectionBanner = document.querySelectorAll('.h6__01-open-video-modal-btn');
const closeVideoModalBtnSectionBanner = document.querySelector('.h6__01-banner__modal__close-btn');
const videoBoxSectionBanner = document.querySelector('.h6__01-banner__modal__video-box');
let keyboardFocusableElements = document.querySelectorAll('a, button, video, input, textarea, slect, details, [tabindex]:not([tabindex="-1]');

// Section 4 - Battery
const animatedNumber1 = document.querySelector("#countUpValue--1");
const animatedNumber2 = document.querySelector("#countUpValue--2");

// Section 5 - House
let redDots = document.querySelectorAll('.red-dot__circle');

// Section 6 - Filters, Modal
let filterButtons = document.querySelectorAll('.h6__06-filters__indicators__indicator__btn');
let filterImages = document.querySelectorAll('.h6__06-filters__images__machine');
const cloneFilterImagesContainingClassDisplayBlock = [];
const readAboutAllergensBtn = document.querySelector('.readMoreBtn');
const closeAllergensModalBtn = document.querySelector('.h6__06-filters__modal__close-btn');
const allergensModalOverlay = document.querySelector('.h6__06-filters__modal__overlay');
const allergensModalContent = document.querySelector('.h6__06-filters__modal__content');

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


/** Universal functions **/
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

// Adds a new video to the document under the first element matching the parentSelector
function addVideo(parentSelector, src, className, width, height) {
  const parent = document.querySelector(parentSelector);
  // Check that parent exists before proceeding
  if(parent) {
    // Create new video element
    const video = document.createElement('video');
    video.autoplay = true;
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


/*** Create video - Section 1 - Banner Video ***/
openVideoModalBtnsSectionBanner.forEach(el => el.addEventListener('click', openVideoModalAndCreateVideoSectionBanner));
closeVideoModalBtnSectionBanner.addEventListener('click', () => {
  closeModalSectionBanner();
  deleteVideoSectionBanner();
})

function openVideoModalAndCreateVideoSectionBanner() {
  videoModalSectionBanner.classList.remove('displayNone');
  document.body.classList.add('overflowHidden');
  createBannerVideo();
  videoModalSectionBanner.addEventListener('click', () => {
    closeModalSectionBanner();
    deleteVideoSectionBanner();
  })
  document.body.addEventListener('keydown', onKeyPressCloseVideoModalAndDeleteVideoSectionBanner);
  videoBoxSectionBanner.addEventListener('click', insideVideoClickBannerSectionModal);
  openVideoModalBtnsSectionBanner.forEach(el => el.removeEventListener('click', openVideoModalAndCreateVideoSectionBanner));
  noModalKeyboardFocusableElementsSectionBanner.forEach(el => el.setAttribute('tabindex', '-1'));
}

function createBannerVideo() {
  const videoMatchMediaSectionBanner = window.matchMedia("(max-width: 601px)");
  if (videoMatchMediaSectionBanner.matches) {
    addVideo('.h6__01-banner__modal__video-box', '../video/Roborock_H6_360p.mp4', 'h6__01-banner__modal__video-box__video', '100%', 'auto');
  } else {
    addVideo('.h6__01-banner__modal__video-box', '../video/Roborock_H6_720p.mp4', 'h6__01-banner__modal__video-box__video', '100%', 'auto');
  }
  const videoSectionBanner = document.querySelector('.h6__01-banner__modal__video-box__video');
  videoSectionBanner.controls = true;
  noModalKeyboardFocusableElementsSectionBanner = noModalKeyboardFocusableElementsSectionBanner.filter(function(item) {
    return item !== videoSectionBanner;
  })
}

function closeModalSectionBanner() {
  videoModalSectionBanner.classList.add('displayNone');
  document.body.classList.remove('overflowHidden');
  openVideoModalBtnsSectionBanner.forEach(el => el.addEventListener('click', openVideoModalAndCreateVideoSectionBanner));
  noModalKeyboardFocusableElementsSectionBanner.forEach(el => el.setAttribute('tabindex', '0'));
}

function deleteVideoSectionBanner() {
  videoBoxSectionBanner.removeChild(videoBoxSectionBanner.firstChild);
}

function onKeyPressCloseVideoModalAndDeleteVideoSectionBanner(e) {
  if (e.keyCode === 27) {
    event.preventDefault();
    closeModalSectionBanner();
    deleteVideoSectionBanner();
    openVideoModalBtnsSectionBanner.forEach(el => el.addEventListener('click', openVideoModalAndCreateVideoSectionBanner));
  }
}

function insideVideoClickBannerSectionModal(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}

keyboardFocusableElements = Array.from(keyboardFocusableElements);
let noModalKeyboardFocusableElementsSectionBanner = keyboardFocusableElements.slice(0);
noModalKeyboardFocusableElementsSectionBanner = noModalKeyboardFocusableElementsSectionBanner.filter(function(item) {
  return item !== closeVideoModalBtnSectionBanner;
})
/** END OF: Section 1 - Banner Video **/


/*** Animate countup - Section 4 - Battery ***/
window.addEventListener('scroll', startCountupWhenInViewport);

function startCountupWhenInViewport() {
  if (isElementInViewport(animatedNumber1) || isElementInViewport(animatedNumber2)) {
    animateValue("countUpValue--1", 0, 90, 2000);
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
    const cloneRedDots = redDots.slice(0);
    cloneRedDots.splice(index, 1);
    cloneRedDots.forEach(el => el.nextElementSibling.classList.remove('opacity1'));
    this.nextElementSibling.classList.toggle('opacity1');
    cloneRedDots.forEach(el => el.classList.remove('scaleUp-dot'));
    this.classList.toggle('scaleUp-dot');
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
filterButtons = Array.from(filterButtons);

filterImages.forEach(el => el.style.display = "none");

for (let i=0; i<filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', function() { 
    const index = filterButtons.indexOf(filterButtons[i]);
    const cloneFilterButtons = filterButtons.slice(0);
    cloneFilterButtons.splice(index, 1);
    const cloneFilterImages = filterImages.slice(0);
    cloneFilterImages.splice(index, 1);

    // handle buttons' styles
    cloneFilterButtons.forEach(el => el.firstElementChild.classList.remove('hoveredDigit'));
    cloneFilterButtons.forEach(el => el.lastElementChild.lastElementChild.classList.remove('displayInline')); //contract button's inner text
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
let filtersNoModalKeyboardFocusableElements = keyboardFocusableElements.slice(0);
filtersNoModalKeyboardFocusableElements = filtersNoModalKeyboardFocusableElements.filter(function(item) {
  return item !== closeAllergensModalBtn;
})
filtersNoModalKeyboardFocusableElements = filtersNoModalKeyboardFocusableElements.filter(function(item) {
  return item !== allergensModalContent;
})

// open/close modal events
readAboutAllergensBtn.addEventListener('click', () => {
  allergensModalOverlay.classList.add('displayBlock');
  document.body.classList.add('overflowHidden');
  document.body.addEventListener('keydown', closeAllergensModalOnKeypress);
  filtersNoModalKeyboardFocusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
})

closeAllergensModalBtn.addEventListener('click', () => {
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
  filtersNoModalKeyboardFocusableElements.forEach(el => el.setAttribute('tabindex', '0'));
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
let currentScreenWidthSectionLock = window.innerWidth;
const breakPointForSectionLock = 751; // screen width: 751px 

const appendHiResVideos = debounce(function() {
  const newScreenWidthSectionLock = window.innerWidth;
  if (newScreenWidthSectionLock > breakPointForSectionLock) {
    removeLockUnlockVideos();
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--lock hideVideoSectionLock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--unlock', '100%', 'auto');
  }
  currentScreenWidthSectionLock = window.innerWidth;
  replaceLockUnlockVideos();
}, 250);

const appendLowResVideos = debounce(function() {
  const newScreenWidthSectionLock = window.innerWidth;
  if (newScreenWidthSectionLock <= breakPointForSectionLock) {
    removeLockUnlockVideos();
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-m.mp4', 'h6__11-lock__video h6__11-lock__video--lock hideVideoSectionLock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-m.mp4', 'h6__11-lock__video h6__11-lock__video--unlock', '100%', 'auto');
  }
  currentScreenWidthSectionLock = window.innerWidth;
  replaceLockUnlockVideos();
}, 250);

function replaceLockUnlockVideos() {
  if (currentScreenWidthSectionLock <= breakPointForSectionLock) {
    window.addEventListener('resize', appendHiResVideos);
  } else if (currentScreenWidthSectionLock > breakPointForSectionLock) {
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
let lockVideo;
let unlockVideo;
const playLockVideoBtn = document.querySelector('.h6__11-lock__buttons__button--lock');
const playUnlockVideoBtn = document.querySelector('.h6__11-lock__buttons__button--unlock');

playLockVideoBtn.classList.add('focusButtonSectionLock');
playLockVideoBtn.addEventListener('click', playLockVideoLock);
playUnlockVideoBtn.addEventListener('click', playLockVideoUnlock);

// Play video once on load to make it appear on iPhones
setTimeout(() => {
  playLockVideoLock();
}, 3000);

function playLockVideoLock() {
  getVideosSectionLock();
  playUnlockVideoBtn.classList.remove('focusButtonSectionLock');
  if (!playLockVideoBtn.classList.contains('focusButtonSectionLock')) {
    this.classList.add('focusButtonSectionLock');
  }
  unlockVideo.classList.add('hideVideoSectionLock');
  lockVideo.classList.remove('hideVideoSectionLock');
  lockVideo.play();
}

function playLockVideoUnlock() {
  getVideosSectionLock();
  playLockVideoBtn.classList.remove('focusButtonSectionLock');
  if (!playUnlockVideoBtn.classList.contains('focusButtonSectionLock')) {
    this.classList.add('focusButtonSectionLock');
  }
  lockVideo.classList.add('hideVideoSectionLock');
  unlockVideo.classList.remove('hideVideoSectionLock');
  unlockVideo.play();
}

function getVideosSectionLock() {
  lockVideo = document.querySelector('.h6__11-lock__video--lock'); 
  unlockVideo = document.querySelector('.h6__11-lock__video--unlock');
}
/** END OF: Section 11 - Lock **/


/*** Section 15 - Brushes ***/
brushItems = Array.from(brushItems);
const brushBreakPoint = 720;
let currentScreenWidthSectionBrush = window.innerWidth;

window.addEventListener('load', function() {
  if (currentScreenWidthSectionBrush <= brushBreakPoint) {
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

// When resizing window from over-brushBreakPoint width to under-brushBreakPoint width
if (currentScreenWidthSectionBrush > brushBreakPoint) {
  window.addEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
}

function whenResizedToMobileLoadMobileBrushEvents() {
  if (window.innerWidth <= brushBreakPoint) {
    brushMobileEvents();
    window.removeEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
  }
}

// When resizing window from under-brushBreakPoint width to over-brushBreakPoint width
const whenResizedToDesktopSectionBrush = debounce(function() {
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

window.addEventListener('resize', whenResizedToDesktopSectionBrush);
/** END OF: Section 15 - Brushes **/