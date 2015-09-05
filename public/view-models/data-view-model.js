/*global ko, setInterval*/

var D3KD = this.D3KD || {};

(function (namespace) {
    "use strict";
    namespace.dataViewModel = function() {

        var self = this,
            sentimentData = [],
            textContent = jQuery('#text-content'),
            $sentimentLabel = jQuery('#sentiment'),

            randomInit = function () {
                return [];
            },

            jsonData = function (url) {
                d3.json("../output.json", function(data) {
                      textContent.empty();
                      sentimentData = [];
                      var graphData = data;
                      //sentimentData = graphData;
                      
                      for(var i = 0; i < graphData.length; i++){
                        (function(i){
                            setTimeout(function(){
                                $sentimentLabel.hide();
                                $sentimentLabel.empty();
                                sentimentData.push(graphData[i]);
                                self.arcChartData(sentimentData);
                                self.barChartData(sentimentData);
                                
                                var currentScore = parseInt(graphData[i].score) + 10;
                                var sum = _.reduce(graphData, function(memo, num){ return memo + num; }, 0);
                                var currentPercentage = currentScore / 20;
                                var generalPercentage = sum + 10 / sentimentData.length * 20;
                                var color;
                                var generalSentiment = "<span>General sentiment is</span>";
                                console.log (currentPercentage);
                                
                                if (currentPercentage < 0.40)
                                {
                                    color = '#ff4343';
                                }
                                else if (currentPercentage > 0.60) {
                                    color = '#b9e5ad';
                                }
                                if(generalPercentage < 0.40) {
                                    generalSentiment += '<span id="sentimentOutput">Kinda bad.</span>';
                                }
                                else if (generalPercentage > 0.60) {
                                    generalSentiment += '<span id="sentimentOutput">So good!</span>';
                                }
                                else {
                                    generalSentiment += '<span id="sentimentOutput">Ok. Sorta.</span>';
                                }
                                //var color = "1px solid rgba(" + ((255).toString()) + ',' +  (0 + currentScore / 20).toString() + ',' + 255 + ',' + 20 + ")"
                                jQuery('<span>' + graphData[i].data +'&nbsp;</span>').appendTo(textContent).css("border-bottom","1px solid " + color).hide().fadeIn(900);
                                
                                $sentimentLabel.append(generalSentiment);
                                $sentimentLabel.fadeIn(900);

                            }, 3000 * i);
                        }(i));
                    }
                    });
            }
        self.arcChartData = ko.observable(sentimentData);
        self.barChartData = ko.observable(sentimentData);
        
        $sentimentLabel.hide();
        
        jsonData();
        setInterval(function () {
            jsonData();
        }, 300456);

    };
}(D3KD)); 