'use strict';

/**
 * Dependencies
 */

var uniqueRandomArray = require('unique-random-array');
var cleanCodeFacts = require('./clean-code-facts.json');


/**
 * Interesting clean code quotes to inspire developers
 */

exports.random = uniqueRandomArray(cleanCodeFacts);
exports.all = cleanCodeFacts;
