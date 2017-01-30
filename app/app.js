

var app = angular.module("WeatherApp", ['ngCookies']); 
app.controller("myCtrl",['$scope', '$http', '$cookies', function($scope, $http, $cookies) {

  
  $scope.search="";
  $scope.info="";
  $scope.result="";
  $scope.showSimpleTable=false;
  $scope.showForecastTable=false;
  $scope.displayFiveDays= false;
  $scope.units="metric";
  $scope.language="en";
  var now = new Date(), exp = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());
  $scope.search=$cookies.get('Location');




    var GetWeather = function (){

    $cookies.put('Location',$scope.search,{ expires : exp});

    var firstChar = $scope.search.substring(0, 1);
      
    var urlSearch="";   


    if (isNaN(firstChar)){

      if ($scope.displayFiveDays){ 

        urlSearch = "http://api.openweathermap.org/data/2.5/forecast?q=" + $scope.search + "&units="+ $scope.units + "&lang=" + $scope.language +"&appid=283d15d6e860527c62cedd717fef43b4";

        }else{ urlSearch = "http://api.openweathermap.org/data/2.5/weather?q=" + $scope.search+ "&units="+ $scope.units  + "&lang=" + $scope.language+ "&appid=283d15d6e860527c62cedd717fef43b4";}

      

     }else {

      $scope.lat=$scope.search.substring(0,$scope.search.indexOf(":"));

      $scope.long=$scope.search.substring($scope.search.indexOf(":")+1 , $scope.search.length);

        if ($scope.displayFiveDays){ 

          urlSearch = "http://api.openweathermap.org/data/2.5/forecast?lat=" + $scope.lat + "&lon=" + $scope.long + "&units="+ $scope.units + "&lang=" + $scope.language+ "&appid=283d15d6e860527c62cedd717fef43b4";


        }else{ urlSearch = "http://api.openweathermap.org/data/2.5/weather?lat=" + $scope.lat + "&lon=" + $scope.long + "&units="+ $scope.units + "&lang=" + $scope.language+ "&appid=283d15d6e860527c62cedd717fef43b4";}

      

      

      }

      console.log(urlSearch);
      

  $http({
  method: 'GET',
  url: urlSearch
  }).then(function successCallback(response) {

  $scope.result= response.data;

  if ($scope.displayFiveDays){

    $scope.showForecastTable=true;

    $scope.showSimpleTable=false;

    }else{

    $scope.showSimpleTable=true;
    $scope.showForecastTable=false;
  }
  

    
    
  }, function errorCallback(response) {
   
   $scope.info = "The entry is not valid";

   $scope.showSimpleTable=false;

   $scope.showForecastTable=false;

  });




}

    
    
$scope.$watch('search', function() {
  GetWeather();
});

$scope.$watch('displayFiveDays', function() {
  GetWeather();
});

$scope.$watch('units', function() {
  GetWeather();
});

$scope.$watch('language', function() {
  GetWeather();
});


}]);







