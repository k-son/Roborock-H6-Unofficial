"use strict";
/*** Variables ***/
// Section 4 - Battery

var animatedElement1 = document.querySelector("#countUpValue--1");
var animatedElement2 = document.querySelector("#countUpValue--2"); // Section 5 - House

var redDots = document.querySelectorAll('.red-dot__circle'); // Section 6 - Filters, Modal

var filtersButtons = document.querySelectorAll('.h6__06-filters__indicators__indicator__btn');
var filterImages = document.querySelectorAll('.h6__06-filters__images__machine');
var cloneFilterImagesContainingClassDisplayBlock = [];
var readAboutAllergensBtn = document.querySelector('.readMoreBtn');
var closeAllergensModalBtn = document.querySelector('.h6__06-filters__modal__close-btn');
var allergensModalOverlay = document.querySelector('.h6__06-filters__modal__overlay');
var allergensModalContent = document.querySelector('.h6__06-filters__modal__content');
var keyboardFocusableElements = document.querySelectorAll('a, button, input, textarea, slect, details, [tabindex]:not([tabindex="-1]'); // Section 8 - Mop

var mopCarpet = document.querySelector('.h6__08-mop__item--carpet');
var mopFloor = document.querySelector('.h6__08-mop__item--floor'); // Section 10 - Screen

var screenButtons = document.querySelectorAll('.h6__10-screen__button');
var screenVideos = document.querySelectorAll('.h6__10-screen__video');
var screenVideoLock = document.querySelector('.h6__10-screen__video--lock'); // Section 15 - Brushes

var brushItems = document.querySelectorAll('.h6__15-brushes__item');
var brushAdditionalText = document.querySelector('.h6__15-brushes__item__additional-text');

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;
/*** Create video - Section 2 - Video ***/

createVideosSectionVideo();

function createVideosSectionVideo() {
  var lockMatchMedia = window.matchMedia("(max-width: 601px)");

  if (lockMatchMedia.matches) {
    addVideo('.h6__02__video-box', '../video/Roborock_H6_360p.mp4', 'h6__02__video h6__02__video--small', '100%', 'auto');
  } else {
    addVideo('.h6__02__video-box', '../video/Roborock_H6_720p.mp4', 'h6__02__video h6__02__video--large', '100%', 'auto');
  }
}

var createdVideoSectionVideo = document.querySelector('.h6__02__video');
createdVideoSectionVideo.autoplay = true;
createdVideoSectionVideo.loop = true; // Adds a new video to the document under the first element matching the parentSelector

