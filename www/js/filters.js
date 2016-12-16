angular.module('starter.filters', []) 

// http://stackoverflow.com/questions/17289448/angularjs-to-output-plain-text-instead-of-html
  .filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  })

.filter("dateFilter", function() {
  return function(events, startDate, endDate) {
    var new_events = [];
    events.forEach(function(event){
        if (new Date(event.start_at.__text).getTime()>= new Date(startDate).getTime() 
            && new Date(event.start_at.__text).getTime() <= new Date(endDate).getTime()) {
              console.log("the fitting event is: ", event);
              new_events.push(event);
            }
    });
    return new_events;
  }
});

