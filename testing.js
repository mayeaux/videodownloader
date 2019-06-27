var youtubedl = require('youtube-dl');
const fs = require('fs');
const spawn = require('child_process').spawn;
const readline = require('readline');
const ytdl     = require('ytdl-core');
const ffmpeg   = require('fluent-ffmpeg');

const url = 'https://www.youtube.com/watch?v=ZcAiayke00I'

function ytdlStyle1(url){
  let stream = ytdl(url, {
    quality: 'highestaudio',
    //filter: 'audioonly',
  });

  let starttime;


  stream.pipe(fs.createWriteStream('thi11ng.webm'))

  stream.once('response', () => {
    starttime = Date.now();
  });

  stream.on('progress', (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded`);
    process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(`, estimated time left: ${(downloadedMinutes / percent - downloadedMinutes).toFixed(2)}minutes `);
    readline.moveCursor(process.stdout, 0, -1);
  });

}

function ytdlStyle(url){
  let stream = ytdl(url, {
    quality: 'highestaudio',
    //filter: 'audioonly',
  });

  let start = Date.now();
  ffmpeg(stream)
    .audioBitrate(128)
    .save(`${__dirname}/${`yo`}.mp3`)
    .on('progress', (p) => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
      console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
    });

}


function ytdlexec(url){
  youtubedl.exec(url, ['-f', '251'], {}, function(err, output) {
    if (err) throw err;
    console.log(output.join('\n'));
  });
}


function youtubeDl(url){

  var arguments = ['-f', '140'];

  var video = youtubedl(url,
    // Optional arguments passed to youtube-dl.
    arguments,
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname + '/videos'});

  var size;
  var ext;

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log(info);
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size / 1000000 + 'MB');

    size = info.size;
    ext = info.ext;
  });

  console.log(ext);


  var pos = 0;
  video.on('data', function data(chunk) {
    // console.log(chunk.length);

    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      var percent = (pos / size * 100).toFixed(2);

      console.log(percent);

      // console.log(percent + '%');
    }
  });

  video.on('end', function() {
    // shell.openItem('./videos');
  });


  video.pipe(fs.createWriteStream(`${'fre3434d'}.${`webm`}`));
}



function download(url){
  const ls = spawn('node_modules/youtube-dl/bin/youtube-dl', ['-f' , '140', url]);

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
// ytdlStyle1(url);
// ytdlStyle(url);
download(url);
// youtubeDl(url);
// ytdlexec(url);