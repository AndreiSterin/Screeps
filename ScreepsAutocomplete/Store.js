/**
 *
 * @class
 *
 */
Store = function() { };

Store.prototype =
{
	/**
	 * @param {string} [resource]
	 * @return {number}
	 */
	getCapacity: function(resource) { },

	/**
	 * @param {string} [resource]
	 * @return {number}
	 */
	getFreeCapacity: function(resource) { },

	/**
	 * @param {string} [resource]
	 * @return {number}
	 */
	getUsedCapacity: function(resource) { }
};
