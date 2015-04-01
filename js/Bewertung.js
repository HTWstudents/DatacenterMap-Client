/**
 * Created by Sebastian on 01.04.2015.
 */
//Datacenter Object which we want to save
var newDatacenterFromSurvey = new Object(
    newDatacenterFromSurvey.name,
    newDatacenterFromSurvey.strasse,
    newDatacenterFromSurvey.hausnummer,
    newDatacenterFromSurvey.postleitzahl,
    newDatacenterFromSurvey.stadt,
    newDatacenterFromSurvey.webseite,
    newDatacenterFromSurvey.email,
    newDatacenterFromSurvey.lat,
    newDatacenterFromSurvey.lng,
    newDatacenterFromSurvey.score1,
    newDatacenterFromSurvey.score2,
    newDatacenterFromSurvey.score3,
    newDatacenterFromSurvey.score4,
    newDatacenterFromSurvey.score5
);
//just some global vars
var numberOfServerrooms, numberOfServersPerRoom, monthlyTrafficDatacenter, monthlyTrafficServer, multiplikator;

//get values from survey on submit
$(".survey").submit(function () {
    //collect Data for new Datacenter Object
    getAllgemeineAngaben();
    getAngabenZertifierungen();
    getAngabenStromversorung();
    getAngebenKlimatisierung();
    getAngabenInfrastruktur();
    calculateAverageScore();

    //Post new DatacenterObject
    //someRESTfulFunction(newDatacenterFromSurvey);
});


//function for "Allgemeine Angaben"
function getAllgemeineAngaben() {
    //get data from survey
    newDatacenterFromSurvey.name = $("#company_name").val();
    newDatacenterFromSurvey.strasse = $("#company_street").val();
    newDatacenterFromSurvey.hausnummer = $("#company_housenumber").val();
    newDatacenterFromSurvey.postleitzahl = $("#company_zipcode").val();
    newDatacenterFromSurvey.stadt = $("#company_town").val();
    var address = newDatacenterFromSurvey.strasse + newDatacenterFromSurvey.hausnummer + newDatacenterFromSurvey.postleitzahl + newDatacenterFromSurvey.stadt;
    newDatacenterFromSurvey.lat = addressToLatLng(address)[0];
    newDatacenterFromSurvey.lng = addressToLatLng(address)[1];
    numberOfServerrooms = $("#serverrooms").val();
    numberOfServersPerRoom = $("#servers_in_serverrom").val();
    monthlyTrafficDatacenter = $("#datacenter_traffic").val();
    monthlyTrafficServer = $("#server_traffic").val();
}

//region get user input the long way
//function for "Angaben zu Zertifizierungen"
function getAngabenZertifierungen() {
    var score = 0;
    multiplikator = 1;
    var finalScoreZertifizierungen;

    /*data from checkboxes
     we only need to check if checked = true and pass the value because otherwise it would be 0 anyway */
    if ($("#checkbox_blauer_engel").prop('checked', true)) {
        finalScoreZertifizierungen = score + ($("#checkbox_blauer_engle").val());
    }
    if ($("#checkbox_emas").prop('checked', true)) {
        finalScoreZertifizierungen = score + ($("#checkbox_emas").val());
    }
    if ($("#checkbox_iso14001").prop('checked', true)) {
        finalScoreZertifizierungen = score + ($("#checkbox_iso14001").val());
    }
    if ($("#checkbox_iso50001").prop('checked', true)) {
        finalScoreZertifizierungen = score + ($("#checkbox_iso50001").val());
    }
    if ($("#checkbox_dcsa").prop('checked', true)) {
        finalScoreZertifizierungen = score + ($("#checkbox_dcsa").val());
    }
    if ($("#checkbox_keine").prop('checked', true)) {
        finalScoreZertifizierungen = score + ($("#checkbox_keine").val());
    }
    if ($("#checkbox_sonstige").prop('checked', true)) {
        finalScoreZertifizierungen = score + ($("#checkbox_sonstige").val());
    }
    //nothing checked at all score = 0
    else {
        finalScoreZertifizierungen = 0
    }
    ;
    newDatacenterFromSurvey.score1 = (finalScoreZertifizierungen * Multiplikator);
}

