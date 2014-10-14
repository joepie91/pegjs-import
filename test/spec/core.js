
'use strict';

var buildParser = require('../../index'),
  peg = require('pegjs');

describe('peg-import', function() {

  it('provides the basic import syntax', function() {

    var parser;

    parser = buildParser('test/fixtures/import.peg');

    expect(function() {
      parser.parse('0123456789');
    }).not.to.throw();

    expect(function() {
      parser.parse('0123456789.');
    }).not.to.throw();

    expect(function() {
      parser.parse('abcdefghijk');
    }).to.throw(parser.SyntaxError);

  });

  it('only imports initializers once', function() {

    expect(function() {
      buildParser('test/fixtures/initializer.peg');
    }).not.to.throw();

  });

  it('imports initializers in the correct order', function() {

    expect(function() {
      buildParser('test/fixtures/initializer2.peg');
    }).not.to.throw();

  });

  it('detects circular dependencies', function() {

    expect(function() {
      buildParser('test/fixtures/circle/left.peg');
    }).to.throw(peg.GrammarError);

  });

});
