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
  arguments.push('-k');

  // arguments.push('-f', 'bestvideo+bestaudio/best');

  arguments.push('-f');


  // select download as audio or video
  if(downloadAsAudio){
    arguments.push('bestaudio');
  } else {
    arguments.push('bestvideo');
  }

  // // verbose output

  // title is that passed or the one from youtube
  const fileName = title || '%(title)s';

  // const filePath = '/Users/anthony/Development/ytdldesktop/thinger/electron-quick-start/videos/Keemstar';

  const filePath = __dirname + '/videos';


  // save to videos directory
  arguments.push('-o', `${filePath}/${fileName}.%(ext)s`);

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






// frontend code
function myFunction() {

  var youtubeUrl = document.getElementsByClassName('youtubeUrl')[0];
  var downloadAsAudio = document.getElementsByClassName('downloadAsAudio')[0];
  var saveAsTitle = document.getElementsByClassName('saveAsTitle')[0];

  // var saveAsTitleValue = saveAsTitle.value;


  var youtubeUrlValue = youtubeUrl.value;




  navigator.clipboard.readText()
    .then(text => {
      document.getElementsByClassName("youtubeUrl")[0].value = text;

      // Example of filtering the formats to audio only.


      //
      // ytdl.getInfo(text, (err, info) => {
      //   if (err) return console.log(err);
      //   console.log(info);
      //
      //   // let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      //   // console.log('Formats with only audio: ' + audioFormats.length);
      //
      //   saveAsTitle.value = info.title;
      //
      // });

    })
    .catch(err => {
      console.log(err);

      // document.getElementById("demo").innerHTML = 'Failed to read clipboard contents: '+err;
    });


}

// const selectVideoDirectory = document.getElementsByClassName('selectVideoDirectory')[0].onclick = function(){
//   var path1 = dialog.showOpenDialog({
//     defaultPath: './videos',
//     properties: ['openDirectory']
//   });
//
//   console.log(path1);
// }
//
//

// var url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
var url = 'https://www.brighteon.com/6053103906001'
// Optional arguments passed to youtube-dl.
var options = ['-f' , 'bestvideo'];
youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err;

  console.log('id:', info.id);
  console.log('title:', info.title);
  console.log('url:', info.url);
  console.log('thumbnail:', info.thumbnail);
  console.log('description:', info.description);
  console.log('filename:', info._filename);
  console.log('format id:', info.format_id);
});