//function for "Angaben zur Stromversorgung"
function getAngabenStromversorung() {
    var score = 0;
    multiplikator = 2.5;
    var finalScoreStromversorgung, electricityTariff, totalElectrictyConsumptionDatacenter, totalElectrictyConsumptionACC,
        capacityUSV, otherPowerSavings;

    //data from input fields
    totalElectrictyConsumptionDatacenter = $("#gesamtstromverbrauch").val();
    totalElectrictyConsumptionACC = $("#gesamtstromverbrauch_klimatisierung").val();
    capacityUSV = $("#usv").val();
    electricityTariff = $("#tarif").val();
    otherPowerSavings = $("#sonstige_stromspartechnologien").val();

    /*data from checkboxes
     we only need to check if checked = true and pass the value because otherwise it would be 0 anyway */
    if ($("#checkbox_rwe").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_rwe").val());
    }
    if ($("#checkbox_enbw").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_enbw").val());
    }
    if ($("#checkbox_eon").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_eon").val());
    }
    if ($("#checkbox_ewe").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_ewe").val());
    }
    if ($("#checkbox_rheinenergie").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_rheinenergie").val());
    }
    if ($("#checkbox_mvv").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_mvv").val());
    }
    if ($("#checkbox_nenergie").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_nenergie").val());
    }
    if ($("#checkbox_pfalzwerke").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_pfalzwerke").val());
    }
    if ($("#checkbox_stadtwerke").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_stadtwerke").val());
    }
    if ($("#checkbox_eigenversorgung").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_eigenversorgung").val());
    }
    if ($("#checkbox_sonstiger_energieanbieter").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_sonstiger_energieanbieter").val());
    }
    if ($("#checkbox_stromverbrauch_ja").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_stromverbrauch_ja").val());
    }
    if ($("#checkbox_stromverbrauch_klimatisierung_ja").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_stromverbrauch_klimatisierung_ja").val());
    }
    if ($("#checkbox_dynamische_sst").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_dynamische_sst").val());
    }
    if ($("#checkbox_energiesparmodus").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_energiesparmodus").val());
    }
    if ($("#checkbox_sonstige_sst").prop('checked', true)) {
        finalScoreStromversorgung = score + ($("#checkbox_sonstige_sst").val());
    }
    //nothing checked at all score = 0
    else {
        finalScoreStromversorgung = 0
    }
    ;
    newDatacenterFromSurvey.score2 = (finalScoreStromversorgung * multiplikator);
}

//function for "Angeben zur Klimatisierung"
function getAngebenKlimatisierung() {
    var score = 0;
    multiplikator = 5;
    var finalScoreKlimatisierung, otherACC, coolingPowerWithRedundant, coolingPowerNotRedundant, coolant,
        wasteHeat;

    //data from input fields
    otherACC = $("#sonstige_klimasysteme").val();
    coolingPowerWithRedundant = $("#kälteleistung_ohne_redundanz").val();
    coolingPowerNotRedundant = $("#kälteleistung_mit_redundanz").val();
    coolant = $("#sonstige_kühlmedien").val();
    wasteHeat = $("#abwärme").val();

    /*data from checkboxes
     we only need to check if checked = true and pass the value because otherwise it would be 0 anyway */
    if ($("#checkbox_zentrale_klimaanlage").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_zentrale_klimaanlage").val());
    }
    if ($("#checkbox_eigenständige_klimaanlage").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_eigenständige_klimaanlage").val());
    }
    if ($("#checkbox_umluftklimaschrank").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_umluftklimaschrank").val());
    }
    if ($("#checkbox_umluftklimaschrank_seperat").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_umluftklimaschrank_seperat").val());
    }
    if ($("#checkbox_umluftklimaschrank_außenluftanteil").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_umluftklimaschrank_außenluftanteil").val());
    }
    if ($("#checkbox_splitklimageräte").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_splitklimageräte").val());
    }
    if ($("#checkbox_multisplitgeräte").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_multisplitgeräte").val());
    }
    if ($("#checkbox_klimaanlage_außenluftanschluss").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_klimaanlage_außenluftanschluss").val());
    }
    if ($("#checkbox_außenluftanteil_rlt_anlage").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_außenluftanteil_rlt_anlage").val());
    }
    if ($("#checkbox_wassergekühlt").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_wassergekühlt").val());
    }
    if ($("#checkbox_sonstiges_klimasystem").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_sonstiges_klimasystem").val());
    }
    if ($("#checkbox_klimaanlagen_ausschalten_ja").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_klimaanlagen_ausschalten_ja").val());
    }
    if ($("#checkbox_klimaanlagen_ja").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_klimaanlagen_ja").val());
    }
    if ($("#checkbox_wasser").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_wasser").val());
    }
    if ($("#checkbox_wasser_glykol").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_wasser_glykol").val());
    }
    if ($("#checkbox_kältemittel").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_kältemittel").val());
    }
    if ($("#checkbox_abwärme_ja").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_abwärme_ja").val());
    }
    if ($("#checkbox_kaltwarmgang_ja").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_kaltwarmgang_ja").val());
    }
    if ($("#checkbox_hotspots_ja").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_hotspots_ja").val());
    }
    if ($("#checkbox_hotspots_teilweise").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_hotspots_teilweise").val());
    }
    if ($("#checkbox_zuluftführung_ja").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_zuluftführung_ja").val());
    }
    if ($("#checkbox_abluftführung_ja").prop('checked', true)) {
        finalScoreKlimatisierung = score + ($("#checkbox_abluftführung_ja").val());
    }

    //nothing checked at all score = 0
    else {
        finalScoreKlimatisierung = 0
    }
    ;
    newDatacenterFromSurvey.score3 = (finalScoreKlimatisierung * multiplikator);
}

