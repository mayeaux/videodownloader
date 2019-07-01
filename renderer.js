// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var fs = require('fs');
const spawn = require('child_process').spawn;
const ytdl = require('ytdl-core');
const ffmpeg   = require('fluent-ffmpeg');
var youtubedl = require('youtube-dl');


const {dialog} = require('electron').remote;



// create videos file if doesn't exist
var dir = './videos';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

// select video input
var selectVideoDirectoryInput = document.getElementsByClassName('selectVideoDirectoryInput')[0];


// var url = 'https://www.youtube.com/watch?v=ZcAiayke00I';
function download(url, title, downloadAsAudio, youtubeUrl, saveAsTitleValue){

  let arguments = [];

  // set the url for ytdl
  arguments.push(url);

  // verbose output
  arguments.push('-v');

  // keep video
  // arguments.push('-k');

  // arguments.push('-f', 'bestvideo+bestaudio/best');

  // arguments.push('-f');

  arguments.push('--add-metadata');


  // select download as audio or video
  if(downloadAsAudio){
    arguments.push('-f');

    arguments.push('bestaudio');
    // can add something here later
  } else if (false){
    arguments.push('-f');

    arguments.push('bestvideo');
  } else {
    // arguments.push('best');
  }

  // // verbose output

  console.log(title);

  if(title){
    title = title.replace(/\//g , '_');
    console.log('replacing');
  }

  // title is that passed or the one from youtube
  const fileName = title || '%(title)s';

  console.log(title);

  // TODO: here is something

  let inputtedUrl = selectVideoDirectoryInput.value;

  console.log(inputtedUrl);

  // create
  if (!fs.existsSync(inputtedUrl)){
    fs.mkdirSync(inputtedUrl);
  }

  console.log(__dirname);

  let toAttachToDirname = inputtedUrl

  // remove dot to fix path
  while(toAttachToDirname.charAt(0) === '.')
  {
    toAttachToDirname = toAttachToDirname.substr(1);
  }


  const filePath = __dirname + toAttachToDirname;

  const fileExtension = `%(ext)s`;

  let saveToFolder = `${filePath}/${fileName}.${fileExtension}`;


  console.log(saveToFolder);

  // save to videos directory
  arguments.push('-o', saveToFolder);

  console.log(arguments);

  // download as audio if needed
  if(downloadAsAudio){
    console.log('Download as audio');
    arguments.push('-x');
  }

  // const youtubeBinaryFilePath = `/usr/local/bin/youtube-dl`;

  const youtubeBinaryFilePath = 'node_modules/youtube-dl/bin/youtube-dl';

  const ls = spawn(youtubeBinaryFilePath, arguments);

  ls.stdout.on('data', (data) => {
    percentage.innerText = data;


    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    percentage.innerText = data;


    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {

    youtubeUrl.value = '';
    saveAsTitleValue.value = '';

    // downloaded++;// if(downloaded == needsToDownload){
    //   downloading = false;
    //   console.log('no longer downloading');
    // }

    if(code == 0){
      percentage.innerText = 'Download completed';
    }

    console.log(`child process exited with code ${code}`);
  });
}


// start download button
var startDownload = document.getElementsByClassName('startDownload')[0];


// open folder button
var openFolder = document.getElementsByClassName('openFolder')[0];


// percentage div
var percentage = document.getElementsByClassName('percentage')[0];


openFolder.onclick = function(){
  shell.openItem('./videos');
};

const {shell} = require('electron');


startDownload.onclick = function(){

  var youtubeUrl = document.getElementsByClassName('youtubeUrl')[0];
  var downloadAsAudio = document.getElementsByClassName('downloadAsAudio')[0];
  var saveAsTitle = document.getElementsByClassName('saveAsTitle')[0];

  var youtubeUrlValue = youtubeUrl.value;
  var saveAsTitleValue = saveAsTitle.value;
  var downloadAsAudioValue = downloadAsAudio.checked;

  download(youtubeUrlValue, saveAsTitleValue, downloadAsAudioValue, youtubeUrl, saveAsTitle);



};


function youtubeDlInfoAsync(url, options) {
  return new Promise(function(resolve, reject) {
    youtubedl.getInfo(url, options, function(err, data) {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
}

// frontend code
function myFunction() {

  var youtubeUrl = document.getElementsByClassName('youtubeUrl')[0];
  var downloadAsAudio = document.getElementsByClassName('downloadAsAudio')[0];
  var saveAsTitle = document.getElementsByClassName('saveAsTitle')[0];

  // var saveAsTitleValue = saveAsTitle.value;


  var youtubeUrlValue = youtubeUrl.value;




  navigator.clipboard.readText()
    .then(async text => {
      // update frontend to reflect text from clipboard
      document.getElementsByClassName("youtubeUrl")[0].value = text;

      const isBrighteonDownload = text.match('brighteon');

      let options;
      if(isBrighteonDownload){
        options = ['-f bestvideo']
      } else {
        options = [];
      }

      // Optional arguments passed to youtube-dl.
      // var options = [];
      // var options = ['-f', 'bestvideo'];

      // options = [] works on Twitter, YouTube but not Brighteon
      // options = ['-f', 'bestvideo'] works on YouTube, Brighteon, but not Twitter

      const info = await youtubeDlInfoAsync(text, options);

      saveAsTitle.value = info.title;

      console.log(info);

    })
    .catch(err => {
      console.log(err);

      // document.getElementById("demo").innerHTML = 'Failed to read clipboard contents: '+err;
    });


}

// frontend code
function myChannelFunction() {

  navigator.clipboard.readText()
    .then(text => {
      document.getElementsByClassName("youtubeChannelUrl")[0].value = text;

    })
    .catch(err => {
      console.log(err);

    });


}

/** SELECT DIRECTORY **/

const saveToDirectory = './videos';

selectVideoDirectoryInput.value = saveToDirectory;

const selectVideoDirectoryButton = document.getElementsByClassName('selectVideoDirectory')[0]

const selectVideoDirectory = selectVideoDirectoryButton.onclick = function(){

  // get path from electron and load it as selectedPath
  var selectedPath = dialog.showOpenDialog({
    defaultPath: './videos',
    properties: ['openDirectory']
  });

  console.log(selectedPath[0]);

  var newThing = selectedPath[0].split(__dirname)[1];

  // console.log(newThing);

  const adjustedUrlWithCurrentDirectory = `.${newThing}`;

  console.log(adjustedUrlWithCurrentDirectory);


  selectVideoDirectoryInput.value = adjustedUrlWithCurrentDirectory;

  if (!fs.existsSync(adjustedUrlWithCurrentDirectory)){
    fs.mkdirSync(adjustedUrlWithCurrentDirectory);
  }


}


