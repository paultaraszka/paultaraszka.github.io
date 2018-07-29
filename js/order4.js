// https://stackoverflow.com/questions/42980268/d3-tooltip-show-values-from-nested-dataset
// https://chat.stackoverflow.com/rooms/138853/discussion-between-mark-and-scooterlord
// https://jsfiddle.net/2en21Lqh/17


var data = [
  {
    "name": "All Children",
    "date": "2008",
    "change": "0%",
    "value": 416437
 },
 {
    "name": "All Children",
    "date": "2009",
    "change": "0.70%",
    "value": 419337
 },
 {
    "name": "All Children",
    "date": "2010",
    "change": "-1.02%",
    "value": 415030
 },
 {
    "name": "All Children",
    "date": "2011",
    "change": "-6.01%",
    "value": 390069
 },
 {
    "name": "All Children",
    "date": "2012",
    "change": "-0.57%",
    "value": 387858
 },
 {
    "name": "All Children",
    "date": "2013",
    "change": "-4.36%",
    "value": 370962
 },
 {
    "name": "All Children",
    "date": "2014",
    "change": "1.49%",
    "value": 376501
 },
 {
    "name": "All Children",
    "date": "2015",
    "change": "-1.91%",
    "value": 369308
 },
 {
    "name": "All Children",
    "date": "2016",
    "change": "3.51%",
    "value": 382257
 },
 {
    "name": "All Children",
    "date": "2017",
    "change": "5.16%",
    "value": 401982
 },
 {
    "name": "1st",
    "date": "2008",
    "change": "-2.62%",
    "value": 211419
 },
 {
    "name": "1st",
    "date": "2009",
    "change": "0.99%",
    "value": 213513
 },
 {
    "name": "1st",
    "date": "2010",
    "change": "-2.62%",
    "value": 207914
 },
 {
    "name": "1st",
    "date": "2011",
    "change": "-7.76%",
    "value": 191788
 },
 {
    "name": "1st",
    "date": "2012",
    "change": "-1.50%",
    "value": 188910
 },
 {
    "name": "1st",
    "date": "2013",
    "change": "-4.57%",
    "value": 180282
 },
 {
    "name": "1st",
    "date": "2014",
    "change": "-0.93%",
    "value": 178603
 },
 {
    "name": "1st",
    "date": "2015",
    "change": "-2.76%",
    "value": 173669
 },
 {
    "name": "1st",
    "date": "2016",
    "change": "1.28%",
    "value": 175888
 },
 {
    "name": "1st",
    "date": "2017",
    "change": "-1.85%",
    "value": 172642
 },
 {
    "name": "2nd",
    "date": "2008",
    "change": "0%",
    "value": 142551
 },
 {
    "name": "2nd",
    "date": "2009",
    "change": "1.05%",
    "value": 144047
 },
 {
    "name": "2nd",
    "date": "2010",
    "change": "1.19%",
    "value": 145763
 },
 {
    "name": "2nd",
    "date": "2011",
    "change": "-4.01%",
    "value": 139912
 },
 {
    "name": "2nd",
    "date": "2012",
    "change": "0.62%",
    "value": 140774
 },
 {
    "name": "2nd",
    "date": "2013",
    "change": "-4.24%",
    "value": 134806
 },
 {
    "name": "2nd",
    "date": "2014",
    "change": "4.61%",
    "value": 141026
 },
 {
    "name": "2nd",
    "date": "2015",
    "change": "-1.66%",
    "value": 138681
 },
 {
    "name": "2nd",
    "date": "2016",
    "change": "5.97%",
    "value": 146967
 },
 {
    "name": "2nd",
    "date": "2017",
    "change": "9.73%",
    "value": 161272
 },
 {
    "name": "3rd",
    "date": "2008",
    "change": "0%",
    "value": 41054
 },
 {
    "name": "3rd",
    "date": "2009",
    "change": "0.53%",
    "value": 41273
 },
 {
    "name": "3rd",
    "date": "2010",
    "change": "0.08%",
    "value": 41305
 },
 {
    "name": "3rd",
    "date": "2011",
    "change": "-3.90%",
    "value": 39694
 },
 {
    "name": "3rd",
    "date": "2012",
    "change": "0.27%",
    "value": 39801
 },
 {
    "name": "3rd",
    "date": "2013",
    "change": "-2.92%",
    "value": 38640
 },
 {
    "name": "3rd",
    "date": "2014",
    "change": "2.80%",
    "value": 39721
 },
 {
    "name": "3rd",
    "date": "2015",
    "change": "-1.72%",
    "value": 39039
 },
 {
    "name": "3rd",
    "date": "2016",
    "change": "8.93%",
    "value": 42524
 },
 {
    "name": "3rd",
    "date": "2017",
    "change": "17.50%",
    "value": 49965
 },
 {
    "name": "4th",
    "date": "2008",
    "change": "0%",
    "value": 12452
 },
 {
    "name": "4th",
    "date": "2009",
    "change": "-3.24%",
    "value": 12048
 },
 {
    "name": "4th",
    "date": "2010",
    "change": "0.35%",
    "value": 12090
 },
 {
    "name": "4th",
    "date": "2011",
    "change": "-5.04%",
    "value": 11481
 },
 {
    "name": "4th",
    "date": "2012",
    "change": "-2.33%",
    "value": 11213
 },
 {
    "name": "4th",
    "date": "2013",
    "change": "-5.77%",
    "value": 10566
 },
 {
    "name": "4th",
    "date": "2014",
    "change": "0.85%",
    "value": 10656
 },
 {
    "name": "4th",
    "date": "2015",
    "change": "-6.20%",
    "value": 9995
 },
 {
    "name": "4th",
    "date": "2016",
    "change": "7.40%",
    "value": 10735
 },
 {
    "name": "4th",
    "date": "2017",
    "change": "10.82%",
    "value": 11896
 },
 {
    "name": "5th+",
    "date": "2008",
    "change": "0%",
    "value": 8961
 },
 {
    "name": "5th+",
    "date": "2009",
    "change": "-5.64%",
    "value": 8456
 },
 {
    "name": "5th+",
    "date": "2010",
    "change": "-5.89%",
    "value": 7958
 },
 {
    "name": "5th+",
    "date": "2011",
    "change": "-9.60%",
    "value": 7194
 },
 {
    "name": "5th+",
    "date": "2012",
    "change": "-0.47%",
    "value": 7160
 },
 {
    "name": "5th+",
    "date": "2013",
    "change": "-6.87%",
    "value": 6668
 },
 {
    "name": "5th+",
    "date": "2014",
    "change": "-2.59%",
    "value": 6495
 },
 {
    "name": "5th+",
    "date": "2015",
    "change": "22.00%",
    "value": 7924
 },
 {
    "name": "5th+",
    "date": "2016",
    "change": "-22.48%",
    "value": 6143
 },
 {
    "name": "5th+",
    "date": "2017",
    "change": "1.04%",
    "value": 6207
 }
  
]

    margin = {
      top: 20,
      right: 160,
      bottom: 20,
      left: 50
    };


    var parentNode = d3.select('#chart-id').node(),
        parent = '#chart-id';

    var containerwidth = parentNode.getBoundingClientRect().width,
        containerheight = parentNode.getBoundingClientRect().height,
        width = containerwidth - margin.left - margin.right,
        height = containerheight - margin.top - margin.bottom;
                                                             
    var parseTime = d3.timeParse("%Y")
    
    var bisectDate = d3.bisector(function(d) { 
      return d.date;
    }).left;

    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
      //if (d.name === "Total" ? d.enabled = false : d.enabled = !d.enabled );
      //visible: (name === "Unemployment" ? true : false)
    });

    function sortByDateAscending(a, b) {
      return a.date - b.date;
    }
    //dataset = data.sort(sortByDateAscending);

    var dataGroup = d3.nest()
      .key(function(d) {
        return d.name;
      })
      .entries(data);

    dataGroup.forEach(function(d) {
      
      //console.log(d);
      //d.enabled = false;
      //if (d.key == "Total") {
      //  d.enabled = true;
      //} 
      d.enabled = true;
    });               
    

    var svg = d3.select(parent)
      .append('svg')
      .attr('width', containerwidth)
      .attr('height', containerheight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    /* Vertical line */
    
    var vertical = svg.append('line')
      .attr('class', 'd3-vertline')
      .attr('y1', 0)
      .attr('y2', height)
      .attr('x1', 0)
      .attr('x2', 0)
      .classed('hidden', 'true');

      
    /* Tooltip */  
    
    var tooltip = d3.select(parent)
      .append('div')                                                              
      .attr('class', 'd3-tooltip hidden');

    var tooltip1, tooltip2;
   
   
    var mousemoveFunc = function(d, i) {

      var x0 = xz.invert(d3.mouse(this)[0]);
    
      var lastDate,
      	  cys = [],
          ds = [];
      
      dataGroup.forEach(function(e) { 
        var i = bisectDate(e.values, x0, 1),
            d0 = e.values[i - 1],
            d1 = e.values[i];

        var d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        lastDate = d.date;
        if (e.enabled) cys.push(d.value);
        if (e.enabled) ds.push("<b>" + e.key + ":</b> " + d.value + "&emsp;<b>Change:</b> " + d.change );
      });
    
      var mouse = d3.mouse(svg.node()).map(function(d) {
        return parseInt(d);
      });
      var left = Math.min(containerwidth, mouse[0]+margin.left+margin.right),
          top = Math.min(containerheight, mouse[1]+margin.top+margin.right);

      //console.log(fData);
      //console.log(lastDate.getFullYear());

      d3.selectAll(parent + ' .d3-focuspoint')
        .classed("hidden", false)
        .attr("cx", xz(lastDate))
        .attr("cy", function(d,i) {  
        	return yz(cys[i]);
      });

      tooltip
        .html("For the year <b>" + lastDate.getFullYear().toString() + "</b>:<br/>" + ds.join("<br/>"))
        .classed('hidden', false)
        .style('left', (left) + 'px')
        .style('top', (top) + 'px');          
    
    };
    
    var mouseoutFunc = function(d, i) {
      tooltip.classed('hidden', true);
    };
    
    svg
      .on('mousemove', mousemoveFunc)
      .on('mouseout', mouseoutFunc);
    
     
    /* Rectangle to receive user events */
    
    var view = svg
      .append("rect")
      .attr("class", "view")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);   
      
    
    /* Zoom function */

    var zoom = d3.zoom()
      .scaleExtent([1, 10])     
      .translateExtent([[0,0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", redraw);
    
    //svg.call(zoom); // Call zoom function
                  

    var transform = d3.zoomTransform(svg.node()); // Get svg transform properties to rescale Axes/redraw zommed lines

    var x = d3.scaleTime().range([0, width]),      // No domains yet!
        y = d3.scaleLinear().range([height, 0]);
        
    var xz=x,xy=y; // Used to store zoom scales        
  
    var colorScale5 = d3.scaleOrdinal()
    	 .domain([1,2,3,4,5,6])
    	 .range(["#2d74d0", "#ab2ecd", "#dd2170", "#c8b331", "#fa5802", "#74ab6e"]);    



    var xAxis = d3.axisBottom(x).tickSizeInner(2).tickSizeOuter(0);
    var yAxis = d3.axisLeft(y).ticks(5).tickSizeInner(-width).tickSizeOuter(0);
    var xAxisGroup = svg.append('g').attr('class', 'x d3-axis').attr('transform', 'translate(0,' + height + ')');
    var yAxisGroup = svg.append('g').attr('class', 'y d3-axis').attr('transform', 'translate(0,0)');


    
    var line = d3.line();  // Line generator
    
    var focuspoints, fData;

    var legendItem = d3.select(".legend")  // Create legend (not needed inside redraw function, renders only once)
      .selectAll("li")
      .data(dataGroup)
      .enter()
      .append("li")
      .on('click', function(d) {
        //d.enabled = !d.enabled;  // Javascript toggle
        //svg.call(zoom.transform, d3.zoomIdentity);  // reset to zoomidentity
        redraw();
      });

    legendItem
      .append("span")
      .attr("class", "color-square")
      .style("background", function(d, i) {
        return colorScale5(d.key);     
      });

    legendItem
      .append("span")
      .text(function(d) {
        return (d.values[0].name)
      });

      // text label for the y axis
      svg.append("text")
      .attr("transform", "rotate(-90,-25,25)")
      .attr("y", 0 )
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-family","sans-serif")
      .style("font-size","14px")
      .text("Births");  

    redraw();

    function redraw() {
    
      tooltip.classed('hidden', true);
      d3.selectAll(parent + ' .d3-focuspoint').classed('hidden', true);

      transform = d3.zoomTransform(svg.node());

      fData = dataGroup.filter(function(d) {
        return d.enabled;
      });              
          
      y.domain([
        0,
        1.2 * d3.max(fData, function(c) {
          return d3.max(c.values, function(d) {
            return d.value;
          });
        })
      ]);
      
      x.domain([
        d3.min(fData, function(c) {
          return d3.min(c.values, function(d) {
            return d.date;
          });
        }),
        d3.max(fData, function(c) {
          return d3.max(c.values, function(d) {
            return d.date;
          });
        })
      ]);

      xz = transform.rescaleX(x);
      yz = transform.rescaleY(y);
      
      line.x(function(d) {
       return xz(d.date);
      }).y(function(d) {
        return yz(d.value);
      })

      
      xAxisGroup.call(xAxis.scale(xz));
        //.selectAll("text")                      // Angled axis labels
        //.style("text-anchor", "end")
        //.style("color", "#333")
        //.attr("dx", "-1.1em")
        //.attr("dy", "-.55em")
        //.attr("transform", "rotate(-45)");
      
      yAxisGroup.call(yAxis.scale(yz));
      
      // update selection
      lines = svg.selectAll(".d3-group")
        .data(fData, function(d) {
          return d.key
        });

      // exit the whole group
      lines
        .exit().remove();
      
      lines.select("#announce").remove();
      lines.selectAll("#start").remove();
      lines.selectAll(".annotation").remove();
      d3.selectAll(".annotation").remove();

      // enter selection
      linesEnter = lines
        .enter()
        .append("g")
        .attr("class", "d3-group");
        
      // add path on enter
      linesEnter.append("path")
        .attr("class", "d3-line");
        
      // update + enter
      lines = lines.merge(linesEnter);

      // adjust path
      lines.select(".d3-line")
        .attr('d', function(d) {
          return line(d.values);
        })
        .style("stroke", function(d, i) {
          return colorScale5(d.key);
        });
        
      // Create focus points
      
      linesEnter
        .append('circle')
        .attr('class', 'd3-focuspoint hidden')
        .attr('r', '5')
        .style("fill", function(d, i) {
          return colorScale5(d.key);
        });

      var announceYear = new Date(2015,0,1,0,0,0);
      var startYear = new Date(2016,0,1,0,0,0);
      var markYear = new Date(2017,0,1,0,0,0);
      var markYear2 = new Date(2014,0,1,0,0,0);

      lines.append("line")
        .attr("id", "announce")
        .attr("x1", xz(markYear))  //<<== change your code here
        .attr("y1", 0)
        .attr("x2", xz(markYear))  //<<== and here
        .attr("y2", height)
        .style("stroke-width", 1)
        .style("stroke", "#02A6E3")
        .style("stroke-dasharray","5,5")
        .style("opacity", ".25")
        .style("fill", "none");

        lines.append("line")
        .attr("id", "start")
        .attr("x1", xz(startYear))  //<<== change your code here
        .attr("y1", yz(161272)+50)
        .attr("x2", xz(markYear)-20)  //<<== and here
        .attr("y2", yz(161272)+5)
        .style("stroke-width", 1)
        //.style("lineDashType", "dash")
        .style("stroke", "#02A6E3")
        .style("stroke-dasharray","5,5")
        .style("opacity", ".25")
        .style("fill", "none");

        lines.append("line")
        .attr("id", "start")
        .attr("x1", xz(startYear))  //<<== change your code here
        .attr("y1", yz(49965)-25)
        .attr("x2", xz(markYear)-20)  //<<== and here
        .attr("y2", yz(49965))
        .style("stroke-width", 1)
        //.style("lineDashType", "dash")
        .style("stroke", "#02A6E3")
        .style("stroke-dasharray","5,5")
        .style("opacity", ".25")
        .style("fill", "none");


      

      tooltip1 = d3.select(parent)
      .append('div')                                                              
      .classed('annotation', true)
      //.classed('d3-focuspoint',true)
      //.classed('hidden',true)
      .html("Family 500 program appears to have continued positive effect on birth rate after first full year.")
        .style('left', (xz(markYear) - 80) + 'px')
        .style('top', (margin.top + 50) + 'px'); 

      if (((xz(markYear))-110) > width) {
        tooltip1.classed("hidden",true);
      };

      tooltip2 = d3.select(parent)
      .append('div')                                                            
      .classed('annotation', true)
      //.classed('d3-focuspoint',true)
      //.classed('hidden',true)
      .html("2nd and 3rd children see great increases.")
        .style('left', (xz(markYear2  ) +40) + 'px')
        .style('top', (height*.95) + 'px'); 

      if (((xz(markYear2))-110) > width) {
        tooltip2.classed("hidden",true);
      };
      //lines.append("div")
        //.classed("annotation", true)
        //.style('left', 20 + 'px')
        //.style('top', 20 + 'px')  
        //.attr("x",xz(startYear) - 30 )
        //.attr("y", 0)
//        .attr("text-anchor", "left")
        //.html("For the year ");
        //.text("Family 500 implemented")
        
      } 
    
/*$(window).on('resize', function() {
  containerwidth = parentNode.getBoundingClientRect().width,
  containerheight = parentNode.getBoundingClientRect().height,
  width = containerwidth - margin.left - margin.right,
  height = containerheight - margin.top - margin.bottom;

  x.range([0, width]);
  y.range([height, 0]);
  d3.select(parent + ' svg, ' + parent + ' svg g').attr('width', containerwidth).attr('height', containerheight);
  xAxisGroup.call(xAxis);
  yAxis.tickSizeInner(-width).tickSizeOuter(0);
  yAxisGroup.call(yAxis);
  d3.selectAll(parent + ' .d3-group').attr('d', function(d) { return line(d.values); }) ;
  d3.selectAll(parent + ' .d3-focuspoint').attr("cx", xz(lastDate));
  zoom 
    .translateExtent([[0,0], [width, height]])
    .extent([[0, 0], [width, height]])
        
  view
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height);
 
   svg.call(zoom.transform, d3.zoomIdentity);

});   */ 