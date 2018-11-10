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

function showTrial(trialname) {

  var newSlide = $('<div/>', {
      id: 'trial'+trialname,
      class: "slide",
  });

SlideName = 'trial'+trialname;

    var imageDiv = $('<div/>', {
        id: 'trial' + trialname,
        class: "trial",
    });

    imageDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
    //'<center> <a href = "http://web.stanford.edu/~masaba/TEDEstimation/"\n' +
    '<center><img src="http://web.stanford.edu/~masaba/Estimation/images/trial_pictures/'+trialname+'.jpg" height="300" width="600" alt="Stanford University"</center>\n');
      newSlide.append(imageDiv);

      var QuestionDiv = $('<div/>', {
        id: 'question' + trialname,
        class: "question",
    });

    QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>How long would it take to do this (in seconds)?</center></p></div>');
newSlide.append(QuestionDiv);
   
      var ScaleDiv = $('<div/>', {
        id: 'scale' + trialname,
        class: 'scale',
    });


  ScaleDiv.html('<div style="width: 800px; margin: 0 auto; text-align: center; "></div>\n' +
    '<base href="https://user-content-dot-custom-elements.appspot.com/PolymerElements/paper-slider/v1.0.14/paper-slider/">\n'+
    //'<script src="https://user-content-dot-custom-elements.appspot.com/PolymerElements/paper-slider/v1.0.14/paper-slider/webcomponentsjs/webcomponents-lite.js"></script>\n'+
        '<script src="../webcomponentsjs/webcomponents-lite.js"></script>\n'+
   '<link rel="import" href="paper-slider.html">\n'+
    '<center><paper-slider id="slider'+trialname+'" width="500" min="0" max="100" value="0" markers = ["0","100","200","300","400","500"] pin editable value = "aria-valuenow" maxMarkers=5></paper-slider></center><br><br>\n'+
    '<style is="custom-style">\n'+
        'paper-slider{\n'+
          '--paper-slider-knob-color: var(--paper-blue-500);\n'+
          '--paper-slider-active-color: var(--paper-blue-500);\n'+
          '--paper-slider-height: 10px;\n'+
          'width: 600px;}</style>');
  
  newSlide.append(ScaleDiv);

      var CounterDiv = $('<div/>', {
        id: 'counter' + trialname,
        class: "counter",
    });

  CounterDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                      '<p class="block-text"><center>'+(experiment.order_trials.length+1)+'/60 Trials</div>');

newSlide.append(CounterDiv);

  var ButtonDiv = $('<div/>', {
        id: 'button',
        class: 'button',
    });

  ButtonDiv.html('<button type="button" onclick="this.blur(); saveEstimate();">Continue</button>');
newSlide.append(ButtonDiv);

var errorMessDiv = $('<div/>', {
        id: 'errorMessage' + trialname,
        class: 'errorMessage',
    });

  errorMessDiv.html('<div <tr><td align="center">\n' +
      '<center><div id="error_att'+trialname+'"></div></center>\n' +
      '</td></tr>\n' +
      '<br><br>');

newSlide.append(errorMessDiv);

$("body").append(newSlide);
showSlide(SlideName);

}

function saveEstimate() {
slidstring = "slider";
element = slidstring.concat(experiment.curr_trial);
estimate = document.getElementById(element).value;

errorId = "#error_att";
errorIdTrial = errorId.concat(experiment.curr_trial);

if (estimate == 0) {
     $(errorIdTrial).html('<font color="red">' + 
           'Please make a response!' + 
           '</font>');
}

else {
experiment.trial_responses.push(estimate);
experiment.order_trials.push(experiment.curr_trial);
experiment.next();
}
}

function submitDemographics(){
  data = $('#demographicsForm').serializeArray();  
  experiment.demographics.push(data);
  experiment.end();
}

//MAIN EXPERIMENT
showSlide("instructions");

var experiment = {

  // An array to store the data that we're collecting.
  order_trials: [],
  trial_responses: [],
  demographics: [],
  curr_trial: '',
  // The function that gets called when the sequence is finished.

next: function() {

showSlide("rating_page");
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
