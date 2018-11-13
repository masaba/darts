// HELPER FUNCTIONS
// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
  $('html,body').scrollTop(0);
	$(".slide").hide();3
	// Show just the slide we want to show
	$("#"+id).show();
}



// Shuffle array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Update text input
function updateTextInput(val,ID) {
   document.getElementById(ID).value=val;
   rating = document.getElementById(ID).value;
}

// function showTrial(trialname) {

//   var newSlide = $('<div/>', {
//       id: 'trial'+trialname,
//       class: "slide",
//   });

// SlideName = 'trial'+trialname;

//     var imageDiv = $('<div/>', {
//         id: 'trial' + trialname,
//         class: "trial",
//     });

//     imageDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
//     //'<center> <a href = "http://web.stanford.edu/~masaba/TEDEstimation/"\n' +
//     '<center><img src="http://web.stanford.edu/~masaba/Estimation/images/trial_pictures/'+trialname+'.jpg" height="300" width="600" alt="Stanford University"</center>\n');
//       newSlide.append(imageDiv);

//       var QuestionDiv = $('<div/>', {
//         id: 'question' + trialname,
//         class: "question",
//     });

//     QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
//                           '<p class="block-text"><center>How long would it take to do this (in seconds)?</center></p></div>');
// newSlide.append(QuestionDiv);
   
//       var ScaleDiv = $('<div/>', {
//         id: 'scale' + trialname,
//         class: 'scale',
//     });


//   ScaleDiv.html('<div style="width: 800px; margin: 0 auto; text-align: center; "></div>\n' +
//     '<base href="https://user-content-dot-custom-elements.appspot.com/PolymerElements/paper-slider/v1.0.14/paper-slider/">\n'+
//     //'<script src="https://user-content-dot-custom-elements.appspot.com/PolymerElements/paper-slider/v1.0.14/paper-slider/webcomponentsjs/webcomponents-lite.js"></script>\n'+
//         '<script src="../webcomponentsjs/webcomponents-lite.js"></script>\n'+
//    '<link rel="import" href="paper-slider.html">\n'+
//     '<center><paper-slider id="slider'+trialname+'" width="500" min="0" max="100" value="0" markers = ["0","100","200","300","400","500"] pin editable value = "aria-valuenow" maxMarkers=5></paper-slider></center><br><br>\n'+
//     '<style is="custom-style">\n'+
//         'paper-slider{\n'+
//           '--paper-slider-knob-color: var(--paper-blue-500);\n'+
//           '--paper-slider-active-color: var(--paper-blue-500);\n'+
//           '--paper-slider-height: 10px;\n'+
//           'width: 600px;}</style>');
  
//   newSlide.append(ScaleDiv);

//       var CounterDiv = $('<div/>', {
//         id: 'counter' + trialname,
//         class: "counter",
//     });

//   CounterDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
//                       '<p class="block-text"><center>'+(experiment.order_trials.length+1)+'/60 Trials</div>');

// newSlide.append(CounterDiv);

//   var ButtonDiv = $('<div/>', {
//         id: 'button',
//         class: 'button',
//     });

//   ButtonDiv.html('<button type="button" onclick="this.blur(); saveEstimate();">Continue</button>');
// newSlide.append(ButtonDiv);

// var errorMessDiv = $('<div/>', {
//         id: 'errorMessage' + trialname,
//         class: 'errorMessage',
//     });

//   errorMessDiv.html('<div <tr><td align="center">\n' +
//       '<center><div id="error_att'+trialname+'"></div></center>\n' +
//       '</td></tr>\n' +
//       '<br><br>');

// newSlide.append(errorMessDiv);

// $("body").append(newSlide);
// showSlide(SlideName);

// }

function saveRating() {
slidstring = "rating";
element = slidstring.concat(experiment.curr_trial);
rating = document.getElementById(element).value;

errorId = "#error_att";
errorIdTrial = errorId.concat(experiment.curr_trial);

if (rating == 50) {
     $(errorIdTrial).html('<font color="red">' + 
           'Please make a response!' + 
           '</font>');
}

else {
experiment.trial_responses.push(rating);
experiment.order_trials.push(experiment.curr_trial);
experiment.next();
}
}

