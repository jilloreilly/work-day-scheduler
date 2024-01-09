$(document).ready(function() {

  // Display date and time 
  function displayTime() {
    $('#currentDay').text(dayjs().format('dddd, MMMM, D, YYYY'));
    $('#currentTime'). text(dayjs().format('HH:mm:ss'));
  }

  setInterval(displayTime, 1000); // set interval runs the function every second otherwise will need to refresh the page

  // Color-code each timeblock based on past, present, and future when the timeblock is viewed.
  function updateHour() {
    let currentHour = dayjs().hour();
    let timeblocks = $('.time-block');
    
    timeblocks.each(function() {
      let blockHour = parseInt($(this).attr('id'));
        
      if (currentHour > blockHour) {
        $(this).addClass('past');
      } else if (currentHour === blockHour){
        $(this).removeClass('past').addClass('present');
      } else if (currentHour < blockHour){
        $(this).addClass('future');
      }
    });
  };

  // call the updateHour function
  updateHour();

  setInterval(updateHour, 15000) // Update every hour (15000 milliseconds)
  
  // Save task to localstorage 
  $('.saveBtn').click(function() {
    const description = $($(this).siblings('.description')).val();

    if (description) { // Only save to localstorage is there is text in the textarea
      const currentBlockHour = $(this).parent().attr('id');
      const latestTask = {currentBlockHour, description};
      let taskList = JSON.parse(localStorage.getItem('savedTasks')) || [];
      taskList.push(latestTask);
      localStorage.setItem('savedTasks', JSON.stringify(taskList));  
    }
  });

  // Load any saved data from localStorage
  function displayTasks() {
    const arrayTasks = JSON.parse(localStorage.getItem("savedTasks"));
    
    if (arrayTasks) {
      const findHour = $('.time-block');
  
      findHour.each(function(index) {
        let hourBlock = parseInt($(this).attr('id'));

        for (let i = 0; i < arrayTasks.length; i++) {
          if (hourBlock == arrayTasks[i].currentBlockHour) {
            var hourBlockId = '#' + hourBlock;
            $(hourBlockId).children('.description').val(arrayTasks[i].description);
          }
        }
      });
    }
  };
  
  displayTasks();

  // Function to clear tasks from page and from localstorage
  $('.clearBtn').click(function() {
    $('.description').val(''); // Clear tasks from page
    localStorage.clear(); // Empty localstorage
  });

});

