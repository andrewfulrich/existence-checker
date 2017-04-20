/**
  Existence Checker

  makes a middleware function for checking the existence of the given thing in the database

  Author: Andrew Ulrich

   MIT License

   Copyright (c) 2017 Andrew F. Ulrich

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
 */

/**
 * makes a middleware function for checking the existence of the given thing in the database
 * @param schemaName the database schema
 * @param tableName the thing to check the existence of
 * @param primaryKey the thing's primary key
 * @param queryExecutor a function that takes a query object and returns the result of the query
 * @returns {function(*, *, *)} a middleware function for checking the existence of the record with primaryKey in tableName
 */
function makeExistenceChecker(schemaName,tableName,primaryKey,queryExecutor) {
  return (req,res,next)=>{
    let pkVal=req.params[primaryKey]
    let pk=primaryKey.toLowerCase()
    let tbl=tableName.toLowerCase()
    let schema=schemaName.toLowerCase()
    let queryObj={
      text:`SELECT count(${pk}) FROM ${schema}.${tbl} WHERE ${pk}=$1`,
      values:[pkVal]
    }
    queryExecutor(queryObj).then(result=>{
      if(result.rows[0].count > 0) {
        next()
      } else {
        res.status(404).send('No '+tableName+' was found with '+primaryKey+' equal to '+pkVal)
      }
    })
  }
}
module.exports=makeExistenceChecker