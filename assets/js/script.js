// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var dateAndTime = $('#currentDay')
  var currentHour = dayjs().format('HH');
  var timeSlots = [
    {idTime: $('#hour-9'), hour: 09},
    {idTime: $('#hour-10'), hour: 10},
    {idTime: $('#hour-11'), hour: 11},
    {idTime: $('#hour-12'), hour: 12},
    {idTime: $('#hour-13'), hour: 13},
    {idTime: $('#hour-14'), hour: 14},
    {idTime: $('#hour-15'), hour: 15},
    {idTime: $('#hour-16'), hour: 16},
    {idTime: $('#hour-17'), hour: 17},
  ];

  function displayDateAndTime() {
  var currentDateAndTime = dayjs();
  $(dateAndTime).text(currentDateAndTime.format('[Today is] dddd, MMMM D, YYYY, h:mm:ss a'))
  }

  $.each(timeSlots, function(index, value) {
    var hourId = value.idTime;
    if (value.hour < currentHour){
      $(hourId).removeClass('present');
      $(hourId).removeClass('future');
      $(hourId).addClass('past');
    }
    else if (value.hour == currentHour) {
      $(hourId).removeClass('past');
      $(hourId).removeClass('future');
      $(hourId).addClass('present');
    }
    else {
      $(hourId).removeClass("past");
      $(hourId).removeClass("present");
      $(hourId).addClass("future");
    }
  });
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  displayDateAndTime();
  setInterval(displayDateAndTime, 1000);

});
