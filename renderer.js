// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var fs = require('fs');

var dir = './videos';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}


var youtubedl = require('youtube-dl');

var thinger = document.getElementsByClassName('fred')[0];
var percentage = document.getElementsByClassName('percentage')[0];
var youtubeUrl = document.getElementsByClassName('youtubeUrl')[0];

var saveAsTitle = document.getElementsByClassName('saveAsTitle')[0];

var openFolder = document.getElementsByClassName('openFolder')[0];

openFolder.onclick = function(){
  shell.openItem('./videos');
}

// shell.openItem('./videos');


const {shell} = require('electron')


thinger.onclick = function(){

  var youtubeUrlValue = youtubeUrl.value;


  var video = youtubedl(youtubeUrlValue,
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname + '/videos'});

// Will be called when the download starts.
  video.on('info', function(info) {
    console.log(info);
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);
  });

  var size = 122348368;

  var pos = 0;
  video.on('data', function data(chunk) {
    // console.log(chunk.length);

    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      var percent = (pos / size * 100).toFixed(2);

      percentage.innerText = 'Percentage ' + percent + '%';

      // console.log(percent + '%');
    }
  });

  video.on('end', function() {
    // shell.openItem('./videos');
  });


  video.pipe(fs.createWriteStream(`videos/${saveAsTitle.value}.mp4`));
}

