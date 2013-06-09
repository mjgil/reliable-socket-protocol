
/**
 * Test dependencies
 */

var parser = require('../lib');
var expect = require('expect.js');

/**
 * Shortcuts
 */
var encode = parser.encodePacket;
var decode = parser.decodePacket;

/**
 * Tests
 */

describe('parser', function () {
  
  describe('packets', function  () {

  	describe('basic functionality', function () {
      it('should encode packets as strings', function () {
        expect(encode({ type: 'message', data: 'test' })).to.be.a('string');
      });

      it('should decode packets as objects', function () {
        expect(decode(encode({ type: 'message', data: 'test' }))).to.be.an('object');
      });
    });

    describe('encoding and decoding', function () {
      it('should allow no data', function () {
        expect(decode(encode({ type: 'message' })))
          .to.eql({ type: 'message' });
      });

      it('should encode an open packet', function () {
        expect(decode(encode({ type: 'open' })))
          .to.eql({ type: 'open' });
      });

      it('should encode a close packet', function () {
        expect(decode(encode({ type: 'close' })))
          .to.eql({ type: 'close' });
      });

      it('should encode a sid packet', function () {
        expect(decode(encode({ type: 'sid', data: '1' })))
          .to.eql({ type: 'sid', data: '1' });
      });

      it('should encode a recon packet', function () {
        expect(decode(encode({ type: 'recon', data: '1' })))
          .to.eql({ type: 'recon', data: '1' });
      });

      it('should encode a ack packet', function () {
        expect(decode(encode({ type: 'ack', data: '33' })))
          .to.eql({ type: 'ack', data: '33' });
      });

      it('should encode a message packet', function () {
        expect(decode(encode({ type: 'message', data: '33' })))
          .to.eql({ type: 'message', data: '33' });
      });      

      it('should encode a message packet coercing to string', function () {
        expect(decode(encode({ type: 'message', data: 1 })))
          .to.eql({ type: 'message', data: '1' });
      });

      it('should match the encoding format', function () {
        expect(encode({ type: 'message', data: 'test' })).to.match(/^[0-9]/);
        expect(encode({ type: 'message' })).to.match(/^[0-9]$/);
      });
    });

    describe('decoding error handing', function () {
      var err = { type: 'error', data: 'parser error' };

      it('should disallow bad format', function () {
        expect(decode(':::')).to.eql(err);
      });

      it('should disallow inexistent types', function () {
        expect(decode('94103')).to.eql(err);
      });
    });
  });

});