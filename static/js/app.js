function buildCountryBankCountBar(country) {
    // fetch data
    let URL = '/bankcount/' + country;
    d3.json(URL).then(function(data) {
        let dates = data[0]
        let totals = data[1]
        console.log(data)
        console.log(dates)
        var barchartdata = [{
            x: dates,
            y: totals,
            type: "bar"
           }];
           var barchartlayout = {
            title: "The number of top banks in a country over time.",
            
           };
           Plotly.newPlot("countrybankcountbar",barchartdata, barchartlayout)
    });
};
function init(){

   buildCountryBankCountBar('Spain');
};
init();