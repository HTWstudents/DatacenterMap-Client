var geocoder = new google.maps.Geocoder();
var resultLat, resultLng;
var newDataArray = [];
var counterA = 0, counterB = 0;
var url = "http://rzbenchmark.f2.htw-berlin.de/dev/assets/json/saveJson.php";

function initialize() {
    readJson();
}

function readJson() {
    //read JSON File
    $.getJSON("assets/json/datacenters.json", function (json1) {

        $.each(json1, function (key, data) {

            //Geocode Address from JSON File

            var oldData = new Object();
            oldData.id = data.id;
            oldData.name = data.name;
            oldData.strasse = data.strasse;
            oldData.hausnummer = data.hausnummer;
            oldData.stadt = data.stadt;
            oldData.postleitzahl = data.postleitzahl;
            oldData.webseite = data.webseite;
            oldData.email = data.email;
            geocode(oldData);
            counterA++;
        });

    });

}

function geocode(oldData) {
    geocoder.geocode({
        'address': oldData.strasse + oldData.hausnummer + oldData.postleitzahl + oldData.stadt
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultLat = results[0].geometry.location.lat();
            resultLng = results[0].geometry.location.lng();

            //create new Datacenter Object and store them in an Array

            var newData = new Object();
            newData.id = oldData.id;
            newData.name = oldData.name;
            newData.strasse = oldData.strasse;
            newData.hausnummer = oldData.hausnummer;
            newData.stadt = oldData.stadt;
            newData.postleitzahl = oldData.postleitzahl;
            newData.webseite = oldData.webseite;
            newData.email = oldData.email;
            newData.lat = "" + resultLat + "";
            newData.lng = "" + resultLng + "";
            counterB++;
            console.log(newData);
            //console.log("counterB= " + counterB )
            newDataArray.push(newData);
            if (counterA == counterB) {
               // TODO automatically write Array to Json File.
               // actually we will just log the new Array and copy it from console to paste it manually into a new Json file.
               // writeData();
                console.log(JSON.stringify(newDataArray));
            }
        }

        else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            setTimeout(function () {
                geocode(oldData);
            }, 200);
        } else {
            counterA--;
            //console.log("counterA= " + counterA )
            // alert("Geocode was not successful for the following reason:" + status);
        }

    });

}

function addressToLatLng(address) {
    var LatLng = [];
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            LatLng[0] = results[0].geometry.location.lat();
            LatLng[1] = results[0].geometry.location.lng();
            return LatLng;
        }
        else return ( alert("Something went wrong!"));
    });
}


function writeData() {

    //write new Datacenter Objects to File
    $.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        url: url,
        data: {data: JSON.stringify(newDataArray)}
    });

}