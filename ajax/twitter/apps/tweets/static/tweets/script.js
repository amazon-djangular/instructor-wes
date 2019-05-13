$(document).ready(function() {
  $.get('/tweets/ajax/', function(data) {
    console.log(data);
    console.log(JSON.parse(data)[0].fields);
  })
})