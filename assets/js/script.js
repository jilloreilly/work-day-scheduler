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
    console.log(currentHour);
    let timeblocks = $('.time-block');
    console.log(timeblocks); // Object of timeblocks
    
    // jQuery .each method to loop over objects
    timeblocks.each(function() {
      let blockHour = parseInt($(this).attr('id'));
      console.log(blockHour);

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
  
  $('.saveBtn').click(function() {
    // Grab values of the text areas (class fof description)
    // Save the values to local storage using the IDs as the keys and the value of the textareas for the values
    const description = $('.description').val();
    console.log(description);
  })

  // Load any saved data from localStorage


});

