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

  /* Get input from the user in the text area.  Also Get the id based on the hour of the time-block that is a parent to the save button for that hour. Lastly get the input and put it in local storage using the hour id as the key. */
  $('.saveBtn').click(function() {
    var inputText = $(this).siblings('textarea').val();
    var block = $(this).parent().attr('id');

    localStorage.setItem(block, inputText);
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Get the current hour in 24-hour time using Day.js
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format('dddd, MMMM DD YYYY');
  $('#currentDay').text(currentDate);     
});
