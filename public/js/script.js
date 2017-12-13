var map;

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7570877, lng: -73.8458213},
        zoom: 8
    });
}