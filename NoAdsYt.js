// ==UserScript==
// @name         No ADS - YouTube
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  - Skips all youtube ads - | - undetectable - | - skips ads instantly -
// @author       GSRHackZ | optimization changes - ConradRz
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @icon         https://i.ibb.co/X5f50Cg/Screen-Shot-2021-07-19-at-9-31-54-PM.png
// @grant        none
// ==/UserScript==

// Function to check if the element is a video ad
const isVideoAd = (element) => {
  return (
    element.classList.contains("video-ads") ||
    element.classList.contains("ytp-ad-module") ||
    element.classList.contains("ytp-ad-overlay-close-button") ||
    element.classList.contains("ytp-ad-text") ||
    element.classList.contains("ytp-ad-message-container")
  );
};

// Function to remove ads
const removeAds = () => {
  const ads = document.querySelectorAll(".video-ads, .ytp-ad-module");
  ads.forEach((ad) => {
    ad.style.display = "none";
  });

  const closeButtons = document.querySelectorAll(".ytp-ad-overlay-close-button");
  closeButtons.forEach((button) => {
    button.click();
    // console.log("ad banner closed!");
  });

  const sideAds = document.querySelectorAll(".style-scope.ytd-watch-next-secondary-results-renderer.sparkles-light-cta.GoogleActiveViewElement, .style-scope.ytd-item-section-renderer.sparkles-light-cta");
  sideAds.forEach((sideAd) => {
    sideAd.style.display = "none";
    // console.log(".style-scope.ytd-watch-next-secondary-results-renderer.sparkles-light-cta.GoogleActiveViewElement, .style-scope.ytd-item-section-renderer.sparkles-light-cta ad removed!");
  });

  const skipBtn = document.querySelector(".ytp-ad-text.ytp-ad-skip-button-text");
  if (skipBtn !== null) {
    skipBtn.click();
    // console.log("skippable ad skipped!");
  }

  const incomingAd = document.querySelector(".ytp-ad-message-container");
  if (incomingAd !== null) {
    incomingAd.style.display = "none";
    // console.log("removed incoming ad alert!");
  }

  const companionSlot = document.querySelector(".style-scope.ytd-companion-slot-renderer");
  if (companionSlot !== null) {
    companionSlot.parentNode.removeChild(companionSlot);
    // console.log(".style-scope.ytd-companion-slot-renderer ad removed!");
  }

  if (ad !== null && ad.children.length > 0) {
    const previewText = document.querySelector(".ytp-ad-text.ytp-ad-preview-text");
    if (previewText !== null) {
      previewText.parentNode.removeChild(previewText);
      // console.log("unskippable ad removed!");
    }
  }
};

// Create a MutationObserver to detect changes in specific elements related to video ads
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const addedNodes = Array.from(mutation.addedNodes);
      const hasVideoAd = addedNodes.some((node) => isVideoAd(node));
      if (hasVideoAd) {
        removeAds();
      }
    }
  }
});

// Start observing changes in the DOM when a video is being played
observer.observe(document.documentElement, { childList: true, subtree: true });
