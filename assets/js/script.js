$(function () {
  // assigned classes and id's to variables
  var buttonEl = $('.btn');
  var dateAndTime = $('#currentDay')
  // create variable to hold current hour of the day
  var currentHour = dayjs().format('HH');
  // create an array of objects holding id's and relating hour numbers of each div holding time blocks
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

  // function will display the current date and time on top of the page
  function displayDateAndTime() {
  var currentDateAndTime = dayjs();
  $(dateAndTime).text(currentDateAndTime.format('[Today is] dddd, MMMM D, YYYY, h:mm:ss a'))
  }

  // loops over all the time blocks to check which one matches the current hour of the day
  // if the time block number is less than, greater than or equal to the current hour, it will add a class while removing all the other classes (past, present or future), which will color code all the time blocks based on the current time
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

  // this function grabs the data saved in local storage from user entry and paste them in each time block, essentially saving them on the page even on reload
  function init(){
    $('#hour-9').children('.description').val(localStorage.getItem('hour-9'));
    $('#hour-10').children('.description').val(localStorage.getItem('hour-10'));
    $('#hour-11').children('.description').val(localStorage.getItem('hour-11'));
    $('#hour-12').children('.description').val(localStorage.getItem('hour-12'));
    $('#hour-13').children('.description').val(localStorage.getItem('hour-13'));
    $('#hour-14').children('.description').val(localStorage.getItem('hour-14'));
    $('#hour-15').children('.description').val(localStorage.getItem('hour-15'));
    $('#hour-16').children('.description').val(localStorage.getItem('hour-16'));
    $('#hour-17').children('.description').val(localStorage.getItem('hour-17'));
  }

  // calls the init function
  init();

  // on click, this event listener will take the data entered into each text field and store it into local storage for later use
  buttonEl.on('click', function() {
    var text = $(this).siblings('.description').val();

    // parentEL variable will take the button's parent element ids to be used as a key for each text field
    var parentEl = $(this).parent().attr('id');
    
    localStorage.setItem(parentEl, text);

    // create variables that grab the confirmation message to be used after button is pressed
    var confirmationMessage = $('#confirm-message');
    var storageMessage = $('.storage-message');
    var checkMark = $('.checkmark');

    // after button is pressed, the confirmation message, storage message and checkmark will have their colors changed to be visible
    confirmationMessage.css('color', 'black')
    storageMessage.css('color', 'red')
    checkMark.css('color', 'green');

    // this function will allow the message to disappear from the page by making the text transparent
    function messageTimeout(){
      confirmationMessage.css('color', 'transparent');
      storageMessage.css('color', 'transparent');
      checkMark.css('color', 'transparent')
    }

    // this method will time out two seconds after the button is pressed and call the messageTimeout function to be used to erase the confirmation message
    setTimeout(messageTimeout, 2000);
  });

  // calls the function that will display the date and time above the page in the heading
  displayDateAndTime();

  // allows the time displayed above to increment up by each second
  setInterval(displayDateAndTime, 1000);

});