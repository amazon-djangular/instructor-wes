$(document).ready(function() {
  $('#click-me').click(function() {
    $.get('https://swapi.co/api/people', function(data) {
      console.log(data);
    });
  });
});