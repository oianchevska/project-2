const petsData = 'https://unc-project-2.herokuapp.com/pets';

var dogColors = [];
var catColors = [];

function getBreedsAndColors(){
    d3.json(petsData)
        .then(data => {
            data=data["pets"];
            data.forEach(pet => {
                if (pet.type === "Dog"){
                    if (pet.colors !== null){
                        dogColors.push(pet.colors)
                    }
                } else {
                    if (pet.colors !== null){
                        catColors.push(pet.colors)
                    }
                };
            });
            console.log(dogColors);

            var colorFrequency = {};
            var catColorFrequency = {};

            dogColors.forEach(colorName => {
                if (colorName in colorFrequency){
                    colorFrequency[colorName] += 1;
                } else {
                    colorFrequency[colorName] = 1;
                };
            });
            console.log(colorFrequency);

            catColors.forEach(catColorName => {
                if (catColorName in catColorFrequency){
                    catColorFrequency[catColorName] += 1;
                } else {
                    catColorFrequency[catColorName] = 1;
                };
            });
            
            var newColorFrequency = Object.entries(colorFrequency).map(value => ({
                'Color': value[0], 'Available': value[1]
            }));
            console.log(newColorFrequency);

            var newCatColorFrequency = Object.entries(catColorFrequency).map(value => ({
                'CatColor': value[0], 'CatsAvailable': value[1]
            }));

            var sortedColors = newColorFrequency.sort((a, b) => 
                b.Available - a.Available
            );
            console.log(sortedColors);

            var sortedCatColors = newCatColorFrequency.sort((a, b) =>
                b.CatsAvailable - a.CatsAvailable
            );

            var barTrace = {
                x: sortedColors.slice(0, 7).reverse().map(object => object.Available),
                y: sortedColors.slice(0, 7).reverse().map(object => object.Color),
                text: sortedColors.slice(0, 7).reverse().map(object => object.Color),
                hoverlabel: {font: {size: 12, family: 'sans-serif'}},
                marker: {
                    color: [
                        '#660000',
                        '#990000',
                        '#ffb3b3',
                        '#ffcccc',
                        '#ffe6e6',
                        '#cccccc',
                        '#e6e6e6'
                    ],
                    opacity: 1,
                },
                type: 'bar',
                orientation: 'h'
            };

            var data = [barTrace];

            var layout = {
                title: {
                    text: 'Top Dog Colors',
                    font: {
                        family: 'sans-serif',
                        size: 23,
                        color: 'black'
                    },
                    xanchor: 'left',
                    pad:{t: 0, r: 0, l: -45, b: 0}
                },
                margin: {
                    l: 240,
                    r: 0,
                    t: 100,
                    b: 50
                },
                height: 550,
                width: 550,
                xaxis: {
                    tickwidth: 10,
                    tickcolor: '#ffffff',
                    tickfont: {family: 'sans-serif', color: '#808080', size: 16}
                },
                yaxis: { 
                    automargin: true,
                    tickwidth: 20,
                    tickcolor: '#ffffff',
                    tickfont: {family: 'sans-serif', color: '#808080', size: 16}
                },
            };

            Plotly.newPlot('barDog', data, layout,{
                modeBarButtonsToRemove: [
                    'zoom2d',
                    'pan2d',
                    'select2d',
                    'lasso2d',
                    'autoScale2d',
                    'toggleSpikelines',
                    'hoverCompareCartesian'
                ]
            });

            var catBarTrace = {
                x: sortedCatColors.slice(0, 7).reverse().map(object => object.CatsAvailable),
                y: sortedCatColors.slice(0, 7).reverse().map(object => object.CatColor),
                text: sortedCatColors.slice(0, 7).reverse().map(object => object.CatColor),
                hoverlabel: {font: {size: 12, family: 'sans-serif'}},
                marker: {
                    color: [
                        '#660000',
                        '#990000',
                        '#ffb3b3',
                        '#ffcccc',
                        '#ffe6e6',
                        '#cccccc',
                        '#e6e6e6'
                    ],
                    opacity: 1,
                },
                type: 'bar',
                orientation: 'h'
            };

            var data = [catBarTrace];

            var layout = {
                title: {
                    text: 'Top Cat Colors',
                    font: {
                        family: 'sans-serif',
                        size: 23,
                        color: 'black'
                    },
                    xanchor: 'left',
                    pad:{t: 0, r: 0, l: -45, b: 0}
                },
                margin: {
                    l: 200,
                    r: 20,
                    t: 100,
                    b: 50
                },
                height: 550,
                width: 540,
                xaxis: {
                    tickwidth: 10,
                    tickcolor: '#ffffff',
                    tickfont: {family: 'sans-serif', color: '#808080', size: 16}
                },
                yaxis: { 
                    automargin: true,
                    tickwidth: 20,
                    tickcolor: '#ffffff',
                    tickfont: {family: 'sans-serif', color: '#808080', size: 16}
                },
            };

            Plotly.newPlot('barCat', data, layout,{
                modeBarButtonsToRemove: [
                    'zoom2d',
                    'pan2d',
                    'select2d',
                    'lasso2d',
                    'autoScale2d',
                    'toggleSpikelines',
                    'hoverCompareCartesian'
                ]
            });

            var dropdownMenu = d3.select('#selDogColor');

            var slicedColors = sortedColors.slice(0, 7).map(object => object.Color);
            console.log(slicedColors);
            
            slicedColors.forEach(name => dropdownMenu
                .append('option')
                .text(name)
                .property('value'),
   
                getGaugesAndPie(slicedColors[0]),
                getDogBubble(slicedColors[0])
            );

            var catDropdownMenu = d3.select('#selCatColor');

            var slicedCatColors = sortedCatColors.slice(0, 7).map(object => object.CatColor);
            console.log(slicedCatColors);

            slicedCatColors.forEach(name => catDropdownMenu
                .append('option')
                .text(name)
                .property('value'),
            );

            getCatPieAndGauges(slicedCatColors[0]);
            getCatBubble(slicedCatColors[0]);
        },
    );
};

