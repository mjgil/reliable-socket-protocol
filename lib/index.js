/**
 * Module dependencies
 */

var keys = require('./keys'),
    json = JSON || require('json');

/**
 * Current protocol version
 */
exports.protocol = 1;

/**
 * Packet types
 */
var packets = exports.packets = {
  open:    0,
  close:   1, 
  sid:     2,
  recon:   3,
  ack:     4,
  message: 5
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Encodes a packet
 *
 *      <packet type id><data>
 *
 * Example:
 *
 * 		0
 * 		1123 
 * 		2&session=123&last=40
 * 		341
 * 		4<data>
 * 		5<data>
 *
 * @return {String}
 * @api private
 */

exports.encodePacket = function (packet) {
  var encoded = packets[packet.type];

  // data key is optional
  if (undefined !== packet.data) {
    encoded += json.stringify(packet.data);
  }

  return '' + encoded;
};

/**
 * Decodes a packet
 *
 * @return {Object} with 'type' and 'data' (if any)
 * @api private
 */

exports.decodePacket = function (data) {
  var type = data.charAt(0);

  if (Number(type) != type || !packetslist[type]) {
    return err;
  }

  if (data.length > 1) {
    return { type: packetslist[type], data: json.parse(data.substring(1)) };
  } 
  else {
    return { type: packetslist[type] };
  }

};