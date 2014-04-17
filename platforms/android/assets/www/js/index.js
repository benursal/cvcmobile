/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       // var parentElement = document.getElementById(id);
        //document.getElementById('result').innerHTML = "Welcome to churva";
        navigator.notification.alert("works well even with dialog plugin");
    }
};

function scanNow()
{
	//document.getElementById('result').innerHTML = "Starting the scan...";
	navigator.notification.alert("no conflict with dialog plugin");
	cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}

function doTheEncode()
{
	cordova.plugins.barcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );
}

function takephoto()
{
	navigator.camera.getPicture(
		uploadPhoto, 
		onFail, 
		{ 
			quality: 50,
    		destinationType : Camera.DestinationType.FILE_URI,
    		sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY 
    	}
    );
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function uploadPhoto(imageURI) {
	navigator.notification.alert("uploading photo...");
	
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://192.168.0.102/test/upload.php"), win, fail, options);
}

 function win(r) {
    navigator.notification.alert("Code = " + r.responseCode);
    navigator.notification.alert("Response = " + r.response);
    navigator.notification.alert("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    navigator.notification.alert("upload error source " + error.source);
    navigator.notification.alert("upload error target " + error.target);
}


function onFail(message) {
    alert('Failed because: ' + message);
}

function getfilesystem()
{
	navigator.notification.alert("baho igit");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onGreat, onBad);
}

function onGreat(fileSystem) {
    //navigator.notification.alert("Path is" + fileEntry.root.name);
    var entry=fileSystem.root; 
    entry.getDirectory("cloudvcards", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
}

function onGetDirectorySuccess(dir) { 
      navigator.notification.alert("Created dir "+dir.fullPath);
      
	
} 

function downloadFile()
{
	navigator.notification.alert("downloading...");
	var source = encodeURI("http://192.168.0.102/test/download.php");
    var targetPath = "file:///cvc/qr_code.png"; 
      
    var fileTransfer = new FileTransfer();

	fileTransfer.download(
		source,
		targetPath,
		function(theFile) {
			navigator.notification.alert("download complete: " + theFile.toURI());
			//showLink(theFile.toURI());
		},
		function(error) {
			navigator.notification.alert("download error source " + error.source);
			navigator.notification.alert("download error target " + error.target);
			navigator.notification.alert("upload error code: " + error.code);
		}
	);
}

function onGetDirectoryFail(error) { 
     navigator.notification.alert("Error creating directory "+error.code); 
} 

function onBad(evt) {
	navigator.notification.alert(evt.target.error.code);
}

function createfile()
{
	navigator.notification.alert("creating file...");
	
	window.requestFileSystem(
		LocalFileSystem.PERSISTENT, 
		0, 
		function(fileSystem){
			navigator.notification.alert("lab-ot di xa...");
			fileSystem.root.getDirectory(
				"cloudvcards", 
				{create: true}, 
				function(dir){
					navigator.notification.alert("folder created");
					lockFile = dir.getFile("testing.txt", {create: true}, onFileSuccess);	
				}
			);
			
		}, 
		onBad
	);
}

function onFileSuccess(fileEntry)
{
	navigator.notification.alert("hehe");
	navigator.notification.alert(fileEntry.fullPath);
}