function submitDemographics(){
  data = $('#demographicsForm').serializeArray();  
  experiment.demographics.push(data);
  experiment.end();
}


function showObservationTrial(trialname, charname, boardtype) {

  var newSlide = $('<div/>', {
      id: 'trial'+trialname,
      class: "slide",
  });

ObservationSlideName = 'trial'+trialname;

  var IntroDiv = $('<div/>', {
        id: 'intro' + trialname,
        class: "intro",
    });

    IntroDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>This is '+charname+'. '+charname+' is trying this dart board.</center></p></div>');

      newSlide.append(IntroDiv);


    var imageDiv = $('<div/>', {
        id: 'trial' + trialname,
        class: "trial",
    });

    imageDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
    //'<center> <a href = "http://web.stanford.edu/~masaba/TEDEstimation/"\n' +
    '<center><table style="width:100%">\n' +
    '<tr>\n' +
       
      '<img src="images/people/'+charname+'.jpg" alt="one" style="width:20%">\n' +

       // '<td>\n' +
       //   '<div class="column">\n' +
        '<img src="images/dartboards/'+boardtype+'.png" alt="one" style="width:50%">\n' +
      //  '</div>\n' +

       //   '<div class="column">\n' +
          '<img src="images/other/green_mark.png" alt="green" style="width:20%" vspace="40" >\n' +
      '</td>\n' +
    '</tr>\n' +
  '</table>\n');

   newSlide.append(imageDiv);

      var QuestionDiv = $('<div/>', {
        id: 'question' + trialname,
        class: "question",
    });

    QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>Did '+charname+' fail or succeed?</center></p></div>');


newSlide.append(QuestionDiv);
   
      var RadioDiv = $('<div/>', {
        id: 'scale' + trialname,
        class: 'scale',
    });


  RadioDiv.html('<div style="width: 800px; margin: 0 auto; text-align: center; "></div>\n' +
    '<center><input type="radio" name="gender" value="fail"> Fail\n' +
    '<input type="radio" name="gender" value="succeed"> Succeed<br>');
  
  newSlide.append(RadioDiv);

    //   var CounterDiv = $('<div/>', {
    //     id: 'counter' + trialname,
    //     class: "counter",
    // });

  var observeButtonDiv = $('<div/>', {
        id: 'observebutton',
        class: 'button',
    });

  observeButtonDiv.html('<br><br><br><button type="button" onclick="this.blur(); experiment.next();">Continue</button>');
newSlide.append(observeButtonDiv);

// var errorMessDiv = $('<div/>', {
//         id: 'errorMessage' + trialname,
//         class: 'errorMessage',
//     });

//   errorMessDiv.html('<div <tr><td align="center">\n' +
//       '<center><div id="error_att'+trialname+'"></div></center>\n' +
//       '</td></tr>\n' +
//       '<br><br>');

// newSlide.append(errorMessDiv);

$("body").append(newSlide);
showSlide(ObservationSlideName);

}

function showRatingTrial(trialname, charname, boardtype) {

  var newRatingSlide = $('<div/>', {
      id: 'ratingtrial'+trialname,
      class: "slide",
  });

RatingSlideName = 'ratingtrial'+trialname;

  var IntroDiv = $('<div/>', {
        id: 'ratingintro' + trialname,
        class: "ratingintro",
    });

    IntroDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>Now '+charname+' is going to try this dart board.</center></p></div>');

      newRatingSlide.append(IntroDiv);


    var imageDiv = $('<div/>', {
        id: 'trial' + trialname,
        class: "trial",
    });

    imageDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
    //'<center> <a href = "http://web.stanford.edu/~masaba/TEDEstimation/"\n' +

        '<center><img src="images/dartboards/'+boardtype+'.png" alt="one" style="width:50%">');
          
   newRatingSlide.append(imageDiv);

      var QuestionDiv = $('<div/>', {
        id: 'question' + trialname,
        class: "question",
    });

    QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>How likely is it that '+charname+' will fail or succeed on this board?</center></p></div>');
