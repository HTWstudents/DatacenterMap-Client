var restService = angular.module('app.service', ['ngResource'])
    .constant({
        DB_URL:"https://api.mongolab.com/api/1/databases/datacentermap/collections/datacenters/",
        API_KEY: "ZP9FeglDtq-eheLhL9U_vWbrcCD5-EsQ"
    })
    .factory('DatacenterService', "DB_URL", "API_KEY", function ($resource, DB_URL, API_KEY) {
        return $resource(DB_URL, {apiKey: API_KEY});
    });


