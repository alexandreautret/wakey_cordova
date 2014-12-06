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
var user = [];
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
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //app.facebookConnect();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        console.log('tts');
        navigator.tts.startup(app.startupWin, app.fail);
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    startupWin: function startupWin(result) {
        console.log("Startup win");
        // When result is equal to STARTED we are ready to play
        console.log("Result "+result);
        //TTS.STARTED==2 use this once so is answered
        if (result == 2) {
          navigator.tts.setLanguage('fr', app.startupWin(), app.fail());
//          navigator.tts.pitch('75', app.startupWin(), app.fail());
//          navigator.tts.speed('50', app.startupWin(), app.fail());
          navigator.tts.speak("Bonjour clément, il est minuit. vous avez 3 nouveau emails");
        }
},

win: function(data){
    console.log(data)
        console.log('tts win');
      },
fail: function(data){
      console.log(data);
      console.log('tts fail');
},
    facebookConnect: function(){
      console.log('test');
      var socket = io.connect('http://alexandre.halo.gsa-studio.net:3003/');
      // demande les dates de naissances du jour au serveur
      // callback : data [{name:"Nom"},{name:"Nom"},{name:"Nom"},{name:"Nom"}]
      socket.emit('getBirthday',null, function(data){
        //alert('Birth Days Youpala');
        console.log(data);
      });




      // demande de la phrase du jour
      // callback : data -> message
      socket.emit('getHello', {name:'Alexandre'},function(data){
        //alert('Hello');
        console.log(data);
      });


      socket.on('news', function (data) {
        console.log('Response : ' + data.hello);
        socket.emit('my other event', { my: 'data' });
      });

    /*
      FACEBOOK -> Fonctionne
      var facebookLoginPage = window.open('http://alexandre.halo.gsa-studio.net/fb_connect', '_blank', 'location=yes');


      console.log('waiting for fb connect event');
      socket.on('connected', function(data){
        console.log('Facebook connected ');
        if(data.isConnected){
          console.log('is connected');
          facebookLoginPage.close();
          console.log(data.userID);
          user['token'] = data.accessToken;
          user['id'] = data.userID;

        }
      });

*/




    }
  /*login:function(){
    facebookConnectPlugin.login('email', app.callbackLogin , app.callbackError)

  },
  callbackLogin:function(response){

    console.log('Login success')
    console.log(response);
  }
  ,
  callbackError:function(response){

    console.log('Login error')
    console.log(response);
  }*/
/*    logout: function(){
      FB.logout(function(response) {
        // user is now logged out
      });
    },
    login: function(){
      if(!app.isConnected()){
        FB.login(function(response){
          statusChangeCallback(response);
        });
      }
    },
    isConnected: function(){
      FB.getLoginStatus(function(response) {
        if(response.status == "connected"){
          console.log("connecté");
          return true;
        }else{
          console.log("pas connecté");
          return false;
        }
      });
    },
    statusChangeCallback: function(){
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    },
    checkLoginState: function(){
      FB.getLoginStatus(function(response) {
        return response;
      });
    }
*/
};

app.initialize();