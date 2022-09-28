const { clipboard } = require("electron");
const { spawn } = require("child_process");
const MAX_SIZE = 100;
let currentText = clipboard.readText();
let contents = [];
document.getElementById("output-path").innerText = currentText;

// helper method to remove all nodes for a parent node in DOM
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// helper method to set the UI and system clipboard to clicked or selected content
const setCurrentContent = (watchText) => {
  document.getElementById("output-path").innerText = watchText;
  clipboard.writeText(watchText)
};


// Update the UI
const refreshUI = (newContent) => {
  var contentWrapper = document.getElementById("content-wrapper");
  removeAllChildNodes(contentWrapper);
  newContent.forEach((element, idx) => {
    var aTag = document.createElement("a");
    var copyBtn = document.getElementById("copy-all-btn");
    var clearBtn = document.getElementById("clear-all-btn");
    aTag.setAttribute("href", "#");
    aTag.setAttribute("id", idx);
    aTag.className += "collection-item hoverable waves-effect waves-teal black-text";
    aTag.innerText = element;
    aTag.addEventListener('click', function (){setCurrentContent(element)});
    copyBtn.addEventListener('click', function (){copyAllContent()});
    clearBtn.addEventListener('click', function (){clearAllContent()});
    contentWrapper.appendChild(aTag);
  });
};


// Add new content to the contents array (backend) and slice if it exceeds maxsize
const updateContent = () => {
  contents.push(watchText);
  if (contents.length >= MAX_SIZE){
      let l = contents.length
      contents = contents.slice(l-MAX_SIZE, l)
  }
};

const copyAllContent = () => {
  var allContent = contents.join(",");
  clipboard.writeText(allContent);
};

const clearAllContent = () => {
  contents.length = 0;
  updateContent(contents);
  refreshUI(contents);
  //currentText = watchText;
};

// watch for new content on the clipboard
const watchClipBoard = () => {
  watchText = clipboard.readText();
  // new content on the clipboard and also not already there in the contents array
  if ((watchText != currentText) && (!contents.includes(watchText))) {
    updateContent(contents);
    setCurrentContent(watchText);
    refreshUI(contents);
    currentText = watchText;
  }
};

setInterval(watchClipBoard, 500);
