const BASE_JS_PATH = '../../../../../../cfgov/unprocessed/apps/owning-a-home/';
const chai = require( 'chai' );
const expect = chai.expect;
const sinon = require( 'sinon' );
let sandbox;

const HTML_SNIPPET =
  `<input id="credit-score"
          type="range" min="600" max="840" step="20" value="700">
  <select id="arm-type">
      <option value="3-1">3/1</option>
      <option value="5-1">5/1</option>
      <option value="7-1">7/1</option>
      <option value="10-1">10/1</option>
  </select>
  <input id="test-price" type="text" value="$300,000">
  <input id="house-price" type="text" placeholder="200,000">`;

const domValues = require( BASE_JS_PATH + 'js/explore-rates/dom-values' );

describe( 'explore-rates/dom-values', () => {
  before( () => {
    this.jsdom = require( 'jsdom-global' )( HTML_SNIPPET );
  } );

  after( () => this.jsdom() );

  beforeEach( () => {
    sandbox = sinon.sandbox.create();
    document.body.innerHTML = HTML_SNIPPET;
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  it( 'should be able to get a value', () => {
    expect( domValues.getSelection( 'credit-score' ) ).to.equal( 700 );
    expect( domValues.getSelection( 'arm-type' ) ).to.equal( '3-1' );
    expect( domValues.getSelection( 'test-price' ) ).to.equal( 300000 );
    expect( domValues.getSelection( 'house-price' ) ).to.equal( 200000 );
  } );
} );
