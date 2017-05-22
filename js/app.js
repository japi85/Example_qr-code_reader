var qr = angular.module("qr",["ionic", "ngCordova"]);
///////////////////////////////////////////////////////////////////////////////
// Käytetyt pluginit
// $cordovaBarcodeScanner, $cordovaInAppBrowser, $cordovaDialogs, $ionicPopup

qr.controller("qrCtrl", function ($scope, $ionicPlatform, $cordovaBarcodeScanner, $cordovaInAppBrowser, $cordovaDialogs, $ionicPopup) {

        $ionicPlatform.ready(function() {
        
            // paikallinen tallennus alustus   
        if(localStorage.getItem("LocalData") == null) {
            
            var data = [];
            data = JSON.stringify(data);
            localStorage.setItem("LocalData", data);
            
        }
        
        if(localStorage.getItem("LocalData2") == null) {
            
            var data2 = [];
            data2 = JSON.stringify(data2);
            localStorage.setItem("LocalData2", data2);
            
        }
        
        var annettuOsoite = "";
        
        $scope.tiedot = false;
        

        $scope.naytaTiedot = function () {
            
            $scope.tiedot = true;
            var data = localStorage.getItem("LocalData");
            
            data = JSON.parse(data);
            $scope.paikallinenData = data;
            
            var data2 = localStorage.getItem("LocalData2");
           
            data2 = JSON.parse(data2);
            $scope.paikallinenData2 = data2;
            $scope.tyhjennys = "";
        }
        
        $scope.suljeTiedot = function () {
            
            $scope.tiedot = false;
            $scope.tyhjennys = "";
            
        }
        
          var osoite = " ";
         
            // QR-koodilukija

            $scope.lueKoodi =  function () {
                

            $cordovaBarcodeScanner
              .scan()
              .then(function(barcodeData) {
                  
                osoite = barcodeData.text; 
        if (!barcodeData.cancelled) {
                //vahvistus dialogi
                $cordovaDialogs.confirm('Avataanko selain ja siirrytään sivulle?', 'Vahvista', ['Jatka','Peruuta'])
                  .then(function(painettuNappi) {
                    // 'Jatka' = 1, 'Peruuta' = 2
                    var valinta = painettuNappi;
                    
                    if(valinta == 1) {
                    
                    $scope.meneSivulle();

                     var data = localStorage.getItem("LocalData");
                            data = JSON.parse(data);
                            data[data.length] = osoite;
                           
                            

                            localStorage.setItem("LocalData", JSON.stringify(data));
                            
                    var data2 = localStorage.getItem("LocalData2");
                            data2 = JSON.parse(data2);
                            data2[data2.length] = barcodeData.format;

                           
                            

                            localStorage.setItem("LocalData2", JSON.stringify(data2));

                    $scope.paikallinenData = data;
                    $scope.paikallinenData2 = data2; 
                    
                    }
                    
                    else {
                        

                    var data = localStorage.getItem("LocalData");
                            data = JSON.parse(data);
                            data[data.length] = osoite;
                            
                            localStorage.setItem("LocalData", JSON.stringify(data));
                            
                    var data2 = localStorage.getItem("LocalData2");
                            data2 = JSON.parse(data2);
                            data2[data2.length] = barcodeData.format;

                           
                            

                            localStorage.setItem("LocalData2", JSON.stringify(data2));

                            $scope.paikallinenData = data;
                            $scope.paikallinenData2 = data2;
                        
                    }
                    
                  });
  
                  
                  
                /* vahvistus toteutus rumalla dialogilla
                if (confirm("Avataanko selain ja siirrytään sivulle?") == true) {
                $scope.meneSivulle();
                $scope.testi = "Koodin sisältämä tieto: " + osoite;
                $scope.testi2 = "Koodin tyyypi: " + barcodeData.format;
                $scope.testi3 = "Koodin sisältämä tieto: " + barcodeData;

                 var data = localStorage.getItem("LocalData");
                        data = JSON.parse(data);
                        data[data.length] = osoite;

                        localStorage.setItem("LocalData", JSON.stringify(data));
                        
                $scope.paikallinenData = data;
                }
                else {
                $scope.testi = "Koodin sisältämä tieto: " + osoite;
                $scope.testi2 = "Koodin tyyypi: " + barcodeData.format;
                $scope.testi3 = "Koodin sisältämä tieto: " + barcodeData;

                 var data = localStorage.getItem("LocalData");
                        data = JSON.parse(data);
                        data[data.length] = osoite;

                        localStorage.setItem("LocalData", JSON.stringify(data));
                        
                        $scope.paikallinenData = data;
                        
                  }  */
                      } else {
                          

                        var data = localStorage.getItem("LocalData");
                                data = JSON.parse(data);
                                data[data.length] = barcodeData.format;
                                data[data.length] = osoite;

                                localStorage.setItem("LocalData", JSON.stringify(data));
                                
                        var data2 = localStorage.getItem("LocalData2");
                            data2 = JSON.parse(data2);
                            data2[data2.length] = barcodeData.format;

                            localStorage.setItem("LocalData2", JSON.stringify(data2));

                                $scope.paikallinenData = data;
                                $scope.paikallinenData2 = data2;
                          
                      }      
                  }, function(error) {
                $scope.error = "Sovelluksessa tapahtui virhe " + error;

              });

            };
            
            $scope.meneSivulle =  function () {
                            
                        var options = {
                            location: 'yes',
                            clearcache: 'yes',
                            toolbar: 'yes'
                          };
                          



                          $cordovaInAppBrowser.open( osoite, '_blank', options)
                            .then(function(event) {
                              //onnistuminen
                            })
                            .catch(function(event) {
                               $scope.error = "Sovelluksessa tapahtui virhe " + event;
                       
                               $cordovaInAppBrowser.close();
                            });
                            

                };
                
           $scope.haeTiedotVarastosta =  function () { 
           
                var data = localStorage.getItem("LocalData");
                data = JSON.parse(data);
                $scope.paikallinenData = data;
                
                var data2 = localStorage.getItem("LocalData2");
                data2 = JSON.parse(data2);
                $scope.paikallinenData2 = data2;

           };

           $scope.tyhjennaVarasto =  function () { 
           
                var data = [];
                data = JSON.stringify(data);
                localStorage.setItem("LocalData", data);
                
                $scope.paikallinenData = data;
                    
                var data2 = [];
                data2 = JSON.stringify(data2);
                localStorage.setItem("LocalData2", data2);
                                
                $scope.paikallinenData2 = data2;
                $scope.tiedot = true;
                $scope.tyhjennys = "Historia tiedot tyhjennetty";

           };
           
  /*         $scope.taskuLamppu = function () {
               
                 $cordovaFlashlight.toggle()
                    .then(function (success) {   },
                      function (error) { alert("Lampun käynnistämisessä ilmeni ongelma: " + error); });
   
           }
   */       
           $scope.tietoja = function () {
               
                
                 
                $cordovaDialogs.confirm('QR-koodinlukija v1.0 Tekijä: Jani Piiroinen', 'Tietoja sovelluksesta', ['Takaisin'])
                  .then(function(painettuNappi) {
                   
                    
                  
                  
                });
           }
           
           $scope.luoKoodi = function () {
               
                  cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, '"' + annettuOsoite + '"', function(success) {
                      
                            var kuvatiedot = JSON.stringify(success);
                            alert(kuvatiedot);
                            
                      }, function(virhe) {
                        alert("Koodin luominen epäonnistui: " + virhe);
                      }
                    );
               
               
           }
           
           $scope.uusiKoodi = function () {
    
           $scope.dialogiData = {};

           var dialogi = $ionicPopup.show({
        
                                    title: "Anna qr-koodin osoite",
                                    template: '<input type="text" placeholder="Osoite ilman lainausmerkkejä" ng-model="dialogiData.annettuOsoite">',
                                    scope: $scope,
                                    buttons: [
                                        {
                                          text: "Ok",
                                          type: "button-balanced",
                                          onTap: function () {
                                              
                                            annettuOsoite = $scope.dialogiData.annettuOsoite;
                                              
                                            cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, '"' + annettuOsoite + '"', function(onnistui) {
                                                    
                                                    var kuvatiedot = JSON.stringify(onnistui);
                                                    alert(kuvatiedot);
                                                    
                                                  }, function(virhe) {
                                                    alert("Sovelluksessa tapahtui virhe " + virhe);
                                                  }
                                                );
 
                                          }  
                                        },
                                            {
                                                text: "Peruuta",
                                                type: "button-assertive"
                                            }
                                            
                                            
                                             ]

  
    
    
        });
    
        dialogi.then( function () {

            
            
            
            
        
                });
            };
            
        }); //ionic platform

    }); //controlleri 

