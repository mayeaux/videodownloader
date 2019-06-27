// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var fs = require('fs');
const spawn = require('child_process').spawn;
const ytdl = require('ytdl-core');
const ffmpeg   = require('fluent-ffmpeg');

let id = 'sDLsSQf3Hc0';

let stream = ytdl(id, {
  quality: 'highestaudio',
  //filter: 'audioonly',
});

let start = Date.now();


ffmpeg(stream)
  .audioBitrate(128)
  .save(`${__dirname}/${id}.mp3`)
  .on('progress', (p) => {
    console.log(`${p.targetSize}kb downloaded`);
  })
  .on('end', () => {
    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
  });

var dir = './videos';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

dir = '../videos';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

var options = {
  filter: 'audioonly'
}

ytdl('http://www.youtube.com/watch?v=A02s8omM_hI', options)
  .pipe(fs.createWriteStream('video.flv'));

// var url = 'https://www.youtube.com/watch?v=ZcAiayke00I';
function download(url){
  const ls = spawn('node_modules/youtube-dl/bin/youtube-dl', ['-f' , '251', url]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
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

  // var arguments = ['--format=18'];

  download(youtubeUrlValue);

//   var arguments = ['-f', '251'];
//
//   var video = youtubedl(youtubeUrlValue,
//     // Optional arguments passed to youtube-dl.
//     arguments,
//     // Additional options can be given for calling `child_process.execFile()`.
//     { cwd: __dirname + '/videos'});
//
//   var size;
//   var ext;
//
// // Will be called when the download starts.
//   video.on('info', function(info) {
//     console.log(info);
//     console.log('Download started');
//     console.log('filename: ' + info._filename);
//     console.log('size: ' + info.size / 1000000 + 'MB');
//
//     size = info.size;
//     ext = info.ext;
//   });
//
//   console.log(ext);
//
//
//   var pos = 0;
//   video.on('data', function data(chunk) {
//     // console.log(chunk.length);
//
//     pos += chunk.length;
//     // `size` should not be 0 here.
//     if (size) {
//       var percent = (pos / size * 100).toFixed(2);
//
//       percentage.innerText = 'Percentage ' + percent + '%';
//
//       // console.log(percent + '%');
//     }
//   });
//
//   video.on('end', function() {
//     // shell.openItem('./videos');
//   });
//
//
//   video.pipe(fs.createWriteStream(`videos/${saveAsTitle.value}.${`mp3`}`));
}

