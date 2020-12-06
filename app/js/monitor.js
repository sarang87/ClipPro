const path = require("path");
const os = require("os");
const { clipboard } = require("electron");
const { spawn } = require("child_process");
const MAX_SIZE = 5;
let currentText = clipboard.readText();
let contents = [];
document.getElementById("output-path").innerText = currentText;

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const setCurrentContent = (watchText) => {
  document.getElementById("output-path").innerText = watchText;
  clipboard.writeText(watchText)
};

// const setCurrentContent2 = (event) => {
  
//   document.getElementById("output-path").innerText = event;
//   clipboard.writeText(event)
// };

// Update the
const refreshUI = (newContent) => {
  var contentWrapper = document.getElementById("content-wrapper");
  removeAllChildNodes(contentWrapper);
  newContent.forEach((element, idx) => {
    let li = document.createElement("li");
    li.setAttribute("class", "hoverable");
    var aTag = document.createElement("a");
    aTag.setAttribute("href", "#");
    aTag.className = "collection-item  truncate waves-effect waves-red black-text #b2dfdb teal lighten-5";
    aTag.innerText = element;
    aTag.addEventListener('click', function (){setCurrentContent(element)})
    li.appendChild(aTag);
    contentWrapper.appendChild(li);
  });
};



const updateContent = () => {
  contents.push(watchText);
  // if (contents.length >= MAX_SIZE){
  //     let l = contents.length
  //     contents = contents.slice(l-MAX_SIZE, l)
  // }
};

const watchClipBoard = () => {
  watchText = clipboard.readText();
  // new content on the clipboard and also not already there in the contents array
  if ((watchText != currentText) && (!contents.includes(watchText))) {
    updateContent(contents);
    setCurrentContent(watchText);
    refreshUI(contents);
    currentText = watchText;
    var x = document.getElementById("content-wrapper").childElementCount;
    if (x == 3) {
      refreshUI(contentWrapper, []);
    }
  }
};

setInterval(watchClipBoard, 500);
