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
      //do nothing

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
  failelement = failelement.concat(experiment.curr_observation);

  successstring = "successbutton";
  successelement = successstring.concat(experiment.curr_trial);
  successelement = successelement.concat(experiment.curr_observation);

  failresponse = document.getElementById(failelement).checked;
  successresponse = document.getElementById(successelement).checked;

  errorId = "#observe_error_att";
  errorIdTrial = errorId.concat(experiment.curr_trial);

  response = "";

  if (failresponse == false && successresponse == false) {
     $(errorIdTrial).html('<font color="red">' + 'Please make a response!' + '</font>');
  }

  else if (failresponse == true) {
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

function showOutcome(id) {
  document.getElementById(id).src = "images/other/green_mark.png"
}


function showObservationTrial(trialname, charname, boardtype, observation_num, outcome) {

  var newSlide = $('<div/>', {
      id: 'trial'+trialname+observation_num,
      class: "slide",
  });

  ObservationSlideName = 'trial'+trialname+observation_num;

  IntroName = 'intro' + trialname + observation_num;
  var IntroDiv = $('<div/>', {
        id: IntroName,
        class: "intro",
        style: "display:none"       
    });

    // change depending on trial 
    IntroDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>'+charname+' is trying this dart board...</center></p></div>');

    newSlide.append(IntroDiv);

    ImageSlideName2 = 'trial'+trialname + 'images2'+observation_num;
    var imageDiv2 = $('<div/>', {
        id: ImageSlideName2,
        class: "trial",
        style: "display:none"
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

  WaitName = 'wait' + trialname + observation_num;

  var WaitDiv = $('<div/>', {
        id: WaitName,
        class: "wait",
        style: "display:none"       
    });

    // change depending on trial 
    WaitDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>Wait to see how '+charname+' does...</center></p></div>');
    

   newSlide.append(WaitDiv);

    // image slide
    ImageSlideName = 'trial'+trialname + 'images'+observation_num;
    var imageDiv = $('<div/>', {
        id: ImageSlideName,
        class: "trial",
        style: "display:none"
    });

    imageDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px">\n' +
    //'<center> <a href = "http://web.stanford.edu/~masaba/TEDEstimation/"\n' +
  
          '<center><img src="images/other/'+outcome+'.png" id="outcome" alt="green" style="width:100px" ></center>\n');

   newSlide.append(imageDiv);

    QuestionSlideName = 'question' + trialname+observation_num;
      var QuestionDiv = $('<div/>', {
        id: QuestionSlideName,
        class: "question",
        style: "display:none"

    });

    QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>Did '+charname+' fail or succeed?</center></p></div>');


  newSlide.append(QuestionDiv);
     
        RadioSlideName = 'scale' + trialname + observation_num;
        RadioID = trialname + observation_num;

        var RadioDiv = $('<div/>', {
          id: RadioSlideName,
          class: 'scale',
          style: "display:none"

      });


  RadioDiv.html('<div style="width: 800px; margin: 0 auto; text-align: center; "></div>\n' +
    '<center><input type="radio" name="gender" value="fail" id="failbutton'+RadioID+'"> Fail\n' +
    '<input type="radio" name="gender" value="succeed" id="successbutton'+RadioID+'"> Succeed<br>');
  
  newSlide.append(RadioDiv);

    //   var CounterDiv = $('<div/>', {
    //     id: 'counter' + trialname,
    //     class: "counter",
    // });

         ButtonSlideName = 'button' + trialname + observation_num;
 
  var observeButtonDiv = $('<div/>', {
        id: ButtonSlideName,
        class: 'button',
        style: "display:none"

    });

  observeButtonDiv.html('<br><button type="button" onclick="this.blur(); saveObservationButton();">Continue</button>');
 
  newSlide.append(observeButtonDiv);

  var errorMessDiv = $('<div/>', {
        id: 'observeerrorMessage' + trialname + observation_num,
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
      $('#' + IntroName).show()
      // alert('1 second passed')
    },500);

setTimeout(function(){
      $('#' + ImageSlideName2).show()
      // alert('1 second passed')
    },1500);


setTimeout(function(){
      $('#' + WaitName).show()
      // alert('1 second passed')
    },1500);

setTimeout(function(){
      $('#' + ImageSlideName).show()
      $('#' + QuestionSlideName).show()
      $('#' + RadioSlideName).show()
      $('#' + ButtonSlideName).show()

      // alert('1 second passed')
    },4000);

// $(document).ready(function(){
//     $("button").click(function(){
//         $("p").show();
//     });
// });

}

function showRatingTrial(trialname, charname, boardtype) {

  var newRatingSlide = $('<div/>', {
      id: 'ratingtrial'+trialname,
      class: "slide",
  });

RatingSlideName = 'ratingtrial'+trialname;

IntroName = 'ratingintro' + trialname;

  var IntroDiv = $('<div/>', {
        id: IntroName,
        class: "ratingintro",
        style: "display:none",

    });

    IntroDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>Now '+charname+' is going to try this dart board.</center></p></div>');

      newRatingSlide.append(IntroDiv);


    ImageName = 'ratingimage' + trialname;

    var imageDiv = $('<div/>', {
        id: ImageName,
        class: "trial",
        style: "display:none",
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

QuestionName = 'ratingquestion' + trialname;

      var QuestionDiv = $('<div/>', {
        id: QuestionName,
        class: "question",
        style: "display:none",
    });

    QuestionDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
                          '<p class="block-text"><center>How likely is it that '+charname+' will fail or succeed on this board?</center></p></div>');

newRatingSlide.append(QuestionDiv);


SlideTextName = 'textslider' + trialname;

var SlideTextDiv = $('<div/>', {
        id: SlideTextName,
        class: 'textratingslider',
        style: "display:none",
    });

SlideTextDiv.html('<div style="width: 500px; margin: 0 auto; padding: 20px 15px 10px 10px">\n' +
                  '<table style="width:100%"><tr>\n'+
                  '<th align="left">Definitely Fail</th>\n'+
                  '<th align="right">Definitely Succeed</th>\n'+
                  '</tr>');

newRatingSlide.append(SlideTextDiv);

RatingName = 'ratingslider' + trialname;

      var SlideDiv = $('<div/>', {
        id: RatingName,
        class: 'ratingslider',
        style: "display:none",
    });

      SlideDiv.html('<div style="width: 500px; margin: 0 auto; padding: 20px 15px 10px 10px">\n' +
                   // '<div class="slidecontainer">\n'+
                   // '<span>Definitely Fail</span>\n'+
                    '<input type="range" class="slider" min="1" max="100" step="0.1" value="50" id="rating'+trialname+'"></div>');

  newRatingSlide.append(SlideDiv);

ButtonName = 'ratingbutton' + trialname;

  var ButtonDiv = $('<div/>', {
        id: ButtonName,
        class: 'button',
        style: "display:none",
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

setTimeout(function(){
      $('#' + IntroName).show()
      // alert('1 second passed')
    },500);


setTimeout(function(){
      $('#' + ImageName).show()
      // alert('1 second passed')
    },1500);

setTimeout(function(){
      $('#' + QuestionName).show()
      $('#' + SlideTextName).show()
      $('#' + RatingName).show()
      $('#' + ButtonName).show()
      // alert('1 second passed')
    },3500);
}

//MAIN EXPERIMENT
showSlide("instructions");

//character names 
var char_names = shuffle(["Kara", "Anne", "Keli", "Suzy", "Emma", "Zoey", "Nora", "Ruby","Lucy",
                        "Sara", "Eden", "Bria", "Nina", "Tess", "Mimi", "Maia", "Erin","Jane",
                        "Neil", "Noah", "Liam", "Owen", "Alan","Ryan", "Adam", "Luis","Bret",
                        "Evan", "Eric", "Jack", "John", "Theo", "Cody", "Carl", "Josh","Lars"])

//observed board difficulty: 1 = most difficult, 5 = least difficult
var observed_board = shuffle(["1","1","1","1","1","1","1","1","1","1","1","1",
                              "3","3","3","3","3","3","3","3","3","3","3","3",
                              "5","5","5","5","5","5","5","5","5","5","5","5"]);

// rating board difficulty: 1 = most difficult, 5 = least difficult
var rating_board = shuffle(["1","1","1","1","1","1","1","1","1","1","1","1",
                            "3","3","3","3","3","3","3","3","3","3","3","3",
                            "5","5","5","5","5","5","5","5","5","5","5","5"]); 


// # of observations: 1 or 3 trials observed
var amount_observe = shuffle(["1","1","1","1","1","1","1","1","1","1","1","1",
                              "1","1","1","1","1","1","3","3","3","3","3","3",
                              "3","3","3","3","3","3","3","3","3","3","3","3"]); // 

var outcome_type = shuffle(["succ", "succ", "succ", "succ", "succ", "succ",
                            "succ", "succ", "succ", "succ", "succ", "succ",
                            "succ", "succ", "succ", "succ", "succ", "succ",
                            "fail", "fail", "fail", "fail", "fail", "fail",
                            "fail", "fail", "fail", "fail", "fail", "fail",
                            "fail", "fail", "fail", "fail", "fail", "fail"]);
// make each trial
// example: Kara_1_3_1 (observed board = 1; rating board = 3; amount of observations = 1)

var trial_order = []
for (i = 0; i < char_names.length; i++) {
  char = char_names[i];
  observed = observed_board[i];
  rating = rating_board[i];
  amount = amount_observe[i];
  outcome = outcome_type[i];

  trial = char + "_" + observed + "_" + rating + "_" + amount + "_" + outcome;
  trial_order.push(trial);

  }

var trialtype_order = [];
var observetrial_num = [];
for (i=0; i < trial_order.length; i++) {
  if (trial_order[i].substr(9,1) == "1") {
    trialtype_order.push("observe")
    observetrial_num.push("1")
    trialtype_order.push("rate")
  }

  else {
    trialtype_order.push("observe")
    observetrial_num.push("1")

    trialtype_order.push("observe")
    observetrial_num.push("2")

    trialtype_order.push("observe")
    observetrial_num.push("3")

    // trialtype_order.push("observe")
    // observetrial_num.push("4")

    // trialtype_order.push("observe")
    // observetrial_num.push("5")

    trialtype_order.push("rate")
  }
}

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
  curr_outcome: '',

  trials_left: trial_order,
  observetrial_left: observetrial_num,
  trial_type: trialtype_order, 

  // The function that gets called when the sequence is finished.

  next: function() {

    if (experiment.demo_left.length > 0) {
      showSlide(experiment.demo_left[0]);
    }

    else if (experiment.trial_type[0] == "observe"){

      experiment.curr_trial = experiment.trials_left[0];

      experiment.curr_char = experiment.curr_trial.substr(0,4);
      experiment.curr_observed_board = experiment.curr_trial.substr(5,1);
      experiment.curr_outcome = experiment.curr_trial.substr(11,4);
      experiment.curr_observation = experiment.observetrial_left.shift();

      experiment.trial_type.shift();

      showObservationTrial(experiment.curr_trial, experiment.curr_char, experiment.curr_observed_board, experiment.curr_observation, experiment.curr_outcome);
    }

  //else if (experiment.trials_left.length > 0 && experiment.trial_type[0] == "rate")  {
    else if (experiment.trial_type[0] == "rate"){
      experiment.rating_board = experiment.curr_trial.substr(7,1);
      
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
