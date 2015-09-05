/*global ko, d3*/

ko.bindingHandlers.arcChart = {
    init: function(element, valueAccessor) {
        "use strict";

        var data = ko.unwrap(valueAccessor());
        
        var arc = d3.svg.arc()
            .innerRadius(18)
            .outerRadius(24)
            .startAngle(0)
            .endAngle(20);

        var svg = d3.select(element).append("svg")
        var archPathAverage = svg
              .append("path")
              .attr("class", "arc-average")
              .attr("d", arc);
              
        var archPathCurrent = svg
              .append("path")
              .attr("class", "arc-current")
              .attr("d", arc);
              

        svg.append("g")
            .attr("class", "label")
            .append("text");
    },
    update: function(element, valueAccessor) {
        "use strict";

        var data = ko.unwrap(valueAccessor());
        if (data.length < 1)
            return;
        
        var scoreArray = _.map(data, function(de) {
            return parseInt(de.score) + 10;
        });
        
        var currentScore = parseInt(_.last(data).score) + 10;
        
        var sum = _.reduce(scoreArray, function(memo, num){ return memo + num; }, 0);
        
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            elementWidth = parseInt(d3.select(element).style("width")),
            elementHeight = parseInt(d3.select(element).style("height")),
            width = 260,
            height = 260,
            animationDuration = 750,
            maxMood = 20,
            tan = 2 * Math.PI;
        
        // An arc function with all values bound except the endAngle. So, to compute an
        // SVG path string for a given angle, we pass an object with an endAngle
        // property to the `arc` function, and it will return the corresponding string.
        var arcAverage = d3.svg.arc()
                .innerRadius(width/2-6)
                .outerRadius(width/2-20)
                .startAngle(0);
         var arcCurrent = d3.svg.arc()
                .innerRadius(width/2-3)
                .outerRadius(width/2)
                .startAngle(0);
                
        var percentage = (sum / (parseInt(scoreArray.length) * maxMood));
        var currentPercentage = currentScore / maxMood;
        var percentageAsRadius = percentage * tan;
        var currentPercentageAsRadius = currentPercentage * tan;
            
        var svg = d3.select(element)
        
        var arcSvg = svg.select("svg")
                    .attr("width", elementWidth)
                    .attr("height", elementHeight);
        var archPathAverage = arcSvg.select("path.arc-average")
                     archPathAverage.attr("width", width)
                    .attr("height", height)
                    .attr("transform", "translate(" + (elementWidth / 2) + "," + (elementHeight / 2) + ")")
                    .datum({endAngle: 0})
                    .transition()
                        .duration(animationDuration + 600)
                        .style("fill-opacity", function(d) {
                            return percentage;
                        })
                        .attr("fill", d3.rgb(255 - percentage*25, 190 + percentage*25, 255))
                        .call(arcTween, percentageAsRadius);
                        
       var archPathCurrent = arcSvg.select("path.arc-current")
                    archPathCurrent.attr("width", width)
                    .attr("height", height)
                    .attr("transform", "translate(" + (elementWidth / 2) + "," + (elementHeight / 2) + ")")
                    .datum({endAngle: 0})
                    .transition()
                        .duration(animationDuration)
                        .style("opacity", function(d) {
                            return currentPercentage;
                        })
                        .attr("fill", d3.rgb(255 - currentPercentage*250, 0 + currentPercentage*250, 255))
                        .call(arcTweenCurr, currentPercentageAsRadius);
                        
       function arcTween(transition, newAngle) {
                    transition.attrTween("d", function(d) {
                    
                        var interpolate = d3.interpolate(d.endAngle, newAngle);

                        return function(t) {
                            d.endAngle = interpolate(t);
                            return arcAverage(d);
                        };
            });
        }
        
        function arcTweenCurr(transition, newAngle) {
                    transition.attrTween("d", function(d) {
                    
                        var interpolate = d3.interpolate(d.endAngle, newAngle);

                        return function(t) {
                            d.endAngle = interpolate(t);
                            return arcCurrent(d);
                        };
            });
        }
    }
};