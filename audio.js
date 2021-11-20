
jQuery(document).ready(function () {
    var $ = jQuery;
    var myRecorder = {
        objects: {
            context: null,
            stream: null,
            recorder: null
        },
        init: function () {
            if (null === myRecorder.objects.context) {
                myRecorder.objects.context = new (
                        window.AudioContext || window.webkitAudioContext
                        );
            }
        },
        start: function () {
            var options = {audio: true, video: false};
            navigator.mediaDevices.getUserMedia(options).then(function (stream) {
                myRecorder.objects.stream = stream;
                myRecorder.objects.recorder = new Recorder(
                        myRecorder.objects.context.createMediaStreamSource(stream),
                        {numChannels: 1}
                );
                myRecorder.objects.recorder.record();
            }).catch(function (err) {});
        },
        stop: function (listObject) {
            if (null !== myRecorder.objects.stream) {
                myRecorder.objects.stream.getAudioTracks()[0].stop();
            }
            if (null !== myRecorder.objects.recorder) {
                myRecorder.objects.recorder.stop();

                // Validate object
                if (null !== listObject
                        && 'object' === typeof listObject
                        && listObject.length > 0) {
                    // Export the WAV file
                    myRecorder.objects.recorder.exportWAV(function (blob) {
                        

                        var url = (window.URL || window.webkitURL)
                                .createObjectURL(blob);

                        // Prepare the playback
                        var audioObject = $('<audio controls></audio>')
                                .attr('src', url);

                        // Prepare the download link
                        var downloadObject = $('<a>&#9660;</a>')
                                .attr('href', url)
                                .attr('download', new Date().toUTCString() + '.wav');

                        // Wrap everything in a row
                        var holderObject = $('<div class="row"></div>')
                                .append(audioObject)
                                .append(downloadObject);

                        // Append to the list
                        listObject.append(holderObject);


                    });
                }
            }
        }
    };

    // Prepare the recordings list
    var listObject = $('[data-role="recordings"]');

    // Prepare the record button
    $('[data-role="controls"] > button').click(function () {
        // Initialize the recorder
        myRecorder.init();

        // Get the button state 
        var buttonState = !!$(this).attr('data-recording');

        // Toggle
        if (!buttonState) {
            $(this).attr('data-recording', 'true');
            myRecorder.start();
        } else {
            $(this).attr('data-recording', '');
            myRecorder.stop(listObject);
        }
    });
});
      

//// CHOICE /////
var files = [];
document.getElementById("files").addEventListener("change", function(e) {
    files = e.target.files;
    for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
    }
});

///// SEND FILES //////
document.getElementById("send").addEventListener("click", function() {

    var metadata ={
        contentType: 'audio/wav',
        name: new Date().toUTCString() 

    };
    if (files.length != 0) {
    for (let i = 0; i < files.length; i++) {
        var storage = firebase.storage().ref(files[i].name);
        var upload = storage.put(files[i],metadata);
        upload.on("state_changed", function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progress").value = percentage;
        },

        function error() {alert("Error uploading file.");},

        function complete() {document.getElementById( "uploading").innerHTML += `${files[i].name} uploaded <br />`;}); }
        
    } else {alert("No file chosen."); }
});

var lista;
var data_1;
// LIST FILES ////////////////////
document.getElementById("list_files").addEventListener("click", function() {  
  var storageRef = firebase.storage().ref();
  storageRef.listAll().then(function(result) {
  //data_1 = result.replace("gs://testweb-f3370.appspot.com/","");
  result.items.forEach(function(urlFile) {
    lista = urlFile;

    document.getElementById("response_list").innerHTML +=  `${lista}  <br />`; });
                              }).catch(function(error) {alert("No file chosen."); });											
});


////////////////////////////////////
// GET URL ////////////////////
document.getElementById("get_url").addEventListener("click", function() {
  var get_url_file = document.getElementById("name").value;
  var audio = document.getElementById("name").value;
  var storage = firebase.storage().ref(get_url_file);
  storage.getDownloadURL().then(function(url) {
    var audio = new Audio(url);
    audio.play(); })
                                         .catch(function(error) {alert("Error encountered."); });
    
});  