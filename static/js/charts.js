
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
                 width:0.8,
                 name:"Cats",
        marker: {
    color: '#CCCCCC',
         line: {
      color: 'rgb(8,48,107)',
      width: 0.9
    }
  }
                };

      var trace2= { x: state_dog,
                  y: total_dog,
                 type: "bar",
                 width:0.8,
                 name: "Dogs",
          marker: {
        color: '#FFCCCC',
         line: {
      color: 'rgb(8,48,107)',
      width: 0.9
    }
  }
                };
                var data = [trace1,trace2]

                var layout = {barmode: 'group',
                              title: 'Number of pets in the U.S.'
                    };

                Plotly.newPlot("bar", data,layout);




    });
};


init();