//function for "Infrastruktur / Rackausführung"
function getAngabenInfrastruktur() {
    var score = 0;
    multiplikator = 20;
    var finalScoreInfrastruktur;

    /*data from checkboxes
     we only need to check if checked = true and pass the value because otherwise it would be 0 anyway */

    if ($("#checkbox_dezentral").prop('checked', true)) {
        finalScoreInfrastruktur = score + ($("#checkbox_dezentral").val());
    }
    if ($("#checkbox_zentral").prop('checked', true)) {
        finalScoreInfrastruktur = score + ($("#checkbox_zentral").val());
    }
    if ($("#checkbox_storagevirtualisierung_ja").prop('checked', true)) {
        finalScoreInfrastruktur = score + ($("#checkbox_storagevirtualisierung_ja").val());
    }
    if ($("#checkbox_servervirtualisierung_ja").prop('checked', true)) {
        finalScoreInfrastruktur = score + ($("#checkbox_servervirtualisierung_ja").val());
    }
    if ($("#checkbox_systemmgmttool_ja").prop('checked', true)) {
        finalScoreInfrastruktur = score + ($("#checkbox_systemmgmttool_ja").val());
    }
    if ($("#checkbox_netzwerkmgmttool_ja").prop('checked', true)) {
        finalScoreInfrastruktur = score + ($("#checkbox_netzwerkmgmttool_ja").val());
    }
    //nothing checked at all score = 0
    else {
        finalScoreInfrastruktur = 0
    }
    ;
    newDatacenterFromSurvey.score4 = (finalScoreInfrastruktur * multiplikator);
}
//endregion

//region get user input the smart way

function getCheckBoxValues() {
    //get all checkbox values
    var checkBoxes = [];
    checkBoxes = $(".survey input:checkbox").val();

    //iterate through checkbox array
    for (i = 0; i < checkBoxes.length; i++) {

        //values between 0 and 6 should represent values from "Angaben zur Zertifizierungen"
        for (j = 0; j < 6; j++) {
            newDatacenterFromSurvey.score1 = (checkBoxes[j].value() * 1);
        }
        //values between 7 and 18 should represent values from "Angaben zur Stromversorgung"
        for (j = 7; j < 18; j++) {
            newDatacenterFromSurvey.score2 = (checkBoxes[j].value() * 2.5);
        }
        //values between 19 and 47 should represent values from "Angaben zur Klimatisierung"
        for (j = 19; j < 47; j++) {
            newDatacenterFromSurvey.score3 = (checkBoxes[j].value() * 5);
        }
        //values between 48 and 57 should represent values from "Angaben zur Rackausführung"
        for (j = 48; j < 57; j++) {
            newDatacenterFromSurvey.score4 = (checkBoxes[j].value() * 20);
        }
    }
}

function getInputValues() {
    var input = [];
    var electricityTariff, totalElectrictyConsumptionDatacenter, totalElectrictyConsumptionACC, capacityUSV,
        otherPowerSavings, otherACC, coolingPowerWithRedundant, coolingPowerNotRedundant, coolant,
        wasteHeat;

    //data from input fields
    input = $(".survey input:input").val();

    //we start at input[5], because those were "Allgemeine Angaben"
    electricityTariff = input[5];
    totalElectrictyConsumptionDatacenter = input[6];
    totalElectrictyConsumptionACC = input[7];
    capacityUSV = input[8];
    otherPowerSavings = input[9];
    otherACC = input[10];
    coolingPowerWithRedundant = input[11];
    coolingPowerNotRedundant = input[12];
    coolant = input[13];
    wasteHeat = input[14];
}
//endregion

function calculateAverageScore() {
    newDatacenterFromSurvey.score5 = ((newDatacenterFromSurvey.score1.value() + newDatacenterFromSurvey.score2.value() + newDatacenterFromSurvey.score3.value() + newDatacenterFromSurvey.score4.value()) / 4);
}

//now that we have a fully populated datacenter Object we can finally save it
//someRESTfulFunction(newDatacenterFromSurvey);