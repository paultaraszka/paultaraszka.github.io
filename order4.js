// https://stackoverflow.com/questions/42980268/d3-tooltip-show-values-from-nested-dataset
// https://chat.stackoverflow.com/rooms/138853/discussion-between-mark-and-scooterlord
// https://jsfiddle.net/2en21Lqh/17


var data = [
  {
     "name": "Total",
     "date": "2008",
     "change": "0%",
     "value": 416437
  },
  {
     "name": "Total",
     "date": "2009",
     "change": "0.70%",
     "value": 419337
  },
  {
     "name": "Total",
     "date": "2010",
     "change": "-1.02%",
     "value": 415030
  },
  {
     "name": "Total",
     "date": "2011",
     "change": "-6.01%",
     "value": 390069
  },
  {
     "name": "Total",
     "date": "2012",
     "change": "-5.67%",
     "value": 387858
  },
  {
     "name": "Total",
     "date": "2013",
     "change": "-4.36%",
     "value": 370962
  },
  {
     "name": "Total",
     "date": "2014",
     "change": "1.49%",
     "value": 376501
  },
  {
     "name": "Total",
     "date": "2015",
     "change": "-1.91%",
     "value": 369308
  },
  {
     "name": "Total",
     "date": "2016",
     "change": "3.51%",
     "value": 382257
  },
  {
     "name": "Total",
     "date": "2017",
     "change": "5.16%",
     "value": 401982
  },
  
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
      
      console.log(d);
      d.enabled = false;
      if (d.key == "Total") {
        d.enabled = true;
      } 
      //d.enabled = true;
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
        if (e.enabled) ds.push("<b>" + e.key + " child:</b> " + d.value + "&emsp;<b>Change:</b> " + d.change );
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
    
    svg.call(zoom); // Call zoom function
                  

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
        d.enabled = !d.enabled;  // Javascript toggle
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
      lines.select("#start").remove();
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

      lines.append("line")
        .attr("id", "announce")
        .attr("x1", xz(announceYear))  //<<== change your code here
        .attr("y1", 0)
        .attr("x2", xz(announceYear))  //<<== and here
        .attr("y2", height)
        .style("stroke-width", 1)
        .style("stroke", "#02A6E3")
        .style("stroke-dasharray","5,5")
        .style("opacity", ".75")
        .style("fill", "none");

        lines.append("line")
        .attr("id", "start")
        .attr("x1", xz(startYear))  //<<== change your code here
        .attr("y1", 0)
        .attr("x2", xz(startYear))  //<<== and here
        .attr("y2", height)
        .style("stroke-width", 1)
        //.style("lineDashType", "dash")
        .style("stroke", "#02A6E3")
        .style("stroke-dasharray","5,5")
        .style("opacity", ".75")
        .style("fill", "none");

      //lines.append("text")
      //  .classed("annotation", true)
      // .attr("x",xz(announceYear) - 110 )
      //  .attr("y", 0)
      //  .attr("text-anchor", "left")
      //  .text("Family 500 announced")


      

      tooltip1 = d3.select(parent)
      .append('div')                                                              
      .classed('annotation', true)
      //.classed('d3-focuspoint',true)
      //.classed('hidden',true)
      .html("Family 500 program details first announced")
        .style('left', (xz(announceYear) - 80) + 'px')
        .style('top', (margin.top + 50) + 'px'); 

      if (((xz(announceYear))-110) > width) {
        tooltip1.classed("hidden",true);
      };

      tooltip2 = d3.select(parent)
      .append('div')                                                            
      .classed('annotation', true)
      //.classed('d3-focuspoint',true)
      //.classed('hidden',true)
      .html("Family 500 program put into law and implemented")
        .style('left', (xz(startYear) +40) + 'px')
        .style('top', (margin.top + 50) + 'px'); 

      if (((xz(startYear))-110) > width) {
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