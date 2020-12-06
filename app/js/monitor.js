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

// Update the
const refreshContent = (newContent) => {
  var contentWrapper = document.getElementById("content-wrapper");
  removeAllChildNodes(contentWrapper);
  newContent.forEach((element, idx) => {
    let li = document.createElement("li");
    li.class="red lighten-3"
    var aTag = document.createElement("a");
    aTag.setAttribute("href", "#");
    aTag.setAttribute("class","collection-item")
    aTag.innerText = element;
    // div.id = 'content-' + idx
    // div.style ="cursor: pointer;"
    // div.onclick="href='#';"
    let text = document.createTextNode(element);
    li.appendChild(aTag);
    contentWrapper.appendChild(li);
  });
};

const setCurrentContent = (watchText) => {
  document.getElementById("output-path").innerText = watchText;
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
  if (watchText != currentText) {
    updateContent(contents);
    setCurrentContent(watchText);
    // let div = document.createElement("div");
    // let text = document.createTextNode(watchText);
    // div.appendChild(text);
    // contentWrapper.appendChild(div);
    refreshContent(contents);
    currentText = watchText;
    var x = document.getElementById("content-wrapper").childElementCount;
    if (x == 3) {
      refreshContent(contentWrapper, []);
    }
  }
};

setInterval(watchClipBoard, 500);
