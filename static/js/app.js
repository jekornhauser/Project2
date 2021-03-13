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
            autosize: false,
            width: 1500,
            height: 500,
            xaxis: {
                title: {
                    text:'Balance Sheet Date'
                }
            },
            yaxis: {
                title: {
                    text:'# of Banks'
                }
            }
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
            autosize: false,
            width: 1500,
            height: 500,
            xaxis: {
                title: {
                    text:'Country'
                }
            },
            yaxis: {
                title: {
                    text:'# of Banks'
                }
            }
            
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
            autosize: false,
            width: 1500,
            height: 500,
            xaxis: {
                title: {
                    text:'Balance Sheet Date'
                }
            },
            yaxis: {
                title: {
                    text:'Total Assets in US$Bn'
                }
            }
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
            autosize: false,
            width: 1500,
            height: 500,
            xaxis: {
                title: {
                    text:'Country'
                }
            },
            yaxis: {
                title: {
                    text:'Total Assets in US$Bn'
                }
            }
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
            autosize: false,
            width: 1500,
            height: 500,
            xaxis: {
                title: {
                    text:'Balance Sheet Date'
                }
            },
            yaxis: {
                title: {
                    text:'Total Assets in US$Bn'
                }
            }
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
        console.log(data)
        console.log('break')
        console.log(banks)
        console.log('break')
        console.log(countries)
        console.log('break')
        console.log(assets)
        let tbody = d3.select("tbody");
        tbody.html("");
        for (i=0; i<banks.length; i++) {
            let row = tbody.append("tr");
            let cell = row.append("td");
            cell.text(banks[i])
            let cell2 = row.append("td");
            cell2.text(countries[i])
            let cell3 = row.append("td");
            cell3.text(assets[i])

        }
    });
};


function buildbankcountrydropdown() {
    // fetch data
    let URL = '/bankcountrydropdown/';
    d3.json(URL).then(function(data) {
        let countries = data;
        let dropdown = d3.select("#countrybanklist");
        countries.forEach(country => {
            var option = dropdown.append("option");
            option.text(country);
            option.property("value", country);
    });
});
}

function buildtimecountrydropdown() {
    // fetch data
    let URL = '/timecountrydropdown/';
    d3.json(URL).then(function(data) {
        let times = data;
        let dropdown = d3.select("#timebanklist");
        times.forEach(i => {
            var option = dropdown.append("option");
            option.text(i);
            option.property("value", i);
    });
});
};

function buildtacountrysumdropdown() {
    // fetch data
    let URL = '/tacountrysumdropdown/';
    d3.json(URL).then(function(data) {
        let countries = data;
        let dropdown = d3.select("#countrysumlist");
        countries.forEach(country => {
            var option = dropdown.append("option");
            option.text(country);
            option.property("value", country);
    });
});
}

function buildtatimesumdropdown() {
    // fetch data
    let URL = '/tatimesumdropdown/';
    d3.json(URL).then(function(data) {
        let times = data;
        let dropdown = d3.select("#timesumlist");
        times.forEach(i => {
            var option = dropdown.append("option");
            option.text(i);
            option.property("value", i);
    });
});
};


function buildbankassetsdropdown() {
    // fetch data
    let URL = '/bankassetsdropdown/';
    d3.json(URL).then(function(data) {
        let banks = data;
        let dropdown = d3.select("#bankassetslist");
        banks.forEach(i => {
            var option = dropdown.append("option");
            option.text(i);
            option.property("value", i);
    });
});
};


function buildbanktabledropdown() {
    // fetch data
    let URL = '/banktabledropdown/';
    d3.json(URL).then(function(data) {
        let times = data;
        let dropdown = d3.select("#banktablelist");
        times.forEach(i => {
            var option = dropdown.append("option");
            option.text(i);
            option.property("value", i);
    });
});
};


function countrybankchange(value) {
    buildCountryBankCountLine(value);
};

function timebankchange(value) {
    buildTimeBankCountBar(value);
};

function countrysumchange(value) {
    buildCountrySumLine(value);
};

function timesumchange(value) {
    buildTimeSumBar(value);
};

function bankassetschange(value) {
    buildBankAssetsLine(value);
};

function banktablechange(value) {
    buildbankstable(value);
};

function init(){

   buildCountryBankCountLine('Germany');
   buildTimeBankCountBar('2013-03-31 00:00:00.000000');
   buildCountrySumLine('Germany');
   buildTimeSumBar('2013-03-31 00:00:00.000000')
   buildBankAssetsLine('Deutsche Bank');
   buildbankstable('2013-03-31 00:00:00.000000');
   buildbankcountrydropdown();
   buildtimecountrydropdown();
   buildtacountrysumdropdown();
   buildtatimesumdropdown();
   buildbankassetsdropdown();
   buildbanktabledropdown();

};
init();