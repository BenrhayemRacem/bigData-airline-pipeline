#!/bin/bash


hadoop fs -mkdir -p input

hadoop fs -put 2018.csv input

hadoop jar flight-per-day-count-1.0-SNAPSHOT.jar flight.FlightCount input output