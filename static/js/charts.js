
function init () {

    console.log("init");
    d3.json('http://127.0.0.1:5000/usdata').then(function (data) {

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
        marker: {
    color: 'rgb(142,124,195)'
  }
                };

      var trace2= { x: state_dog,
                  y: total_dog,
                 type: "bar",
          marker: {
    color: 'rgb(57,175,45)'
  }
                };
                var data = [trace1,trace2]

                var layout = {barmode: 'group'};

                Plotly.newPlot("bar", data);




    });
};


init();
