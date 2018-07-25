// https://stackoverflow.com/questions/42980268/d3-tooltip-show-values-from-nested-dataset
// https://chat.stackoverflow.com/rooms/138853/discussion-between-mark-and-scooterlord
// https://jsfiddle.net/2en21Lqh/17


var data = [{"name":"line1","date":"2016-10-15T11:01:00Z","value":57},
{"name":"line1","date":"2016-10-15T11:02:00Z","value":22},
{"name":"line1","date":"2016-10-15T11:03:00Z","value":75},
{"name":"line1","date":"2016-10-15T11:04:00Z","value":69},
{"name":"line2","date":"2016-10-15T11:01:00Z","value":18},
{"name":"line2","date":"2016-10-15T11:02:00Z","value":47},
{"name":"line2","date":"2016-10-15T11:03:00Z","value":39},
{"name":"line2","date":"2016-10-15T11:04:00Z","value":12},
{"name":"line3","date":"2016-10-15T11:01:00Z","value":60},
{"name":"line3","date":"2016-10-15T11:02:00Z","value":95},
{"name":"line3","date":"2016-10-15T11:03:00Z","value":85},
{"name":"line3","date":"2016-10-15T11:04:00Z","value":67}]

    margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 30
    };


    var parentNode = d3.select('#chart-id').node(),
        parent = '#chart-id';

    var containerwidth = 600, //parentNode.getBoundingClientRect().width,
        containerheight = 400, //parentNode.getBoundingClientRect().height,
        width = containerwidth - margin.left - margin.right,
        height = containerheight - margin.top - margin.bottom;
                                                             
    var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ")
    
    var bisectDate = d3.bisector(function(d) { 
      return d.date;
    }).left;

    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
    });

    function sortByDateAscending(a, b) {
      return a.date - b.date;
    }
    dataset = data.sort(sortByDateAscending);

    var dataGroup = d3.nest()
      .key(function(d) {
        return d.name;
      })
      .entries(data);

    dataGroup.forEach(function(d) {
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
        if (e.enabled) ds.push(e.key + " " + d.value);
      });
    
      var mouse = d3.mouse(svg.node()).map(function(d) {
        return parseInt(d);
      });
      var left = Math.min(containerwidth, mouse[0]+margin.left+margin.right),
          top = Math.min(containerheight, mouse[1]+margin.top+margin.right);

      //console.log(fData);

      d3.selectAll(parent + ' .d3-focuspoint')
        .classed("hidden", false)
        .attr("cx", xz(lastDate))
        .attr("cy", function(d,i) {  
        	return yz(cys[i]);
      });

      tooltip
        .html(lastDate.toString() + "<br/>" + ds.join("<br/>"))
        .classed('hidden', false)
        .style('left', left + 'px')
        .style('top', top + 'px');          
    
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
    	 .domain([1,2,3,4,5])
    	 .range(["#2d74d0", "#ab2ecd", "#dd2170","#fa5802", "#c8b331"]);    



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
        
      } 
    
$(window).on('resize', function() {
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

});    