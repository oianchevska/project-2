function init() {

    console.log("init");
    d3.json('https://unc-project-2.herokuapp.com/breeds').then(function(data) {

        console.log(data.breeds);

        var breeds_cat = data.breeds.filter(function(rec) {
            if (rec.total < 30) {
                return
            } else { return rec.type == "Cat" }

        }).map(function(rec) {
            return rec.breeds
        })

        var breeds_dog = data.breeds.filter(function(rec) {
            if (rec.total < 30 || rec.total > 250) {
                return
            } else { return rec.type == "Dog" }
        }).map(function(rec) {
            return rec.breeds
        })

        var total_cat = data.breeds.filter(function(rec) {

            if (rec.total < 30) {
                return
            } else { return rec.type == "Cat" }


        }).map(function(rec) {
            return rec.total
        })

        var total_dog = data.breeds.filter(function(rec) {
            if (rec.total < 30) {
                return
            } else {
                return rec.type == "Dog"
            }

        }).map(function(rec) {
            return rec.total
        })

        console.log(breeds_dog)
        console.log(breeds_cat)
        console.log(total_dog)
        console.log(total_cat)
        console.log(typeof breeds_dog[0])

        var dog_colorwheel = breeds_dog.map(function(dog) {
            var o = Math.round,
                r = Math.random,
                s = 255;
            return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')'
        })

        var cat_colorwheel = breeds_cat.map(function(cat) {
            var o = Math.round,
                r = Math.random,
                s = 255;
            return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')'
        })

        var ctx = document.getElementById('dogBreedChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'polarArea',

            // The data for our dataset
            data: {
                labels: breeds_dog,
                datasets: [{
                    label: 'Dog Breeds',
                    backgroundColor: dog_colorwheel,
                    borderColor: 'transparent',
                    data: total_dog
                }]
            },

            // Configuration options go here
            options: {
                animation: { animateRotate: true },
                legend: {
                    position: 'left',
                    align: 'center',
                    padding: 500,
                    labels: {
                        boxWidth: 10,
                        fontSize: 15
                    }
                },

                title: { display: true, text: 'Dog Breeds', fontSize: 40, fontFamily: 'Gill Sans', padding: 40 },
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        //     top: 100
                    }
                }


            }



        });


    });
};


init();

// function init() {

//     console.log("init");



//     d3.json('http://127.0.0.1:5000/breeds').then(function(data) {


//     }).catch(function(error) {
//         console.log(error);
//     });
// };


// init();


// console.log(breeds_dogs)
// 'data' is the info returning from my local:5000/breeds (API call)
// 'map' goes through a list or array and