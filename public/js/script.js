let map;

$(document).ready(function() {
    $("tr").not(":first").hover(function(){
        $(this).css("background-color", "white");
    }, function() {
        $(this).css("background-color", "");
    });

    
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7570877, lng: -73.8458213},
        zoom: 15
    });
    addMarker();
}

function addMarker() {
    var location = [];
    location.lat = parseFloat($("tr").find("td.lat").text());
    location.lng = parseFloat($("tr").find("td.lng").text());

    var lat = [];
    var lng = [];
    $("tr").find("td.lat").each(function(index) {
        lat.push(parseFloat($(this).text()));
    });
    $("tr").find("td.lng").each(function(index) {
        lng.push(parseFloat($(this).text()));
    });
    
    lat.forEach(function(x, index, array) {
        var myLatLng = new google.maps.LatLng(x, lng[index]);
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng
        });
        console.log(x);
    });
}
