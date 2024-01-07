// Display the current day at the top of the calender when a user opens the planner.

// Present timeblocks for standard business hours when the user scrolls down.

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page

// Optional - save all button
// Optional - clear all button
// Optional - clear button for each day


$(document).ready(function() {

  function displayTime() {
    $('#currentDay').text(dayjs().format('dddd, MMMM, D, YYYY'));
    $('#currentTime'). text(dayjs().format('HH:mm:ss'));
  }

  setInterval(displayTime, 1000); // set interval runs the function every second otherwise will need to refresh the page

  function updateHour() {
    // grab the current hour using dayjs

    // Grab the class for the time blocks and store them in a variable

    // Using jquery .each method parse the ID for each timeblock and compare the block hour to the current time, adding the class
    // based on if its in the past, future or present
    let currentHour = dayjs().hour();
    console.log(`currentHour: ${currentHour}`);
    let timeblocks = $('.time-block');
        
    // jQuery .each method to loop over objects
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

    if (description) { // Only save to localstorage is there is a description
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
        //const hour = arrayTasks[index].currentBlockHour;
        //const taskDescription = arrayTasks[index].description;
  
        // Update the current taskHour element based on index
        const taskHour = parseInt($(this).attr('id'));
  
        // Update the input field with the task description
        //$(taskHour).children('.description').val(taskDescription);

        for (let i = 0; i < arrayTasks.length; i++) {
          if (taskHour === arrayTasks[i].currentBlockHour ) {
            $(taskHour).children('.description').val(arrayTasks[i].description);  
              console.log('for loop');
            }    
          }
  
      });
    }
  }
  
  displayTasks();

  // Function to clear tasks from page and from localstorage
  $('.clearBtn').click(function() {
    $('.description').val(''); // Clear tasks from page
    localStorage.clear(); // Empty localstorage
  });

});

