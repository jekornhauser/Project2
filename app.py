import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float

from flask import Flask, jsonify, render_template

import datetime as dt
import numpy as np
import pandas as pd

engine = create_engine('sqlite:///banks.db', echo = True)
Base = automap_base()
Base.prepare(engine, reflect=True)

app = Flask(__name__)

@app.route('/')
def index():
    '''Return the homepage.'''
    return render_template('index.html')

@app.route('/bankcountrycount/<country>')
def bankcountrycount(country):
    '''Returns total number of banks over time in the selected country.'''
    x = []
    y = []
    with engine.connect() as con:
        rs = con.execute('SELECT COUNT("Bank"), "Balance Sheet Date" FROM banks WHERE "Country"=? GROUP BY "Balance Sheet Date"',country)
        for row in rs:
            y.append(row[0])
            x.append(row[1])
    return jsonify(x,y)

@app.route('/banktimecount/<timeperiod>')
def banktimecount(timeperiod):
    '''Returns number of banks in each country at selected time period.'''
    x = []
    y = []
    with engine.connect() as con:
        rs = con.execute('SELECT COUNT("Bank"), "Country" FROM banks WHERE "Balance Sheet Date"=? GROUP BY "Country"',timeperiod)
        for row in rs:
            y.append(row[0])
            x.append(row[1])
    return jsonify(x,y)

@app.route('/tacountrysum/<country>')
def tacountrysum(country):
    '''Returns sum of total assets  in billions USD over time in the selected country.'''
    x = []
    y = []
    with engine.connect() as con:
        rs = con.execute('SELECT SUM("Total Assets"), "Balance Sheet Date" FROM banks WHERE "Country"=? GROUP BY "Balance Sheet Date"',country)
        for row in rs:
            y.append(row[0])
            x.append(row[1])
    return jsonify(x,y)

@app.route('/tatimesum/<timeperiod>')
def tatimesum(timeperiod):
    '''Returns sum of total assets  in billions USD in all countries given the selected time period.'''
    x = []
    y = []
    with engine.connect() as con:
        rs = con.execute('SELECT SUM("Total Assets"), "Country" FROM banks WHERE "Balance Sheet Date"=? GROUP BY "Country"',timeperiod)
        for row in rs:
            y.append(row[0])
            x.append(row[1])
    return jsonify(x,y)

@app.route('/bankassets/<bank>')
def bankassets(bank):
    '''Returns the change in assets over time at the selected bank.'''
    x = []
    y = []
    with engine.connect() as con:
        rs = con.execute('SELECT "Total Assets", "Balance Sheet Date" FROM banks WHERE "Bank"=?',bank)
        for row in rs:
            y.append(row[0])
            x.append(row[1])
    return jsonify(x,y)

@app.route('/tables/<timeperiod>')
def tables(timeperiod):
    '''Returns the details of the ten largest banks based on total assets at the selected time period.'''
    bank_name = []
    country = []
    assets = []
    with engine.connect() as con:
        rs = con.execute('SELECT "Bank", "Country", "Total Assets" FROM banks WHERE "Balance Sheet Date"=? ORDER BY "Total Assets" DESC LIMIT 10',timeperiod)
        for row in rs:
            bank_name.append(row[0])
            country.append(row[1])
            assets.append(row[2])
    return jsonify(bank_name,country,assets)

@app.route('/bankcountrydropdown/')
def bankcountrydropdown():
    '''Returns a list of all distinct countries.'''
    countries = []
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT "Country" FROM banks')
        for row in rs:
            countries.append(row[0])
    return jsonify(countries)

@app.route('/timecountrydropdown/')
def timecountrydropdown():
    '''Returns a list of all distinct time periods.'''
    timeperiods = []
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT "Balance Sheet Date" FROM banks')
        for row in rs:
            timeperiods.append(row[0])
    return jsonify(timeperiods)

@app.route('/tacountrysumdropdown/')
def tacountrysumdropdown():
    '''Returns a list of all distinct countries.'''
    countries = []
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT "Country" FROM banks')
        for row in rs:
            countries.append(row[0])
    return jsonify(countries)

@app.route('/tatimesumdropdown/')
def tatimesumdropdown():
    '''Returns a list of all distinct time periods.'''
    timeperiods = []
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT "Balance Sheet Date" FROM banks')
        for row in rs:
            timeperiods.append(row[0])
    return jsonify(timeperiods)

@app.route('/bankassetsdropdown/')
def bankassetsdropdown():
    '''Returns a list of all distinct banks.'''
    banks = []
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT "Bank" FROM banks')
        for row in rs:
            banks.append(row[0])
    return jsonify(banks)

@app.route('/banktabledropdown/')
def banktabledropdown():
    '''Returns a list of all distinct time periods.'''
    timeperiods = []
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT "Balance Sheet Date" FROM banks')
        for row in rs:
            timeperiods.append(row[0])
    return jsonify(timeperiods)


if __name__ == '__main__':
    app.run(debug=True)
