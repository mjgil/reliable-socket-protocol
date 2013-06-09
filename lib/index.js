/**
 * Module dependencies
 */

var keys = require('./keys');

/**
 * Current protocol version
 */
exports.protocol = 1;

/**
 * Packet types
 */
var packets = exports.packets = {
  open: 	0,
  close:    1, 
  sid: 		2,
  recon: 	3,
  ack: 		4,
  missed: 	5,
  message: 	6,
};

var packetslist = keys(packets);

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
  	encoded += String(packet.data);
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
  	return null;
  }

  if (data.length > 1) {
    return { type: packetslist[type], data: data.substring(1) };
  } 
  else {
    return { type: packetslist[type] };
  }

};