function optionChanged(color) {
    getGaugesAndPie(color);
    getDogBubble(color);
};

function getGaugesAndPie(color) {
    d3.json(petsData)
        .then(data => {
            data=data["pets"];
            var babyDog = [];
            var youngDog = [];
            var adultDog = [];
            
            data.forEach(pet => {
                if (pet.type === "Dog" && pet.colors === color){
                    if (pet.age === "Baby"){
                        babyDog.push(pet.age)
                    } else if (pet.age === "Young"){
                        youngDog.push(pet.age)
                    } else if (pet.age === "Adult"){
                        adultDog.push(pet.age)
                    }
                };
            });

            var dataB = [{
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number',
                value: babyDog.length,
                title: {
                    text: `Color: ${color}<br><i>Baby Dogs</i>`,
                    font: { size: 18, color: 'black', family: 'sans-serif'}
                },
                gauge: {
                    axis: { range: [null, 200], tickwidth: 1, tickcolor: 'darkgrey'},
                    bar: { color: '#cccccc', thickness: 0.2},
                    bgcolor: 'white',
                    borderwidth: 0,
                    bordercolor: 'gray',
                    steps:[
                        { range: [0, 50], color: '#ffe6e6'},
                        { range: [50, 100], color: '#ffcccc'},
                        { range: [100, 150], color: '#ffb3b3'},
                        { range: [150, 200], color: '#990000'}
                    ]
                },
            }];
            var layoutB = {
                width: 320,
                height: 300,
                margin: { t: 40, r: 28, l: 35, b: 0},
                font: { color: 'darkgrey', family: 'sans-serif'}
            };
            Plotly.newPlot('gaugeDog1', dataB, layoutB);

            var dataY = [{
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number',
                value: youngDog.length,
                title: {
                    text: `Color: ${color}<br><i>Young Dogs</i>`,
                    font: { size: 18, color: 'black', family: 'sans-serif'}
                },
                gauge: {
                    axis: { range: [null, 200], tickwidth: 1, tickcolor: 'darkgrey'},
                    bar: { color: '#cccccc', thickness: 0.2},
                    bgcolor: 'white',
                    borderwidth: 0,
                    bordercolor: 'gray',
                    steps: [
                        { range: [0, 50], color: '#ffe6e6'},
                        { range: [50, 100], color: '#ffcccc'},
                        { range: [100, 150], color: '#ffb3b3'},
                        { range: [150, 200], color: '#990000'}
                    ],
                },
            }];
            var layoutY = {
                width: 320,
                height: 300,
                margin: { t: 40, r: 28, l: 35, b: 0},
                font: { color: 'darkgrey', family: 'sans-serif'}
            };
            Plotly.newPlot('gaugeDog2', dataY, layoutY);

            var dataA = [{
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number',
                value: adultDog.length,
                title: {
                    text: `Color: ${color}<br><i>Adult Dogs</i>`,
                    font: { size: 18, color: 'black', family: 'sans-serif'}
                },
                gauge: {
                    axis: { range: [null, 200], tickwidth: 1, tickcolor: 'darkgrey'},
                    bar: { color: '#cccccc', thickness: .2},
                    bgcolor: 'white',
                    borderwidth: 0,
                    bordercolor: 'gray',
                    steps: [
                        { range: [0, 50], color: '#ffe6e6'},
                        { range: [50, 100], color: '#ffcccc'},
                        { range: [100, 150], color: '#ffb3b3'},
                        { range: [150, 200], color: '#990000'}
                    ],
                },
            }];
            var layoutA = {
                width: 320,
                height: 300,
                margin: { t: 40, r: 28, l: 35, b: 0},
                font: { color: 'darkgrey', family: 'sans-serif'}
            };

            Plotly.newPlot('gaugeDog3', dataA, layoutA);

            var smallDog = [];
            var mediumDog = [];
            var largeDog = [];

            data.forEach(pet => {
                if (pet.type === "Dog" && pet.colors === color){
                    if (pet.size === "Small"){
                        smallDog.push(pet.size)
                    } else if (pet.size === "Medium"){
                        mediumDog.push(pet.size)
                    } else if (pet.size === "Large"){
                        largeDog.push(pet.size)
                    }
                };
            });

            var data = [{
                type: "pie",
                values: [smallDog.length, mediumDog.length, largeDog.length],
                labels: ['Small', 'Medium', 'Large'],
                name: `${color}`,
                hoverinfo: 'label+percent+name+value',
                textinfo: 'percent+name',
                hole: 0.45,
                marker: {
                    colors: ['#cccccc', '#990000', '#660000'],
                    line: {
                      color: 'white',
                      width: 3
                    }
                },
                textfont: {
                    family: 'sans-serif',
                    color: 'white',
                    size: 16
                },
                hoverlabel: {
                    bgcolor: 'gray',
                    bordercolor: 'white',
                    opacity: 1,
                    font: {
                      family: 'sans-serif',
                      //color: 'gray',
                      size: 12
                    },
                }
            }];

            var layout = {
                title: {
                    text:'Dogs by Size for Selected<br>Coat Color',
                    font: {
                        family: 'sans-serif',
                        size: 23,
                        color: 'black'
                    }
                },
                font: {
                    family: 'sans-serif',
                    size: 16,
                    color: '#808080'
                },
                height: 550,
                width: 420,
                legend: {"orientation": "h", x: -.04}
            };

            Plotly.plot('pieDog', data, layout);
        }
    );
};