function addVideo(parentSelector, src, className, width, height) {
  var parent = document.querySelector(parentSelector); // Check that parent exists before proceeding

  if (parent) {
    // Create new video element
    var video = document.createElement('video');
    video.muted = true;
    video.setAttribute('playsinline', "");
    video.setAttribute('class', className);

    if (width) {
      video.setAttribute('width', width);
    }

    if (height) {
      video.setAttribute('height', height);
    } // Create a new source element and populate it with the src attribute


    var source = document.createElement('source');
    source.setAttribute('src', src); // Add source element to the video we're inserting and add the video element to the document element

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
  var rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom >= 0 || rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight) || rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

function animateValue(id, start, end, duration) {
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  var timer = setInterval(function () {
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

var _loop = function _loop(i) {
  redDots[i].addEventListener('click', function () {
    var index = redDots.indexOf(redDots[i]);
    var cloneRedDots = redDots.slice();
    cloneRedDots.splice(index, 1);
    cloneRedDots.forEach(function (el) {
      return el.nextElementSibling.classList.remove('opacity1');
    });
    this.nextElementSibling.classList.toggle('opacity1');
  });
};

for (var i = 0; i < redDots.length; i++) {
  _loop(i);
}
/** END OF: Tooltip on btn press **/

/*** Section 6 - Filters, Modal  ***/

/* Switch images, Allergens Modal */
/// Switch images


filterImages = Array.from(filterImages);
var baseFilterImage = filterImages[0];
filterImages.shift();
filterImages.reverse();
filtersButtons = Array.from(filtersButtons);
filterImages.forEach(function (el) {
  return el.style.display = "none";
});

var _loop2 = function _loop2(_i) {
  filtersButtons[_i].addEventListener('click', function () {
    var index = filtersButtons.indexOf(filtersButtons[_i]);
    var cloneFiltersButtons = filtersButtons.slice(0);
    cloneFiltersButtons.splice(index, 1);
    var cloneFilterImages = filterImages.slice(0);
    cloneFilterImages.splice(index, 1); // handle buttons' styles

    cloneFiltersButtons.forEach(function (el) {
      return el.firstElementChild.classList.remove('hoveredDigit');
    });
    cloneFiltersButtons.forEach(function (el) {
      return el.lastElementChild.lastElementChild.classList.remove('displayInline');
    }); //contract button's inner text

    this.firstElementChild.classList.toggle('hoveredDigit');
    this.lastElementChild.lastElementChild.classList.toggle('displayInline'); //expand button's inner text
    // chceck if any button is active

    for (var _i4 = 0; _i4 < cloneFilterImages.length; _i4++) {
      if (cloneFilterImages[_i4].classList.contains('displayBlock')) {
        cloneFilterImagesContainingClassDisplayBlock.push(cloneFilterImages[_i4]);
      }
    } // if any button is active, then hide base image


    if (cloneFilterImagesContainingClassDisplayBlock.length > 0) {
      baseFilterImage.style.display = "none";
    } // handle images' styles


    cloneFilterImages.forEach(function (el) {
      return el.classList.remove('displayBlock');
    });

    filterImages[_i].classList.toggle('displayBlock');

    if (!filterImages[_i].classList.contains('displayBlock')) {
      baseFilterImage.style.display = "block";
    }
  });
};

for (var _i = 0; _i < filtersButtons.length; _i++) {
  _loop2(_i);
} /// Allergens Modal
// disable focus on all elements besides modal elements when modal is open


keyboardFocusableElements = Array.from(keyboardFocusableElements);
var noModalKeyboardFocusableElements = keyboardFocusableElements.slice(0);
noModalKeyboardFocusableElements = noModalKeyboardFocusableElements.filter(function (item) {
  return item !== closeAllergensModalBtn;
});
noModalKeyboardFocusableElements = noModalKeyboardFocusableElements.filter(function (item) {
  return item !== allergensModalContent;
}); // open/close modal events

readAboutAllergensBtn.addEventListener('click', function () {
  allergensModalOverlay.classList.add('displayBlock');
  document.body.classList.add('overflowHidden');
  document.body.addEventListener('keydown', closeAllergensModalOnKeypress);
  noModalKeyboardFocusableElements.forEach(function (el) {
    return el.setAttribute('tabindex', '-1');
  });
});
closeAllergensModalBtn.addEventListener('click', function () {
  closeAllergensModal();
});
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
  noModalKeyboardFocusableElements.forEach(function (el) {
    return el.setAttribute('tabindex', '0');
  });
}

function allergensModalInsideContentClick(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}
/** END OF: Section 6 - Filters, Modal **/

/*** Transform divs on hover - Section 8 - Mop ***/


var checkIfScreenOver801pxWide = debounce(function () {
  var mopMatchMedia = window.matchMedia("(min-width: 801px)");

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


setTimeout(function () {
  screenVideoLock.play();
}, 3000);
screenButtons = Array.from(screenButtons);
screenVideos = Array.from(screenVideos);
screenButtons[0].classList.add('screenButtonPressed');
screenVideos[0].classList.add('displayBlock');

var _loop3 = function _loop3(_i2) {
  screenButtons[_i2].addEventListener('click', function () {
    var index = screenButtons.indexOf(screenButtons[_i2]);
    var clonedScreenButtons = screenButtons.slice(0);
    clonedScreenButtons.splice(index, 1);
    clonedScreenButtons.forEach(function (el) {
      return el.classList.remove('screenButtonPressed');
    });
    this.classList.add('screenButtonPressed');
    var clonedScreenVideos = screenVideos.slice(0);
    clonedScreenVideos.splice(index, 1);
    clonedScreenVideos.forEach(function (el) {
      return el.classList.remove('displayBlock');
    });

    screenVideos[_i2].classList.add('displayBlock');

    screenVideos[_i2].play();
  });
};

for (var _i2 = 0; _i2 < screenButtons.length; _i2++) {
  _loop3(_i2);
}
/** END OF: Section 10 - Screen **/

/*** Section 11 - Lock ***/

/* Create and append videos */

/* Replace videos if window resize pass the screen width breakpoint value */

/* Play videos */
/// Create and append videos


createVideosSectionLock(); // You can find "addVideo" function code in Section 02 - Video

function createVideosSectionLock() {
  var lockMatchMedia = window.matchMedia("(max-width: 751px)");

  if (lockMatchMedia.matches) {
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-m.mp4', 'h6__11-lock__video h6__11-lock__video--lock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-m.mp4', 'h6__11-lock__video h6__11-lock__video--unlock hideVideoSectionLock', '100%', 'auto');
  } else {
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--lock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--unlock hideVideoSectionLock', '100%', 'auto');
  }
} /// Replace videos if window resize pass the screen width breakpoint value


var lockCurrentScreenWidth = window.innerWidth;
var breakPointForSectionLock = 751; // screen width: 751px 

var appendHiResVideos = debounce(function () {
  var lockNewScreenWidth = window.innerWidth;

  if (lockNewScreenWidth > breakPointForSectionLock) {
    removeLockUnlockVideos();
    addVideo('.h6__11-lock', '../video/heros-H6-video-lock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--lock hideVideoSectionLock', '100%', 'auto');
    addVideo('.h6__11-lock', '../video/heros-H6-video-unlock-pc.mp4', 'h6__11-lock__video h6__11-lock__video--unlock', '100%', 'auto');
  }

  lockCurrentScreenWidth = window.innerWidth;
  replaceLockUnlockVideos();
}, 250);
var appendLowResVideos = debounce(function () {
  var lockNewScreenWidth = window.innerWidth;

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
  var parent = document.querySelector('.h6__11-lock');
  var videoToRemove1 = document.querySelector('.h6__11-lock__video--lock');
  var videoToRemove2 = document.querySelector('.h6__11-lock__video--unlock');
  parent.removeChild(videoToRemove1);
  parent.removeChild(videoToRemove2);
} /// Play videos


var lockVideoLock;
var lockVideoUnlock;
var playLockVideoLockBtn = document.querySelector('.h6__11-lock__buttons__button--lock');
var playLockVideoUnlockBtn = document.querySelector('.h6__11-lock__buttons__button--unlock');
playLockVideoLockBtn.classList.add('focusButtonSectionLock');
playLockVideoLockBtn.addEventListener('click', playLockVideoLock);
playLockVideoUnlockBtn.addEventListener('click', playLockVideoUnlock); // Play video once on load to make it appear on iPhones

setTimeout(function () {
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
var brushBreakPoint = 720;
var brushCurrentScreenWidth = window.innerWidth;
window.addEventListener('load', function () {
  if (brushCurrentScreenWidth <= brushBreakPoint) {
    brushMobileEvents();
  }
});

function brushMobileEvents() {
  var _loop4 = function _loop4(_i3) {
    var index = brushItems.indexOf(brushItems[_i3]);
    var clonedBrushItems = brushItems.slice(0);
    clonedBrushItems.splice(index, 1);

    brushItems[_i3].addEventListener('click', function () {
      clonedBrushItems.forEach(function (el) {
        return el.classList.remove('brushItemOpenHeight');
      });
      clonedBrushItems.forEach(function (el) {
        return el.lastElementChild.classList.remove('brushItemHideOverlay');
      });
      clonedBrushItems.forEach(function (el) {
        return el.firstElementChild.classList.remove('brushItemOpenText');
      });
      this.classList.toggle('brushItemOpenHeight');
      this.lastElementChild.classList.toggle('brushItemHideOverlay');
      this.firstElementChild.classList.toggle('brushItemOpenText');

      if (this.contains(brushAdditionalText)) {
        brushAdditionalText.classList.toggle('brushItemOpenText');
      } else {
        brushAdditionalText.classList.remove('brushItemOpenText');
      }
    });
  };

  for (var _i3 = 0; _i3 < brushItems.length; _i3++) {
    _loop4(_i3);
  }
} // When resizing window from over brushBreakPoint width to under brushBreakPoint width


if (brushCurrentScreenWidth > brushBreakPoint) {
  window.addEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
}

function whenResizedToMobileLoadMobileBrushEvents() {
  if (window.innerWidth <= brushBreakPoint) {
    brushMobileEvents();
    window.removeEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
  }
} // When resizing window from under brushBreakPoint width to over brushBreakPoint width


var whenResizedToDesktop = debounce(function () {
  if (window.innerWidth > brushBreakPoint) {
    closeBrushAccordion();
    window.removeEventListener('resize', whenResizedToMobileLoadMobileBrushEvents);
  }
}, 250);

function closeBrushAccordion() {
  brushItems.forEach(function (el) {
    return el.classList.remove('brushItemOpenHeight');
  });
  brushItems.forEach(function (el) {
    return el.lastElementChild.classList.remove('brushItemHideOverlay');
  });
  brushItems.forEach(function (el) {
    return el.firstElementChild.classList.remove('brushItemOpenText');
  });
  brushAdditionalText.classList.remove('brushItemOpenText');
}

window.addEventListener('resize', whenResizedToDesktop);
/** END OF: Section 15 - Brushes **/