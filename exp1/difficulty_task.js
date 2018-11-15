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

function saveDemoButton() {

failelement = experiment.demo_left[0].concat("fail");
successelement = experiment.demo_left[0].concat("succeed");

failresponse = document.getElementById(failelement).checked;
successresponse = document.getElementById(successelement).checked;

//errorId = "#observe_error_att";
//errorIdTrial = errorId.concat(experiment.curr_trial);

response = "";

if (failresponse == false && successresponse == false) {
  //   $(errorIdTrial).html('<font color="red">' + 
   //        'Please make a response!' + 
   //        '</font>');

}
    else if (failresponse == true){
  response = "fail";
  experiment.demo_responses.push(response);
  //experiment.order_trials.push(experiment.curr_trial);
    experiment.curr_trial = experiment.demo_left.shift();
  experiment.next();
 }
  else {
    response = "success";
    experiment.demo_responses.push(response);
      experiment.curr_trial = experiment.demo_left.shift();

   // experiment.order_trials.push(experiment.curr_trial);
    experiment.next();
  }

}


function saveObservationButton() {
failstring = "failbutton";
failelement = failstring.concat(experiment.curr_trial);

successstring = "successbutton";
successelement = successstring.concat(experiment.curr_trial);

failresponse = document.getElementById(failelement).checked;
successresponse = document.getElementById(successelement).checked;

errorId = "#observe_error_att";
errorIdTrial = errorId.concat(experiment.curr_trial);

response = "";

if (failresponse == false && successresponse == false) {
     $(errorIdTrial).html('<font color="red">' + 
           'Please make a response!' + 
           '</font>');
}
    else if (failresponse == true){
  response = "fail";
  experiment.observation_responses.push(response);
  //experiment.order_trials.push(experiment.curr_trial);
  experiment.next();
 }
  else {
    response = "success";
    experiment.observation_responses.push(response);
   // experiment.order_trials.push(experiment.curr_trial);
    experiment.next();
  }
}

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
experiment.rating_responses.push(rating);
experiment.order_trials.push(experiment.curr_trial);
experiment.next();
}
}

function submitDemographics(){
  data = $('#demographicsForm').serializeArray();  
  experiment.demographics.push(data);
  experiment.end();
}

function showOutcome() {
  document.getElementById("outcome");
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

    // change depending on trial 
    IntroDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>This is '+charname+'. '+charname+' is trying this dart board. Wait to see what happens...</center></p></div>');

    newSlide.append(IntroDiv);

    ImageSlideName2 = 'trial'+trialname + 'images2';
    var imageDiv2 = $('<div/>', {
        id: ImageSlideName2,
        class: "trial",
        //style: "display:none"
    });

    imageDiv2.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
    //'<center> <a href = "http://web.stanford.edu/~masaba/TEDEstimation/"\n' +

     
    '<center><table style="width:100%">\n' +
    '<tr>\n' +
       
      '<img src="images/people/'+charname+'.jpg" alt="one" style="width:100px">\n' +

       // '<td>\n' +
       //   '<div class="column">\n' +
        '<img src="images/dartboards/'+boardtype+'.png" alt="one" style="width:300px">\n' +
      //  '</div>\n' +

       //   '<div class="column">\n' +
         // '<img src="images/other/green_mark.png" alt="green" style="width:20%" vspace="40" >\n' +
      '</td>\n' +
    '</tr>\n' +
  '</table>\n');

    

   newSlide.append(imageDiv2);

    // image slide
    ImageSlideName = 'trial'+trialname + 'images';
    var imageDiv = $('<div/>', {
        id: ImageSlideName,
        class: "trial",
        style: "display:none"
    });

    imageDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px">\n' +
    //'<center> <a href = "http://web.stanford.edu/~masaba/TEDEstimation/"\n' +
  
          '<center><img src="images/other/green_mark.png" id="outcome" alt="green" style="width:100px" vspace="40"></center>\n');

   newSlide.append(imageDiv);

    QuestionSlideName = 'question' + trialname;
      var QuestionDiv = $('<div/>', {
        id: QuestionSlideName,
        class: "question",
        style: "display:none"

    });

    QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>Did '+charname+' fail or succeed?</center></p></div>');


  newSlide.append(QuestionDiv);
     
         RadioSlideName = 'scale' + trialname;
        var RadioDiv = $('<div/>', {
          id: 'scale' + trialname,
          class: 'scale',
          style: "display:none"

      });


  RadioDiv.html('<div style="width: 800px; margin: 0 auto; text-align: center; "></div>\n' +
    '<center><input type="radio" name="gender" value="fail" id="failbutton'+trialname+'"> Fail\n' +
    '<input type="radio" name="gender" value="succeed" id="successbutton'+trialname+'"> Succeed<br>');
  
  newSlide.append(RadioDiv);

    //   var CounterDiv = $('<div/>', {
    //     id: 'counter' + trialname,
    //     class: "counter",
    // });

         ButtonSlideName = 'button' + trialname;
  var observeButtonDiv = $('<div/>', {
        id: ButtonSlideName,
        class: 'button',
        style: "display:none"

    });

  observeButtonDiv.html('<br><button type="button" onclick="this.blur(); saveObservationButton();">Continue</button>');
  newSlide.append(observeButtonDiv);

  var errorMessDiv = $('<div/>', {
        id: 'observeerrorMessage' + trialname,
        class: 'errorMessage',
    });

  errorMessDiv.html('<div <tr><td align="center">\n' +
      '<center><div id="observe_error_att'+trialname+'"></div></center>\n' +
      '</td></tr>\n' +
      '<br><br>');

  newSlide.append(errorMessDiv);

  $("body").append(newSlide);

