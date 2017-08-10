"use strict";

var jobPosts = require("../seeds/jobPosts.js");
var should = require("chai").should();

describe("jobPosts", function() {

  it("post got posted", function() {
    jobPosts(true).return;
  });

  it("should throw error if did not post", function() {
    (function() {
     jobPosts(false).return
    }).should.throw(Error);
  });

});