function catOptionChanged(color) {
    getCatPieAndGauges(color);
    getCatBubble(color)
};

function getCatPieAndGauges(color) {
    d3.json(petsData)
        .then(data => {
            data = data["pets"];

            var smallCat = [];
            var mediumCat = [];
            var largeCat = [];
            var babyCat = [];
            var youngCat = [];
            var adultCat = [];

            data.forEach(pet => {
                if (pet.type === "Cat" && pet.colors === color){
                    if (pet.size === "Small"){
                        smallCat.push(pet.size)
                    }  if (pet.size === "Medium"){
                        mediumCat.push(pet.size)
                    }  if (pet.size === "Large"){
                        largeCat.push(pet.size)
                    }  if (pet.age === "Baby"){
                        babyCat.push(pet.age)
                    }  if (pet.age === "Young"){
                        youngCat.push(pet.age)
                    }  if (pet.age === "Adult"){
                        adultCat.push(pet.age)
                    };
                }; 
            });

            var data = [{
                type: "pie",
                values: [smallCat.length, mediumCat.length, largeCat.length],
                labels: ['Small', 'Medium', 'Large'],
                name: `${color}`,
                hoverinfo: 'label+percent+name+value',
                textinfo: 'percent+name',
                hole: 0.45,
                direction: 'clockwise',
                marker: {
                    colors: ['#cccccc', '#990000', '#660000'],
                    line: {
                      color: 'white',
                      width: 3
                    }
                },
                textfont: {
                    family: 'sans-serif',
                    color: 'white',
                    size: 16
                },
                hoverlabel: {
                    bgcolor: 'gray',
                    bordercolor: 'white',
                    opacity: 1,
                    font: {
                      family: 'sans-serif',
                      //color: 'gray',
                      size: 12
                    },
                }
            }];

            var layoutPie = {
                title: {
                    text:'Cats by Size for Selected<br>Coat Color',
                    font: {
                        family: 'sans-serif',
                        size: 23,
                        color: 'black',
                    },
                },
                font: {
                    family: 'sans-serif',
                    size: 16,
                    color: '#808080'
                },
                height: 550,
                width: 420,
                legend: {"orientation": "h", x: -.04}
            };

            Plotly.plot('pieCat', data, layoutPie);

            var dataBCat = [{
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number',
                value: babyCat.length,
                title: {
                    text: `Color: ${color}<br><i>Baby Cats</i>`,
                    font: { size: 18, color: 'black', family: 'sans-serif'}
                },
                gauge: {
                    axis: { range: [null, 400], tickwidth: 1, tickcolor: 'darkgrey'},
                    bar: { color: '#cccccc', thickness: 0.2},
                    bgcolor: 'white',
                    borderwidth: 0,
                    bordercolor: 'gray',
                    steps:[
                        { range: [0, 100], color: '#ffe6e6'},
                        { range: [100, 200], color: '#ffcccc'},
                        { range: [200, 300], color: '#ffb3b3'},
                        { range: [300, 400], color: '#990000'}
                    ]
                },
            }];

            var layoutBCat = {
                width: 320,
                height: 300,
                margin: { t: 40, r: 28, l: 35, b: 0},
                font: { color: 'darkgrey', family: 'sans-serif'}
            };

            Plotly.newPlot('gaugeCat1', dataBCat, layoutBCat);

            var dataYCat = [{
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number',
                value: youngCat.length,
                title: {
                    text: `Color: ${color}<br><i>Young Cats</i>`,
                    font: { size: 18, color: 'black', family: 'sans-serif'}
                },
                gauge: {
                    axis: { range: [null, 400], tickwidth: 1, tickcolor: 'darkgrey'},
                    bar: { color: '#cccccc', thickness: 0.2},
                    bgcolor: 'white',
                    borderwidth: 0,
                    bordercolor: 'gray',
                    steps: [
                        { range: [0, 100], color: '#ffe6e6'},
                        { range: [100, 200], color: '#ffcccc'},
                        { range: [200, 300], color: '#ffb3b3'},
                        { range: [300, 400], color: '#990000'}
                    ],
                },
            }];

            var layoutYCat = {
                width: 320,
                height: 300,
                margin: { t: 40, r: 28, l: 35, b: 0},
                font: { color: 'darkgrey', family: 'sans-serif'}
            };

            Plotly.newPlot('gaugeCat2', dataYCat, layoutYCat);

            var dataACat = [{
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number',
                value: adultCat.length,
                title: {
                    text: `Color: ${color}<br><i>Adult Cats</i>`,
                    font: { size: 18, color: 'black', family: 'sans-serif'}
                },
                gauge: {
                    axis: { range: [null, 400], tickwidth: 1, tickcolor: 'darkgrey'},
                    bar: { color: '#cccccc', thickness: .2},
                    bgcolor: 'white',
                    borderwidth: 0,
                    bordercolor: 'gray',
                    steps: [
                        { range: [0, 100], color: '#ffe6e6'},
                        { range: [100, 200], color: '#ffcccc'},
                        { range: [200, 300], color: '#ffb3b3'},
                        { range: [300, 400], color: '#990000'}
                    ],
                },
            }];

            var layoutACat = {
                width: 320,
                height: 300,
                margin: { t: 40, r: 28, l: 35, b: 0},
                font: { color: 'darkgrey', family: 'sans-serif'}
            };

            Plotly.newPlot('gaugeCat3', dataACat, layoutACat);
        }
    );
    
};

