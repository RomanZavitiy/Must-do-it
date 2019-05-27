document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady() {
    // Now safe to use device APIs
    console.log('ready!');
    
    var onSuccess = function(position) {

        
        // + "&WZGIIbfVZZ0ypeA0QuF0NQ677Kwauew1"
        var link = "https://airapi.airly.eu/v2/measurements/point?indexType=AIRLY_CAQI&lat="+ position.coords.latitude + "&lng=" + position.coords.longitude;
        $.getJSON(link, { 'Accept' : 'application/json', 'apikey' : 'WZGIIbfVZZ0ypeA0QuF0NQ677Kwauew1', 'Accept-Language': 'pl'}, function(info) {
        //    console.log(info);
           $('#air_status').text(info.current.indexes[0].description);
           $('#air_status').parent().css('background-color', info.current.indexes[0].color);
        //    $('#air_level').text(info.current.indexes[0].level);
        });

    };
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
