// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var fs = require('fs');
const spawn = require('child_process').spawn;
const ytdl = require('ytdl-core');
const ffmpeg   = require('fluent-ffmpeg');
var youtubedl = require('youtube-dl');


var dir = './videos';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

dir = '../videos';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

var percentage = document.getElementsByClassName('percentage')[0];


// var url = 'https://www.youtube.com/watch?v=ZcAiayke00I';
function download(url){

  let arguments = [];
  arguments.push(url);

  arguments.push('-o', 'videos/%(title)s.%(ext)s');

  console.log(arguments);

  const ls = spawn('node_modules/youtube-dl/bin/youtube-dl', arguments);

  ls.stdout.on('data', (data) => {
    percentage.innerText = data;


    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    percentage.innerText = data;


    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    // downloaded++;// if(downloaded == needsToDownload){
    //   downloading = false;
    //   console.log('no longer downloading');
    // }
    console.log(`child process exited with code ${code}`);
  });

}



var thinger = document.getElementsByClassName('fred')[0];
var percentage = document.getElementsByClassName('percentage')[0];
var youtubeUrl = document.getElementsByClassName('youtubeUrl')[0];

var saveAsTitle = document.getElementsByClassName('saveAsTitle')[0];

var openFolder = document.getElementsByClassName('openFolder')[0];

openFolder.onclick = function(){
  shell.openItem('./videos');
};

const {shell} = require('electron');


thinger.onclick = function(){

  var youtubeUrlValue = youtubeUrl.value;

  download(youtubeUrlValue);

}

function myFunction() {

  navigator.clipboard.readText()
    .then(text => {
      document.getElementsByClassName("youtubeUrl")[0].value = text;

    })
    .catch(err => {
      document.getElementById("demo").innerHTML = 'Failed to read clipboard contents: '+err;
    });


}