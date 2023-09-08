#!/usr/bin/env bash
ng test --code-coverage --watch=false
sonar-scanner
