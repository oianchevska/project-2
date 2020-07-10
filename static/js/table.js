var tableData = undefined;
 var tbody = d3.select("tbody");

d3.json('https://unc-project-2.herokuapp.com/table').then(function (data) {
    console.log("table data")
    console.log(data)
    tableData=data.table

    tableBuilder(tableData);
})



function tableBuilder(data) {

    tbody.selectAll("tr").remove();
    console.log(data)

    data.forEach(function (record) {

        var row = tbody.append("tr");

        Object.values(record).forEach(function (recordValue) {

                var td = row.append("td")

                td.text(recordValue)
            }
        );

    });

};


var findButton = d3.select("#filter-btn");

findButton.on("click", function () {

    console.log("Button")

    var inputType = d3.select("#type").property("value")
    var inputBreed = d3.select("#breed").property("value")
    var inputAge = d3.select("#age").property("value")
    var inputGender =d3.select("#gender").property("value")
    var inputState = d3.select("#state").property("value")
    var inputCity = d3.select("#city").property("value")

    var filteredData = tableData.filter(function (rec) {

            var typeFlag = true;
            var breedFlag = true;
            var ageFlag = true;
            var genderFlag = true;
            var stateFlag = true;
            var cityFlag = true;

            if (inputType !== "") {

                typeFlag = rec["type"] === inputType;
            };

            if (inputBreed !== "") {
                breedFlag = rec["breeds"] === inputBreed;
            };

            if (inputAge !== "") {
                ageFlag = rec["age"] === inputAge;
            };


        if (inputGender !== "") {

            genderFlag = rec["gender"] === inputGender;
        };

        if (inputState !== "") {

            stateFlag = rec["state"] === inputState;
        };

        if (inputCity !== "") {

            cityFlag = rec["city"] === inputCity;
        };
            return typeFlag & cityFlag & stateFlag & ageFlag & genderFlag & breedFlag;
        }
    );


    tableBuilder(filteredData);


});