function getDogBubble(color) {
    d3.json(petsData)
        .then(data => {
            data = data["pets"];
            var sortedDogs = data
            .filter(pet => pet.type === "Dog" && pet.colors === color);

            var dogBreeds = [];
            sortedDogs.forEach(dog => dogBreeds.push(dog.breeds));

            var breedFrequency = {};
            dogBreeds.forEach(breedName => {
                if (breedName in breedFrequency){
                    breedFrequency[breedName] += 1;
                } else {
                    breedFrequency[breedName] = 1;
                };
            });

            var newBreedFrequency = Object.entries(breedFrequency).map(value => ({
                'Breed': value[0], 'Available': value[1]
            }));

            var bubbleTrace = {
                x: newBreedFrequency.map(dog => dog.Breed),
                y: newBreedFrequency.map(dog => dog.Available),
                mode: "markers",
                marker: {
                    size: newBreedFrequency.map(dog => dog.Available),
                    sizeref: 0.002,
                    sizemode: 'area',
                    color: newBreedFrequency.map(dog => dog.Available),
                    colorscale: [
                        [0, '#990000'],
                        [0.1,'#990000'],
                        [0.1, '#cccccc'],
                        [0.7, '#cccccc'],
                        [0.7, '#660000'],
                        [1.0, '#660000']
                    ],
                    opacity: 0.7,
                    line: {
                        color: '#999999',
                        width: 1,
                        opacity: 0.6
                    }
                },
            };

            var data = [bubbleTrace];

            var layout = {
                title: {
                    text: `Dog Breeds by ${color} Coat Color`,
                    font: {
                        family: 'sans-serif',
                        size: 23,
                        color: 'black'
                    },
                },
                margin: {l: 100, r: 50, t:100, b: 35},
                height: 550,
                width: 1080,
                xaxis: {
                    ticks: '',
                    showticklabels: false
                },
                yaxis: { 
                    automargin: true,
                    tickcolor: '#ffffff',
                    tickfont: {family: 'sans-serif', color: '#808080', size: 16},
                    title: {
                        text: 'Available Dogs',
                        standoff: 20,
                        font: {
                            family: 'sans-serif',
                            size: 16,
                            color: '#808080'
                        },
                    },
                },
            };

            Plotly.newPlot('bubbleDog', data, layout, {
                modeBarButtonsToRemove: [
                    'zoom2d',
                    'pan2d',
                    'select2d',
                    'lasso2d',
                    'autoScale2d',
                    'toggleSpikelines',
                    'hoverCompareCartesian'
                ]},
            );
        }
    );
};

