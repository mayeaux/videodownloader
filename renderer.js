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


  // select download as audio or video
  if(downloadAsAudio){
    arguments.push('-f');

    arguments.push('bestaudio');
  } else {
    // arguments.push('best');
  }

  // // verbose output

  // title is that passed or the one from youtube
  const fileName = title || '%(title)s';

  const filePath = __dirname + '/videos';


  // save to videos directory
  arguments.push('-o', `${filePath}/${fileName}.%(ext)s`);

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

// var url = 'https://www.youtube.com/watch?v=ZcAiayke00I';
function downloadChannel(url, channelUrl, downloadAsAudio, youtubeUrl, saveAsTitleValue){

  let arguments = [];

  // set the url for ytdl
  arguments.push(url);

  // verbose output
  arguments.push('-v');

  // keep video
  // arguments.push('-k');

  // arguments.push('-f', 'bestvideo+bestaudio/best');

  // arguments.push('-f');


  // select download as audio or video
  if(downloadAsAudio){
    arguments.push('-f');


    arguments.push('bestaudio');
  } else {
    // arguments.push('best');
  }

  // // verbose output

  // title is that passed or the one from youtube
  const fileName = '%(title)s';

  // const filePath = '/Users/anthony/Development/ytdldesktop/thinger/electron-quick-start/videos/Keemstar';

  const filePath = __dirname + '/videos/';


  // save to videos directory
  arguments.push('-o', `${filePath}/%(uploader)s/${fileName}.%(ext)s`);

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

/** START CHANNEL DOWNLOAD SECTION **/
//
// var startChannelDownload =  document.getElementsByClassName('startChannelDownload')[0];
//
//
// startChannelDownload.onclick = function(){
//
//   var youtubeChannelUrl = document.getElementsByClassName('youtubeChannelUrl')[0];
//   var downloadChannelAsAudio =document.getElementsByClassName('downloadChannelAsAudio')[0];
//
//   var youtubeChannelUrlValue = youtubeChannelUrl.value;
//   var downloadChannelAsAudioValue = downloadChannelAsAudio.checked;
//
//   downloadChannel(youtubeChannelUrlValue, youtubeChannelUrlValue, downloadChannelAsAudioValue, youtubeChannelUrl, '');
//
// };

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
      document.getElementsByClassName("youtubeUrl")[0].value = text;

      // Optional arguments passed to youtube-dl.
      var options = [];
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

var selectVideoDirectoryInput = document.getElementsByClassName('selectVideoDirectoryInput')[0];
selectVideoDirectoryInput.value = saveToDirectory;

const selectVideoDirectory = document.getElementsByClassName('selectVideoDirectory')[0].onclick = function(){

  // get path from electron and load it as selectedPath
  var selectedPath = dialog.showOpenDialog({
    defaultPath: './videos',
    properties: ['openDirectory']
  });

  console.log(selectedPath[0]);

  var newThing = selectedPath[0].split(__dirname)[1];

  console.log(newThing);


  selectVideoDirectoryInput.value = `.${newThing}`;

  if (!fs.existsSync(selectVideoDirectoryInput)){
    fs.mkdirSync(selectVideoDirectoryInput);
  }


}


