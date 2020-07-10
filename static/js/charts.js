
function init () {

    console.log("init");
    d3.json('https://unc-project-2.herokuapp.com/usdata').then(function (data) {

        console.log(data.usdata);

        var state_cat=data.usdata.filter(function (rec) {
            return rec.type=="Cat"

        }).map(function (rec) {
            return rec.state
        })

         var state_dog=data.usdata.filter(function (rec) {
            return rec.type=="Dog"

        }).map(function (rec) {
            return rec.state
        })

          var total_cat=data.usdata.filter(function (rec) {
            return rec.type=="Cat"

        }).map(function (rec) {
            return rec.total
        })

        var total_dog=data.usdata.filter(function (rec) {
            return rec.type=="Dog"

        }).map(function (rec) {
            return rec.total
        })



    var trace1= { x: state_cat,
                 y: total_cat,
                 type: "bar",
                 name:"Cats",
        marker: {
    color: 'rgb(241, 196, 15)'
  }
                };

      var trace2= { x: state_dog,
                  y: total_dog,
                 type: "bar",
                 name: "Dogs",
          marker: {
    color: 'rgb(176, 58, 46)'
  }
                };
                var data = [trace1,trace2]

                var layout = {barmode: 'group',
                              title: 'Number of pets in the US'
                    };

                Plotly.newPlot("bar", data,layout);




    });
};


init();

