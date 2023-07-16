// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

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

  
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Get the current hour in 24-hour time using Day.js

  /* declare a variable set to the hour of the day using dayjs.  Then split the id string and take the 2nd index value - so [1] - to get the number.  But since it's still a string value put that within parseInt to convert to an int value.  finally compare each parsed int value to the timeOfDay variable to see which class needs to be added to each time block. */
  var timeOfDay = dayjs().hour();
  console.log(timeOfDay)

  $('.time-block').each(function() {
    var timeBlockId = parseInt($(this).attr('id').split('-')[1]);
    console.log(timeBlockId);

    if (timeBlockId < timeOfDay) {
      $(this).addClass('past');
    } else if (timeBlockId === timeOfDay) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format('dddd, MMMM DD YYYY');
  $('#currentDay').text(currentDate);     
});