newRatingSlide.append(QuestionDiv);
   
      var SlideDiv = $('<div/>', {
        id: 'slider' + trialname,
        class: 'ratingslider',
    });

      SlideDiv.html('<div style="width: 500px; margin: 0 auto; padding: 20px 15px 10px 10px">\n' +
                    '<div class="slidecontainer">\n'+
                    '<span class="leftlabel">Definitely Fail</span>\n'+
                    '<input type="range" class="slider" min="1" max="100" step="0.1" value="50" id="rating'+trialname+'"></div>\n' +
                    '<span class="rightlabel">Definitely Succeed</span>\n');

  newRatingSlide.append(SlideDiv);


  var ButtonDiv = $('<div/>', {
        id: 'button',
        class: 'button',
    });

  ButtonDiv.html('<br><br><br><button type="button" onclick="this.blur(); saveRating();">Continue</button>');
newRatingSlide.append(ButtonDiv);

var errorMessDiv = $('<div/>', {
        id: 'ratingerrorMessage' + trialname,
        class: 'errorMessage',
    });

  errorMessDiv.html('<div <tr><td align="center">\n' +
      '<center><div id="error_att'+trialname+'"></div></center>\n' +
      '</td></tr>\n' +
      '<br><br>');

newRatingSlide.append(errorMessDiv);

$("body").append(newRatingSlide);
showSlide(RatingSlideName);

}

//MAIN EXPERIMENT
showSlide("instructions");

var char_names = shuffle(["Kara", "Kara",
"Anne","Anne", "Keli","Keli", "Neil", "Neil","Suzy","Suzy"]); //all 4 characters
var observed_board = shuffle(["1","2","3","4","5"]); //fix this
var rating_board = shuffle(["1","3","5","1","3"]); //fix this
var random_num = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

var amount_observe = shuffle([1, 3]);

var trial_order = []

for (i = 0; i < char_names.length; i++) {
  char = char_names[i];
  observed = observed_board[i];
  rating = rating_board[i];
  trial = char + "_" + observed + "_" + rating;
  trial_order.push(trial);
  }

var trialtype_order= ["observe","rate",
                      "observe","rate",
                      "observe","rate",
                      "observe","rate",
                      "observe","rate"]

var experiment = {

  // An array to store the data that we're collecting.

  demo_left: ["demo_1", "demo_2", "demo_3"],
  order_trials: [],
  trial_responses: [],
  demographics: [],
  curr_trial: '',
  curr_char: '',
  curr_trial_type: '',
  curr_observed_board: '',
  curr_rating_board: '',
  trials_left: trial_order,
  trial_type: trialtype_order,
  // The function that gets called when the sequence is finished.

next: function() {

if (experiment.demo_left.length > 0) {
experiment.curr_trial = experiment.demo_left.shift();
showSlide(experiment.curr_trial);
}

else if (experiment.trial_type[0] == "observe"){
experiment.curr_trial = experiment.trials_left[0];
experiment.curr_char = experiment.curr_trial.substr(0,4);
experiment.observed_board = experiment.curr_trial.substr(5,1);
experiment.rating_board = experiment.curr_trial.substr(7,1);

experiment.trial_type.shift();
showObservationTrial(experiment.curr_trial, experiment.curr_char, experiment.observed_board);
}

//else if (experiment.trials_left.length > 0 && experiment.trial_type[0] == "rate")  {
else if (experiment.trial_type[0] == "rate"){
    experiment.trial_type.shift();
    experiment.trials_left.shift();
    showRatingTrial(experiment.curr_trial, experiment.curr_char, experiment.rating_board);
 
}

else {
showSlide("demographics");
}

},

end: function() {
    // Show the finish slide.
    showSlide("finished");
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    // setTimeout(function() { turk.submit(experiment) }, 1500);
    turk.submit(experiment)
    // $.post("http://localhost:8888", JSON.stringify(experiment));
  },
}
