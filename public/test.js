/**
* @desc task 8, Geosoftware1, SoSe2019
* @author name: Katharina Poppinga, matr.: 450 146
*/

"use strict";  // JavaScript code is executed in "strict mode"

// jshint esversion: 6
// jshint maxerr: 1000


// ********** qUnit client-Tests **********


QUnit.config.reorder = false;

var itemId;


QUnit.module( "AJAX-CRUD Test" );


// ************************* AJAX POST Test *************************

QUnit.test( "AJAX post ", function( assert ) {

  // note the function call done(); below after all async work completed
  var done = assert.async();

  var createDone = false;

  $.ajax({
    url: "/item?name=foo&description=bar", // URL der Abfrage,
    data: { foo: "bar" },
    type: "POST"
  })
  .done (function( response) {
    //    console.log("PostResponse");
    //    console.log(response);
    createDone = true;
    itemId = response._id;
    assert.ok( undefined !== itemId, "create id: " + itemId);
  })
  .fail (function( xhr, status, errorThrown ) {
    assert.ok(false, "create route failed, error: " + errorThrown);
  })
  .always (function( xhr, status ) {
    assert.ok(createDone, "ajax done with response...");
    done();
  });
});


// ************************* AJAX GET Test *************************

QUnit.test( "AJAX get", function( assert ) {

  // note the function call done(); below after all async work completed
  var done = assert.async();

  var readDone = false;

  $.ajax({
    url: "/item", // URL der Abfrage,
    data: { _id: itemId },  // "Data to be sent to the server. It's appended to the url for GET-request" (https://api.jquery.com/jquery.ajax/)
    type: "GET"
  })
  .done (function( response) {
    readDone = true;
    assert.ok( undefined !== response._id && response._id === itemId, "id found");
  })
  .fail (function( xhr, status, errorThrown ) {
    assert.ok(false, "read route failed, error: " + errorThrown);
  })
  .always (function( xhr, status ) {
    assert.ok(readDone, "ajax done with response...");
    done();
  });
});


// ************************* AJAX PUT Test *************************

QUnit.test( "AJAX put", function( assert ) {

  // note the function call done(); below after all async work completed
  var done = assert.async();

  var updateDone = false;

  $.ajax({
    url: "/item?_id=" + itemId + "&name=foo&description=bar", // URL der Abfrage,
    data: { _id: itemId},
    type: "PUT"
  })
  .done (function( response) {
    //    console.log("PutResponse");
    //    console.log(response);

    updateDone = true;
    assert.ok( undefined !== response._id && response._id === itemId, "id found");
  })
  .fail (function( xhr, status, errorThrown ) {
    assert.ok(false, "cupdate route failed, error: " + errorThrown);
  })
  .always (function( xhr, status ) {
    assert.ok(updateDone, "ajax done with response...");
    done();
  });
});




// ************************* AJAX DELETE Test *************************

QUnit.test( "AJAX delete", function( assert ) {
  // note the function call done(); below after all async work completed
  var done = assert.async();

  var updateDone = false;

  $.ajax({
    url: "/item?_id=" + itemId, // URL der Abfrage,
    type: "DELETE"
  })
  .done (function( response) {
    updateDone = true;
    assert.ok( undefined !== response._id && response._id === itemId, "id found");
  })
  .fail (function( xhr, status, errorThrown ) {
    assert.ok(false, "delete route failed, error: " + errorThrown);
  })
  .always (function( xhr, status ) {
    assert.ok(updateDone, "ajax done with response...");
    done();
  });
});
