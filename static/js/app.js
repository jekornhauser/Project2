function buildCountryBankCountLine(country) {
    // fetch data
    let URL = '/bankcountrycount/' + country;
    d3.json(URL).then(function(data) {
        let dates = data[0]
        let totals = data[1]
        console.log(data)
        console.log(dates)
        var barchartdata = [{
            x: dates,
            y: totals,
            type: "scatter"
           }];
           var barchartlayout = {
            title: "The number of top banks in a country over time.",
            
           };
           Plotly.newPlot("countrybankcountline",barchartdata, barchartlayout)
    });
};

function buildTimeBankCountBar(timeperiod) {
    // fetch data
    let URL = '/banktimecount/' + timeperiod;
    d3.json(URL).then(function(data) {
        let countries = data[0]
        let totals = data[1]
        console.log('break')
        console.log(data)
        console.log(countries)
        var barchartdata = [{
            x: countries,
            y: totals,
            type: "bar"
           }];
           var barchartlayout = {
            title: "The number of banks in each country at the selected time.",
            
           };
           Plotly.newPlot("timebankcountbar",barchartdata, barchartlayout)
    });
};

function buildCountrySumLine(country) {
    // fetch data
    let URL = '/tacountrysum/' + country;
    d3.json(URL).then(function(data) {
        let dates = data[0]
        let totals = data[1]
        console.log('break')
        console.log(data)
        console.log(dates)
        var barchartdata = [{
            x: dates,
            y: totals,
            type: "scatter"
           }];
           var barchartlayout = {
            title: "The rate of change in total assets in the selected country over time.",
            
           };
           Plotly.newPlot("tacountrysumline",barchartdata, barchartlayout)
    });
};


function buildTimeSumBar(timeperiod) {
    // fetch data
    let URL = '/tatimesum/' + timeperiod;
    d3.json(URL).then(function(data) {
        let countries = data[0]
        let totals = data[1]
        console.log('break')
        console.log(data)
        console.log(countries)
        var barchartdata = [{
            x: countries,
            y: totals,
            type: "bar"
           }];
           var barchartlayout = {
            title: "The sum of assets in each country at the selected time.",
            
           };
           Plotly.newPlot("tatimesumbar",barchartdata, barchartlayout)
    });
};

function buildBankAssetsLine(bank) {
    // fetch data
    let URL = '/bankassets/' + bank;
    d3.json(URL).then(function(data) {
        let dates = data[0]
        let totals = data[1]
        console.log('break')
        console.log(data)
        console.log(dates)
        var barchartdata = [{
            x: dates,
            y: totals,
            type: "scatter"
           }];
           var barchartlayout = {
            title: "The change in assets over time at the selected bank.",
            
           };
           Plotly.newPlot("bankassetsline",barchartdata, barchartlayout)
    });
};

function buildbankstable(timeperiod) {
    // fetch data
    let URL = '/tables/' + timeperiod;
    d3.json(URL).then(function(data) {
        let banks = data[0]
        let countries = data[1]
        let assets = data[2]
        console.log('break')
        console.log(banks)
        console.log('break')
        console.log(countries)
        console.log('break')
        console.log(assets)
    });
};


function init(){

   buildCountryBankCountLine('Spain');
   buildTimeBankCountBar('2017-12-31 00:00:00.000000');
   buildCountrySumLine('Spain');
   buildTimeSumBar('2017-12-31 00:00:00.000000')
   buildBankAssetsLine('Bank of China');
   buildbankstable('2017-12-31 00:00:00.000000'); 
};
init();