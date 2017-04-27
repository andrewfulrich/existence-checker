# existence-checker
makes an express middleware function for checking the existence of the given thing in the database

## Usage
```
const existenceChecker=require('existence-checker')
const express = require('express')
const app = express()
const thingToUpdate = require('yourThingToUpdateController')
const Pool=require('pg').Pool
const config = {
/** db config stuff **/
}
var pool=new Pool(config)
app.put('/api/thingToUpdate/:id',existenceChecker('thingSchema','thingToUpdate','id',pool.query),thingToUpdate.updateThingToUpdate)
```


## existenceChecker(schemaName,tableName,primaryKey,queryExecutor)

makes a middleware function for checking the existence of the given thing in the database

### parameters
| name | description |
| --- | --- |
| schemaName | the database schema |
| tableName | the thing to check the existence of |
| primaryKey | the thing's primary key |
| queryExecutor | a function that takes a query object and returns the result of the query

### returns
a middleware function for checking the existence of the record with primaryKey in tableName