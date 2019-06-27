// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var fs = require('fs');
const spawn = require('child_process').spawn;
const ytdl = require('ytdl-core');
const ffmpeg   = require('fluent-ffmpeg');
var youtubedl = require('youtube-dl');

// create videos file if doesn't exist
var dir = './videos';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}


// var url = 'https://www.youtube.com/watch?v=ZcAiayke00I';
function download(url, title, downloadAsAudio){

  let arguments = [];

  // set the url for ytdl
  arguments.push(url);

  // verbose output
  arguments.push('-v');

  // keep video
  arguments.push('-k');

  // verbose output
  arguments.push('-f', 'best');

  // title is that passed or the one from youtube
  const fileName = title || '%(title)s';

  // save to videos directory
  arguments.push('-o', `videos/${fileName}.%(ext)s`);

  console.log(arguments);

  // download as audio if needed
  if(downloadAsAudio){
    console.log('Download as audio');
    arguments.push('-x');
  }

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



var startDownload = document.getElementsByClassName('startDownload')[0];
var percentage = document.getElementsByClassName('percentage')[0];
var youtubeUrl = document.getElementsByClassName('youtubeUrl')[0];
var downloadAsAudio = document.getElementsByClassName('downloadAsAudio')[0];


var saveAsTitle = document.getElementsByClassName('saveAsTitle')[0];

var openFolder = document.getElementsByClassName('openFolder')[0];

openFolder.onclick = function(){
  shell.openItem('./videos');
};

const {shell} = require('electron');


startDownload.onclick = function(){

  var youtubeUrlValue = youtubeUrl.value;
  var saveAsTitleValue = saveAsTitle.value;
  var downloadAsAudioValue = downloadAsAudio.checked;
  download(youtubeUrlValue, saveAsTitleValue, downloadAsAudioValue);

};






// frontend code
function myFunction() {

  navigator.clipboard.readText()
    .then(text => {
      document.getElementsByClassName("youtubeUrl")[0].value = text;

    })
    .catch(err => {
      document.getElementById("demo").innerHTML = 'Failed to read clipboard contents: '+err;
    });


}