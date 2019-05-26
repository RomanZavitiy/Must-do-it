document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady() {
    // Now safe to use device APIs
    console.log('ready!');
    // const weather_info = document.getElementById('weather_info');
    const weather_icon = document.getElementById('weather_icon');
    const wls = document.getElementsByClassName('wls');
    const wlsh = document.getElementsByClassName('wlsh');
    const wli = document.getElementsByClassName('wli');
 
    
    var onSuccess = function(position) {

        var link = "http://api.openweathermap.org/data/2.5/forecast?lat="+ position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric" + "&cnt=4"+ "&lang=pl" + "&appid=ebb14998b4b3590a9180309a877ebe47";
        $.getJSON(link, function(info) {
        //    console.log(info);
           
          var icon_link = "http://openweathermap.org/img/w/";
            $('#weather_info').text(info.list[0].weather[0].description);
            $('#city_name').text(info.city.name);
            $('#weather_temp').text(Math.round(info.list[0].main.temp) + "°C");
            
            setInterval( function () {
                let now = new Date();
                $('#weather_data').text(now.toLocaleString());
            }, 1000);
            

            weather_icon.src = icon_link + info.list[0].weather[0].icon + ".png";

            
            for ( let i = 0; i < 3; i++) {
                wls[i].textContent = info.list[i+1].dt_txt.slice(10, 16);
                wli[i].src = icon_link + info.list[i+1].weather[0].icon + ".png";
                wlsh[i].textContent = Math.round(info.list[i+1].main.temp) + "°C";
            }

            
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