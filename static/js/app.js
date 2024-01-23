const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data 
d3.json(url).then(function(data) {
  console.log(data);
});

// Set up variables 
var sample_values;
var meta_data;

//Get data from JSON for the charts, and populate dropdown menu with ID's
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    meta_data = data.metadata;
    sample_values = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(meta_data[0]);
    hbarChart(sample_values[0]);
    bubbleChart(sample_values[0]);
});

//Initiate function to change ID with dropdown menu
function optionChanged(value) {
    const selectedId = sample_values.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    // Insterting Demographic Data for display
    metaData(demographicInfo);

    // Bar Chart
    hbarChart(selectedId);

    // Bubble Chart
    bubbleChart(selectedId);

}

//Create demographic info Display corresponding to the ID selected from the dropdown menu
function metaData(demographicInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${demographicInfo.id} <br> 
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );
}

// Create the bar chart
function hbarChart(selectedId) {
    let x_axis = selectedId.sample_values.slice(0, 10).reverse();  // Limit results to 10
    let y_axis = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = selectedId.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
        marker: {
            color: 'olive', // Set bars to olive green
        }
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 30, // Adjusted top margin to make space for axis labels
            b: 100,
        },
        height: 500,
        width: 600,

        xaxis: {
            gridcolor: 'rgba(255,255,255,0.3)', // Add gridlines with opacity
            title: 'Sample Values', // X-axis label
        },
        yaxis: {
            title: 'OTU ID', // Y-axis label
        }
    };

    Plotly.newPlot("bar", chart, layout);
}




// Create the bubble chart
function bubbleChart(selectedId) {
    let x_axis = selectedId.otu_ids;
    let y_axis = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;

    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Electric",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
        yaxis: {
            title: { text: "Sample Values" },
        },

    };

    Plotly.newPlot("bubble", chart, layout);
}
