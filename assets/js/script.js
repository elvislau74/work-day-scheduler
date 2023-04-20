$(function () {
  var buttonEl = $('.btn');
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

  init();

  buttonEl.on('click', function() {
    var text = $(this).siblings('.description').val();
    var parentEl = $(this).parent().attr('id');
    
    localStorage.setItem(parentEl, text);

    var confirmationMessage = $('#confirm-message');
    var storageMessage = $('.storage-message');
    var checkMark = $('.checkmark');

    confirmationMessage.css('color', 'black')
    storageMessage.css('color', 'red')
    checkMark.css('color', 'green');

    function messageTimeout(){
      confirmationMessage.css('color', 'transparent');
      storageMessage.css('color', 'transparent');
      checkMark.css('color', 'transparent')
    }

    setTimeout(messageTimeout, 2000);
  });
  
  displayDateAndTime();
  setInterval(displayDateAndTime, 1000);

});
