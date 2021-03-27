// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

let slower_button = document.getElementById("a");
let reset_button = document.getElementById("b");
let faster_button = document.getElementById("c");
let speed_text = document.getElementById("speed");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});


// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });

  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }


// ...
slower_button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeSpeedSlower,
  });
});

faster_button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeSpeedFaster,
  });
});

reset_button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeSpeedReset,
  });
});

// ....
function changeSpeedReset() {
  current_speed = document.querySelector('video').playbackRate;
  document.querySelector('video').playbackRate = 1;
}

// ....
function changeSpeedSlower() {
  current_speed = document.querySelector('video').playbackRate;
  document.querySelector('video').playbackRate -= 0.10;
}

// ....
function changeSpeedFaster() {
  current_speed = document.querySelector('video').playbackRate;
  document.querySelector('video').playbackRate += 0.10;
}
