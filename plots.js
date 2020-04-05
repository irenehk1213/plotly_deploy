function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
    const firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);
  })
}

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

init();

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result);
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) =>{
        //console.log(key + ': ' + value);});
    PANEL.append("h6").text(key.toUpperCase() + ': ' + value);});
  });
}
function buildCharts(sample) {
  barChart(sample);
  bubbleChart(sample);
console.log("buildCharts")
}


//Trace1 for horizontal bar graph 

function barChart(sample){
d3.json("samples.json").then((data) => {
  var samples = data.samples;
  var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
  var currentSample = resultArray[0];

  console.log(currentSample.otu_ids.slice(0,10));

//Create a Horizontal Bar CHart with the Arrays
var barSamples= {
  x: currentSample.sample_values.slice(0,10).reverse(),
  y: currentSample.otu_ids.slice(0,10).map(otuLabel => "OTU" + otuLabel.toString()).reverse(),
  text: currentSample.otu_labels,
  type: 'bar',
  orientation: 'h'
};

console.log(currentSample.sample_values.slice(0,10));

var layout = {
  title: "Belly Button Bar Chart",
  xaxis: { title: "OTU IDS"},
  yaxis: { title: "OTU LABELS"}
};

Plotly.newPlot("bar", [barSamples], layout);
});
}

//Trace2 : Bubble chart
function bubbleChart(sample){
d3.json("samples.json").then((data) => {
  var samples = data.samples;
  var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
  var currentSample= resultArray[0];

  console.log(currentSample.otu_ids.slice(0,10))

  var bubbleSample ={
    x: currentSample.otu_ids.map(otuLabel => otuLabel.toString()) ,
    y: currentSample.sample_values,
    text: currentSample.otu_labels,
    mode: 'markers',
    orientation: 'v',
    marker: {
      color: currentSample.otu_ids,
      size: currentSample.sample_values,
      colorscale: 'Earth'
    }
    }

  var laylout = {
    title: "Belly Button Bubble Chart",
    showlegened: false,
    xaxis: {title: "OTU IDS"},
    yaxis: {title: "OTU_LABELS"},
    height: 600,
    width: 900
  }
  Plotly.newPlot("bubble",[bubbleSample],laylout); 
})};

