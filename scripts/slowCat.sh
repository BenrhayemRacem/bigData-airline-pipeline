#!/bin/bash
function slowcat { while read; do sleep .05; echo "$REPLY"; done;}
cat $1 | slowcat | nc -lk 9999

#while read x; do echo "$x" | nc localhost 9999; done < $1