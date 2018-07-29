var data = [
    {
        "year": "2008",
        "Unmarried Rural": 5741,
        "Unmarried Urban": 17307
      },{
      "year": "2009",
        "Unmarried Rural": 5790,
        "Unmarried Urban": 16366
      },{
      "year": "2010",
        "Unmarried Rural": 5741,
        "Unmarried Urban": 15549
      },{
        "year": "2011",
        "Unmarried Rural": 5517,
        "Unmarried Urban": 14451
      },{
        "year": "2012",
        "Unmarried Rural": 5493,
        "Unmarried Urban": 14938
      },
      {
        "year": "2013",
        "Unmarried Rural": 5180,
        "Unmarried Urban": 14682
      },
      {
        "year": "2014",
        "Unmarried Rural": 5108,
        "Unmarried Urban": 15032
      },
      {
        "year": "2015",
        "Unmarried Rural": 4430,
        "Unmarried Urban": 14729
      },
      {
        "year": "2016",
        "Unmarried Rural": 4216,
        "Unmarried Urban": 15676
      },
      {
        "year": "2017",
        "Unmarried Rural": 3690,
        "Unmarried Urban": 15732
      }
    
]
  
  var h = 200;
  var w = 200;
  var svg = d3.select('body').append('svg').attr('width',w).attr('height',h);
  var g = svg.append('g');
  
  
  var x = d3.scaleBand().rangeRound([0, w-50]);
  var y = d3.scaleLinear().range([h-50, 0]).domain([0,50000]);
  var color = ['#bae4bc','#7bccc4','#43a2ca'];
  
  var stack = d3.stack()
      .keys(["Unmarried Rural", "Unmarried Urban"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
      
  var series = stack(data);
  
  x.domain(data.map(function(d) { return d.year; }));
  
  g.append("g")
      .selectAll("g")
      .data(series)
      .enter().append("g")
          .attr("fill", function(d,i) { return color[i]; })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
          .attr("x", function(d) { return x(d.data.year  ); })
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return y(d[0]) - y(d[1]); })
          .attr("width", x.bandwidth());