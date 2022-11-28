#!/bin/sh
go install "honnef.co/go/tools/cmd/staticcheck@$1"
$(go env GOPATH)/bin/staticcheck $2