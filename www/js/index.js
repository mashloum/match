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
      ion.sound({
    sounds: [
        {  name: "cheer" } ,
        {  name: "sad" }
    ],
    volume: 1,
    path: "media/",
    preload: true
});
 var matchit =-1 ;
 var firstidx = 0;
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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var pics=[];
var cells = 12;
var uniqueRandoms = [];
function makeUniqueRandom() {
    // refill the array if needed

    if (!uniqueRandoms.length) {
        for (var i = 0; i < cells; i++) {
            uniqueRandoms.push(i);
        }
    }
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];

    // now remove that value from the array
    uniqueRandoms.splice(index, 1);

    return val;

}



function initialize() {
    doRand();
/*    for (var j=0; j <  cells; j++) {
      
        var div = document.createElement('div');
        $(div).addClass("div"+j).addClass("square")
    .html("texting "+j);
 
    */
        // $("#maindiv").css('background-image', 'img/rahaf.gif');
   //   $('tbody').css('backgroundImage','url(img/rahaf.gif)');
 
     /*$('tbody').css({'background-image' : "url(img/rahaf.gif" ,
                         'background-repeat': 'repeat',
                         'background-position': 'center',
                         'background-size': 'contain'
                     });
*/
    $("#resetButt").on('click',  function(event){
        doRand();
           $("td").css('background-image', 'none');
           $("td").removeClass("painted");
           $("td").removeClass("flagged");
         
    });
    $(".bx").on('click',  function(event){
            var glzz = $(this).attr("class");
            console.log("glzz:"+glzz)
            var idx1 = glzz.replace ( /[^\d.]/g, '' );
            var pairn= Math.floor(pics[idx1]/2);
           console.log("res = "+ idx1 + " and the original = " + pics[idx1] + " pair=" + pairn);
            
        //var hasImage = $('img',this).length > 0;
        if(!$(this).hasClass("painted") ) {
            /*var img = document.createElement("IMG");
            img.src = "img/img"+pairn+".jpg";
           */
           console.log("Adding Pic");
           $(this).css({'background-image' : "url(img/img"+pairn+".jpg" ,
                         'background-repeat': 'no-repeat',
                         'background-position': 'center',
                         'background-size': 'contain'
                     });
            $(this).addClass("painted");
console.log(matchit + "< matchit firstidx>" + firstidx);
          if(matchit == -1 ) {
            matchit = pairn;
            firstidx = idx1;
           }  else {
            if(matchit == pairn ) {
                console.log("bingo!!");
                ion.sound.play("cheer");
  
            } else {
                ion.sound.play("sad");               
                console.log("close both");
                 $(this).addClass("flagged");
                 $(".td"+firstidx).addClass("flagged");
                setTimeout(function(){ 
                    console.log(firstidx + " closeing both "+ idx1);
                    $(".flagged").css('background-image', 'none');
                    $(".flagged").removeClass("painted");
                    $("td").removeClass("flagged");
            }, 1500);
 //               $(this).css('background-image', 'none');
            }
            matchit =-1;
           }
          var totals = $('tbody').find('td').filter('.painted').length;
          if( totals == 12){
            console.log("game over");
          }; 

 
               //     attr('background',"img/img"+pairn+".jpg");

//                img.id="theImg";
                //img.style="height:90; width:90;"
           //     img.height=90;
            //    img.width=90;
               // img.className ="pic";
           // this.appendChild(img);
        }

        });




    /*if(j%2==0) {
        $(div).attr('style','background-color:lightcyan;'); 
    } else {
        $(div).attr('style','background-color:lightgray;');         
    }*/
    //$(div).appendTo($("#maindiv"));

  //  }
}



function doRand() { 

    for (var i = 0; i < cells ; i++) {
        var rand = makeUniqueRandom();
        console.log('i= '+ i + " rand = " + rand );
        pics[i] = rand;

/*        if (i % cells == 0) {
            $("#results").append("----<br>");
        }
*/        //alert("hello rand"+rand);
        //$("#results").append(rand + "<br>");
    }
    
    var pair = -1;
    $('#itr').children("div").each(function(i, obj) {
        var clazzes = $(this).attr('class');
        var idx = clazzes.replace ( /[^\d.]/g, '' );
        //if(idx%2==0 ) {  pair++;  }
        //$(this).attr("res",pair);

        pair++;
        $(this).attr("res",pics[pair]  );

        console.log(idx + " <----- idx%2 = " + idx%2  + " pair  " + pair+ "   " +$(this).attr('class'));
    });

}
