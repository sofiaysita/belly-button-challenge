const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// function that contains instructions at page load/refresh
// function does not run until called
function init(){

    // this checks that our initial function runs.
    console.log("The Init() function ran")

    // create dropdown/select
    let dropdownMenu = document.getElementById('selDataset');
    d3.json(url).then(function(data){
        console.log(data)
        for (let i = 0; i < data.names.length; i++) {
            option = document.createElement('option');
            option.text = data.names[i];
            dropdownMenu.appendChild(option);
          }
    })

    // run functions to generate plots
    createScatter('940')
    createBar('940')
    createSummary('940')

}

// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
    // code that updates graphics
    // one way is to recall each function
    createScatter(newID)
    createBar(newID)
    createSummary(newID)
   
}

function createScatter(id){
    // code that makes scatter plot at id='bubble'
    let otuIDs =[];
    let sampleValues = [];
    let otuLabels = [];
    d3.json(url).then(function(data){
        for (let i = 0; i < data.samples.length; i++){
            if(id === data.samples[i].id){
                for(let j =0; j < data.samples[i].sample_values.length; j++){
                    otuIDs.push(data.samples[i].otu_ids[j])
                    sampleValues.push(data.samples[i].sample_values[j])
                    otuLabels.push(data.samples[i].otu_labels[j])

                }
            }
        }

        let scatterGraph = [{
            x:otuIDs,
            y:sampleValues,
            mode:'markers',
            marker: {color:otuIDs, size:sampleValues},
            text:otuLabels
            }];

        Plotly.newPlot("bubble", scatterGraph)
        })
    // checking to see if function is running
    console.log(`This function generates scatter plot of ${id} `)
}

function createBar(id){
    // code that makes bar chart at id='bar'
    let values = [];
    let labels = [];
    let hoverText = [];
    d3.json(url).then(function(data){
    for(let i = 0; i < data.samples.length; i++){
        if(id === data.samples[i].id){
            for(let j = 0; j < 10; j++){
                values.push(data.samples[i].sample_values[j]);
                labels.push(data.samples[i].otu_ids[j]);
                hoverText.push(data.samples[i].otu_labels[j]);
            }
        }
    }
    for(let i = 0; i < labels.length; i++){
        labels[i] = "OTU-" + labels[i] 
    }
 
    let barGraph = [{
        type: 'bar',
        x:values,
        y:labels,
        orientation: 'h',
        mode:'markers',
        marker: {color: 'blue', width:5},
        text:hoverText, 
        }];
        
    Plotly.newPlot("bar", barGraph)
    })
    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)
}

function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    d3.json(url).then(function(data){
        let demoInfo = "";
        let summTable = document.getElementById("sample-metadata")
        idType = Number(id)
        for(let i = 0; i < data.metadata.length; i++){
            let demoData = data.metadata[i]
            if(idType === demoData.id){
                for(let [key,value] of Object.entries(demoData)){
                    demoInfo += key + ": " + value + "<br>"
                }
            }
        };
        summTable.innerHTML = demoInfo;
    });
    // checking to see if function is running
    console.log(`This function generates summary info of ${id} `)
}

// function called, runs init instructions
// runs only on load and refresh of browser page
init()


// STRATEGIES
// 1.  Inside-Out:  Generate each chart by assuming an ID/name then refactor the code to 
//                  work for any ID/name coming from the function.  I typically do this practice.
// 2.  Outside-In:  Generate the control (dropdown) and how the control interacts with the other parts.
//                  I gave you the basics of how it interacts above.  You could generate the dropdown
//                  and then see in the console the ID/names update as you make a change.  Then you could
//                  make your chart code.

// Overall, the above are the two steps you need to do (1.  Make plots with data, 2. make dropdown that passes id to functions)
// You could do it in either order.