showSlide(ObservationSlideName);

setTimeout(function(){
      $('#' + ImageSlideName).show()
      $('#' + QuestionSlideName).show()
      $('#' + RadioSlideName).show()
      $('#' + ButtonSlideName).show()

      // alert('1 second passed')
    },1000);

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

     
    '<center><table style="width:100%">\n' +
    '<tr>\n' +
       
      '<img src="images/people/'+charname+'.jpg" alt="one" style="width:100px">\n' +

       // '<td>\n' +
       //   '<div class="column">\n' +
        '<img src="images/dartboards/'+boardtype+'.png" alt="one" style="width:300px">\n' +
      //  '</div>\n' +

       //   '<div class="column">\n' +
         // '<img src="images/other/green_mark.png" alt="green" style="width:20%" vspace="40" >\n' +
      '</td>\n' +
    '</tr>\n' +
  '</table>\n');


          
   newRatingSlide.append(imageDiv);

      var QuestionDiv = $('<div/>', {
        id: 'question' + trialname,
        class: "question",
    });

    QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>How likely is it that '+charname+' will fail or succeed on this board?</center></p></div>');
newRatingSlide.append(QuestionDiv);
   

var SlideTextDiv = $('<div/>', {
        id: 'textslider' + trialname,
        class: 'textratingslider',
    });

SlideTextDiv.html('<div style="width: 500px; margin: 0 auto; padding: 20px 15px 10px 10px">\n' +
                  '<table style="width:100%"><tr>\n'+
                  '<th align="left">Definitely Fail</th>\n'+
                  '<th align="right">Definitely Succeed</th>\n'+
                  '</tr>');
newRatingSlide.append(SlideTextDiv);

      var SlideDiv = $('<div/>', {
        id: 'slider' + trialname,
        class: 'ratingslider',
    });

      SlideDiv.html('<div style="width: 500px; margin: 0 auto; padding: 20px 15px 10px 10px">\n' +
                   // '<div class="slidecontainer">\n'+
                   // '<span>Definitely Fail</span>\n'+
                    '<input type="range" class="slider" min="1" max="100" step="0.1" value="50" id="rating'+trialname+'"></div>');

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

//character names 
var char_names = shuffle(["Kara", "Anne", "Keli", "Suzy", "Emma", "Zoey", "Nora", "Ruby",
                        "Sara", "Eden", "Bria", "Nina", "Tess", "Mimi", "Maia", "Erin",
                        "Neil", "Noah", "Liam", "Owen", "Alan","Ryan", "Adam", "Luis",
                        "Evan", "Eric", "Jack", "John", "Theo", "Cody", "Carl", "Josh"])

//observed board difficulty: 1 = most difficult, 5 = least difficult
var observed_board = shuffle(["1","3","5","1","5"]);

// rating board difficulty: 1 = most difficult, 5 = least difficult
var rating_board = shuffle(["1","3","5","1","5"]); 


// var random_num = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

var amount_observe = shuffle([1, 3]); // participants will see each agent attempt the dart board
var amount_rating = 1;

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

  demo_left: ["demo_1", "demo_2", "demo_3", "demo_4"],
  order_trials: [],

  //data
  rating_responses: [], //array for success likelihood ratings on each rating page
  observation_responses: [], //array for check questions on each observation page
  demo_responses: [], //darray for check questions on each demo page

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
  showSlide(experiment.demo_left[0]);
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
