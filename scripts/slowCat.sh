#!/bin/bash
function slowcat { while read; do sleep .05; echo "$REPLY"; done;}
cat ./scripts/test.csv | slowcat | nc localhost 9999

#while read x; do echo "$x" | nc localhost 9999; done < ./scripts/test.csv 