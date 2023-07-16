/* Wrap all code that interacts with the DOM in a call to jQuery to ensure that
 the code isn't run until the browser has finished rendering all the elements
in the html. */
$(document).ready(function () {

/* created a for loop to append time blocks to the container and assign them the proper id's and times for each block.  declared an array with a set length to ensure that the loop stops at the proper number.  Made sure to change certain variables as needed when certain numbers were reached.*/

  let hours = new Array(18);
  let amPM = "AM";  
  var timeNumber = 9;

  for (x = 9; x < hours.length; x++) {
    if (x >= 12) {
        amPM = "PM"
    }
    if (x === 13) {
      timeNumber = 1;
    }
    $('.container-fluid').append(`<div id="hour-${x}" class="row time-block">
                                    <div class="col-2 col-md-1 hour text-center py-3">${timeNumber}${amPM}</div>
                                    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
                                    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                                      <i class="fas fa-save" aria-hidden="true"></i>
                                    </button>
                                    </div>`);
                                    timeNumber++;
  }

  /* add a click listener event to get input from the user in the text area by looking amongst the siblings of saveBtn for 'textarea' and then taking the val of that.  Also Get the id based on the hour of the time-block that is a parent to the save button for that hour. Lastly get the input and put it in local storage using the hour id as the key. Also added a pop-up that informs that the input has been saved then goes away after 2 seconds*/  
  var saved = document.getElementById('save-text');
  saved.style.visibility = "hidden";

  $('.saveBtn').click(function() {
    var inputText = $(this).siblings('textarea').val();
    var block = $(this).parent().attr('id');

    localStorage.setItem(block, inputText);
    saved.style.visibility = "visible";
    setTimeout(() => saved.style.visibility = "hidden", 2000)
    
  });

  /* Add a process to take items from local storage and display them in the text area of the proper block based on the id*/
  $('.time-block').each(function() {
    var timeBlock = $(this).attr('id');
    var savedText = localStorage.getItem(timeBlock);
 
    $(this).find('textarea').val(savedText);
  });


  /* declare a variable set to the hour of the day using dayjs.  Then split the id string and take the 2nd index value - so [1] - to get the number.  But since it's still a string value put that within parseInt to convert to an int value.  finally compare each parsed int value to the timeOfDay variable to see which class needs to be added to each time block. */
  var timeOfDay = dayjs().hour();

  $('.time-block').each(function() {
    var timeBlockId = parseInt($(this).attr('id').split('-')[1]);

    if (timeBlockId < timeOfDay) {
      $(this).addClass('past');
    } else if (timeBlockId === timeOfDay) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  /* added the current date to the header using dayjs */
  var currentDate = dayjs().format('dddd, MMMM DD YYYY');
  $('#currentDay').text(currentDate);
  
});
