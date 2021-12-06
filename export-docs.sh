#!/usr/bin/env bash

if [ "$1" == "-h" ]; then
  echo "Usage: yarn export-docs [rest-api-name] [stage-name]"
  exit 0
fi

echo "Export API: $1"
echo "Stage: $2"

ID=$(aws apigateway get-rest-apis --query 'items[?name==`'$1'`].[id]' --output text)

if [ -z "$ID" ]; then
  echo "Could not find an API with name: $1"
  echo "Aborting"
  exit 0
fi

aws apigateway get-export --parameters extensions='apigateway' --rest-api-id $ID --stage-name $2 --export-type swagger docs/swagger.json
