var samplesData = [];


d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

  samplesData = data;
  console.log(samplesData);
  // Initialize the bar chart with the first sample
  updateBarChart(samplesData.names[0]);

});


function updateBarChart(selectedSampleID) {
    var selectedSample = samplesData.samples.find(sample => sample.id === selectedSampleID);
  
    var topOTUs = selectedSample.otu_ids.slice(0, 10).reverse();
    var topValues = selectedSample.sample_values.slice(0, 10).reverse();
    var topLabels = selectedSample.otu_labels.slice(0, 10).reverse();
  
    var trace = {
      type: 'bar',
      x: topValues,
      y: topOTUs.map(otu => `OTU ${otu}`),
      text: topLabels,
      orientation: 'h'
    };
  
    var data = [trace];
  
    var layout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU ID' }
    };
  
    Plotly.newPlot('bar', data, layout);
  
    // Log the top 10 OTUs to the console
    console.log('Top 10 OTUs:', topOTUs);
  }
  

function optionChanged(selectedSampleID) {
  updateBarChart(selectedSampleID);
}




