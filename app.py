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

@app.route('/bankcount/<country>')
def bankcount(country):
    '''Returns number of banks in each country at each period.'''
    x = []
    y = []
    with engine.connect() as con:
        rs = con.execute('SELECT COUNT("Bank"), "Balance Sheet Date" FROM banks WHERE "Country"=? GROUP BY "Balance Sheet Date"',country)
        for row in rs:
            y.append(row[0])
            x.append(row[1])
    return jsonify(x,y)

if __name__ == '__main__':
    app.run(debug=True)