function getCatBubble(color) {
    d3.json(petsData)
        .then(data => {
            data = data["pets"];
            var sortedCats = data
            .filter(pet => pet.type === "Cat" && pet.colors === color);

            var catBreeds = [];
            sortedCats.forEach(cat => catBreeds.push(cat.breeds));

            var catBreedFrequency = {};
            catBreeds.forEach(catBreedName => {
                if (catBreedName in catBreedFrequency){
                    catBreedFrequency[catBreedName] += 1;
                } else {
                    catBreedFrequency[catBreedName] = 1;
                };
            });

            var newCatBreedFrequency = Object.entries(catBreedFrequency).map(value => ({
                'CatBreed': value[0], 'AvailableCats': value[1]
            }));

            var bubbleCatTrace = {
                x: newCatBreedFrequency.map(cat => cat.CatBreed),
                y: newCatBreedFrequency.map(cat => cat.AvailableCats),
                mode: "markers",
                marker: {
                    size: newCatBreedFrequency.map(cat => cat.AvailableCats),
                    sizeref: 0.003,
                    sizemode: 'area',
                    color: newCatBreedFrequency.map(cat => cat.AvailableCats),
                    colorscale: [
                        [0, '#990000'],
                        [0.05,'#990000'],
                        [0.05,'#cccccc'],
                        [0.7, '#cccccc'],
                        [0.7, '#660000'],
                        [1.0, '#660000']
                    ],
                    opacity: 0.7,
                    line: {
                        color: '#999999',
                        width: 1,
                        opacity: 0.6
                    }
                },
            };

            var data = [bubbleCatTrace];

            var layout = {
                title: {
                    text: `Cat Breeds by ${color} Coat Color`,
                    font: {
                        family: 'sans-serif',
                        size: 23,
                        color: 'black'
                    },
                },
                margin: {l: 120, r: 50, t:100, b: 35},
                height: 550,
                width: 1080,
                xaxis: {
                    ticks: '',
                    showticklabels: false
                },
                yaxis: { 
                    automargin: true,
                    tickcolor: '#ffffff',
                    tickfont: {family: 'sans-serif', color: '#808080', size: 16},
                    title: {
                        text: 'Available Cats',
                        standoff: 20,
                        font: {
                            family: 'sans-serif',
                            size: 16,
                            color: '#808080'
                        },
                    },
                },
            };

            Plotly.newPlot('bubbleCat', data, layout, {
                modeBarButtonsToRemove: [
                    'zoom2d',
                    'pan2d',
                    'select2d',
                    'lasso2d',
                    'autoScale2d',
                    'toggleSpikelines',
                    'hoverCompareCartesian'
                ]},
            );
        }
    );
};

getBreedsAndColors();