var map;
var markerClusterer = null;
var geocoder;
var infoWindow = new google.maps.InfoWindow({});

function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(50.866233, 9.704450),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    createMarker();
}

//create Marker & Cluster them
function createMarker() {
    var markers = [];
    var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=16x24&chco=rgb(0, 0, 0)&ext=.png';
    var markerImage = new google.maps.MarkerImage(imageUrl,
        new google.maps.Size(16, 24));
    $.getJSON("assets/json/newDatacenters.json", function (json1) {
        $.each(json1, function (key, data) {
           {

                var latlng = new google.maps.LatLng(data.lat, data.lng);
                var marker = new google.maps.Marker({
                    map: map,
                    position: latlng,
                    name: data.name,
                    strasse: data.strasse,
                    hausnummer: data.hausnummer,
                    postleitzahl: data.postleitzahl,
                    stadt: data.stadt,
                    webseite: data.webseite,
                    email: data.email,
                    score1: data.score1,
                    score2: data.score2,
                    score3: data.score3,
                    score4: data.score4,

                    //correct url: var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&' + 'chco=//COLOR_HERE//&ext=.png';
                    icon: markerImage
                });
               console.log(data.score4);
               console.log(createRGB(data.score4));
                markers.push(marker);

                //onclick event listener
                google.maps.event.addListener(marker, 'click', function () {
                    //prevent more than one menu
                    hideMenu();
                    //draw menu
                    drawMenu(marker);
                });

                //close infowindow when clicked into the map
                google.maps.event.addListener(map, "click", function (event) {
                    //hide menu
                    hideMenu()
                });
            }
        });

        //add Cluster
        markerClusterer = new MarkerClusterer(map, markers, {
            maxZoom: 12,
            gridSize: 50
        });
    });
}

//center map according to the address entered by user into searchbar
function setCenter() {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            (
                map.setCenter(results[0].geometry.location),
                    map.setZoom(12)
            );
        }
        else {
            //do something if address is not found by geocoder
        }
    });

}

function drawMenu(marker) {

    var contentTemplate =
    '<div class="map-menu">' +
    '<div class="map-floatmenu">' +
    '<div class="row text-center">' +
    '<div class="col-md-12">' +
    '<span class="address">' +
    '<address> ' +
    '<h2>' + marker.name + '</h2>' +
    '<br>' + marker.strasse + " " + marker.hausnummer +
    '<br>' + marker.postleitzahl + " " + marker.stadt +
    '<br><a href=#>' + marker.webseite + '</a>' +
    '<br><a href=mailto:#">' + marker.email + '</a> ' +
    '</address>' +
    '</span>' +
        //reached survey score
        //TODO use data-percent from json
        //stromverbrauch - score

    '<div class="col-md-12">' +
    '<h4>Stromverbrauch</h4>' +
    '<span class="chart" data-percent="' + marker.score1 + '">' +
    '<span class="percent"></span>' +
    '</span>' +
    '</div>' +
        //klimatisierung - score
    '<h4>Klimatisierung </h4> ' +
    '<div class="col-md-12">' +
    '<span class="chart" data-percent="' + marker.score2 + '">' +
    '<span class="percent"></span> ' +
    '</span> ' +
    '</div> ' +
        //ausführung - score
    '<h4>Ausführung</h4>' +
    '<div class="col-md-12"> ' +
    '<span class="chart" data-percent="' + marker.score3 + '">' +
    '<span class="percent"></span>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
    $('.map-canvas').append(contentTemplate);
    drawPieChart();
}

function hideMenu() {
    $('.map-menu').children().remove();
}

function drawPieChart() {
    $('.chart').easyPieChart({
        onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: function (percent) { //FORCOLOR OF CHART
            percent /= 100;
            return "rgb(" + Math.round(255 * (1 - percent)) + ", " + Math.round(255 * percent) + ", 0)";
        },
        scaleColor: false,
        lineWidth: 10, //WIDTH OF STRIP OF SKILL CHART
        size: 120 //WIDTH - HEIGHT OF SKILL CHART(SHOULD BE IN SQUARE) -  SHOULD BE EQUAL - Like 200px
    });
}

google.maps.event.addDomListener(window, 'load', initialize);