//Reading samples.json file by d3
  
d3.json("data/samples.json").then((data)=> {
    // console.log(data)
    //Assigning the data values to variables
    var otuid=data.samples
    //console.log(otuid)
    var id=otuid.map(d=>d.id)
    //console.log(id.length)
    var otu_id=otuid.map(d=>d.otu_ids)
    //console.log(otu_id)
    var lables=otuid.map(d=>d.otu_labels)
    //console.log(lables)
    var values=otuid.map(d=>d.sample_values)
    var temp_val=[]
    var temp_otu=[]
 
    var metadata=data.metadata
    var mid=metadata.map(d=>d.id)
    var eth=metadata.map(d=>d.ethnicity)
    var gdr=metadata.map(d=>d.gender)
    var mage=metadata.map(d=>d.age)
    var mloc=metadata.map(d=>d.loc)
    var mbtyp=metadata.map(d=>d.bbtype)
    var mwrf=metadata.map(d=>d.wfreq)
   
   //Slice the data for Top 10 values for Chart
   for(i=0;i<values.length;i++){
     temp_val[i]=values[i].slice(0, 10);
     //console.log(temp_val[i])
     temp_otu[i]=otu_id[i].slice(0,10);
     //console.log("id",temp_otu[i],"val",temp_val[i])
    }
    
    // function for onchange of selection option
     window.optionChanged=function(){
       var e = document.getElementById("selDataset").value;
       for(i=0;i<10;i++){
         if(e==id[i]){
           //Plot the Horizontal chart for OTU vs Sample Values
           var trace1 = {
           x: temp_val[i].reverse(),
           y:"OTU_ID "+temp_otu[i],
           text: lables[i],
           type: "bar",
           orientation: "h"
           };
           var chartData = [trace1];
           var layout = {
           title: 'OTU vs Sample_values',
            yticks:temp_otu[i],
            
           }
           Plotly.newPlot("bar", chartData, layout);
          
           // Plot the Bubble chart
           var trace2 = {
           x: temp_otu[i],
           y: temp_val[i],
           text:lables[i],
           mode: 'markers',
           marker: {
             size:temp_val[i],
             color:temp_otu[i],
             type:"bubble"              
           }
           };
         
           var data = [trace2];
         
           var layout = {
             xaxis: { title: 'OTU ID' },
             showlegend: false,
             
             yaxis: {
               autorange: true}
           };
           Plotly.newPlot("bubble", data, layout);
 
           //Display the demographic info
           //var PANEL=d3.select("panel-body").properties("#sample-metadata")
           var PANEL = document.getElementById("sample-metadata");
           // Clear any existing metadata
           PANEL.innerHTML = '';
           h6tag = document.createElement("h6");
           h6Text = document.createTextNode(`Id: ${mid[i]}`);
           h6tag.append(h6Text);
           PANEL.append(h6tag)
           h6tag = document.createElement("h6");
           h6Text = document.createTextNode(`Ethnicity: ${eth[i]}`);
           h6tag.append(h6Text);
           PANEL.append(h6tag)
           h6tag = document.createElement("h6");
           h6Text = document.createTextNode(`Gender: ${gdr[i]}`);
           h6tag.append(h6Text);
           PANEL.append(h6tag)
           h6tag = document.createElement("h6");
           h6Text = document.createTextNode(`Age: ${mage[i]}`);
           h6tag.append(h6Text);
           PANEL.append(h6tag)
           h6tag = document.createElement("h6");
           h6Text = document.createTextNode(`Location: ${mloc[i]}`);
           h6tag.append(h6Text);
           PANEL.append(h6tag)
           h6tag = document.createElement("h6");
           h6Text = document.createTextNode(`bbtype: ${mbtyp[i]}`);
           h6tag.append(h6Text);
           PANEL.append(h6tag)
           h6tag = document.createElement("h6");
           h6Text = document.createTextNode(`Wfreq: ${mwrf[i]}`);
           h6tag.append(h6Text);
           PANEL.append(h6tag)
 
           // BONUS Solution
         // Enter the washing frequency between 0 and 180
         var level = mwrf[i]*20;
         // Trig to calc meter point
         var degrees = 180 - level,
         radius = .5;
         var radians = degrees * Math.PI / 180;
         var x = radius * Math.cos(radians);
         var y = radius * Math.sin(radians);
         // Path: may have to change to create a better triangle
         var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
         var path = mainPath.concat(pathX,space,pathY,pathEnd);
         var data = [{ type: 'scatter',
           x: [0], y:[0],
           marker: {size: 12, color:'850000'},
           showlegend: false,
           name: 'Freq',
           text: level,
           hoverinfo: 'text+name'},
           { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
             rotation: 90,
             text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
             textinfo: 'text',
             textposition:'inside',
             marker: {
               colors:[
                 'rgba(0, 105, 11, .5)', 'rgba(10, 120, 22, .5)',
                 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                 'rgba(240, 230, 215, .5)', 'rgba(255, 255, 255, 0)']},
             labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
             hoverinfo: 'label',
             hole: .5,
             type: 'pie',
             showlegend: false
           }];
           var layout = {
               shapes:[{
               type: 'path',
               path: path,
               fillcolor: '850000',
                 line: {
                 color: '850000'
                       }
               }],
           title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
           height: 500,
           width: 500,
           xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
           yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
           };
           //var GAUGE = document.getElementById('gauge');
         Plotly.newPlot("gauge", data, layout);
 
     }
     }
    }
 
   })