
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



// <!--YOUTUBE DOWNLOADER-->
//
// <!--<br>-->
// <!--<br>-->
//
//
// <!--<br>-->
// <!--<br>-->
//
// <!--<h2>YouTube Channel Downloader</h2>-->
//
// <!--<label for="">Channel Url</label>-->
// <!--<input type="text" class="youtubeChannelUrl" value="https://www.youtube.com/user/NewDramaAlert" style="width:270px"><button onclick="myChannelFunction()">Paste</button>-->
//   <!--<br>-->
//   <!--<br>-->
//   <!--<label for="">Download As Audio</label>-->
// <!--<input type="checkbox" class="downloadChannelAsAudio">-->
//   <!--<br>-->
//   <!--<br>-->
//   <!--<button class="startChannelDownload btn btn-success" style="margin-bottom:73px">Start Downloading Channel</button>-->
//
// <!--<br>-->




// <!--console.log('Download started');-->
// <!--console.log('filename: ' + info._filename);-->
// <!--console.log('size: ' + info.size);-->
//
//
// <!--We are using Node.js <span id="node-version"></span>,-->
// <!--Chromium <span id="chrome-version"></span>,-->
// <!--and Electron <span id="electron-version"></span>.-->
