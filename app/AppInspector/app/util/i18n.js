/**
 * Utility class for i18n.
 */
Ext.define('AI.util.i18n', {
    singleton: true,

    /**
     * The list of property to convert value.
     * @type {Array}
     */
    TARGET_PROPERTIES: [
        'text',
        'title',
        'name'
    ],

    /**
     * Overrides internal mechanism of class system.
     */
    constructor: function() {
        var me = this;

        Ext.define('AI.override.AbstractComponent', {
            override: 'Ext.AbstractComponent',
            constructor: function(config) {
                me.convert(config);
                this.callParent(arguments);
            }
        });
    },

    /**
     * Return localized message which is converted by chrome i18n.
     * @param  {String} value
     * @return {String}
     */
    getMessage: function(value) {
        var messageKey = this.convertMessageKey(value);
        return chrome.i18n.getMessage(messageKey) || value || '';
    },

    /**
     * Convert value to use the chrome i18n message key.
     * If it contains spaces, be replaced '_' string.
     * @private
     * @param  {String} value
     * @return {String}
     */
    convertMessageKey: function(value) {
        return value.replace(/\s/g, '_');
    },

    /**
     * Update value by i18n message.
     * The Target is 'text', 'title' and 'name' property.
     * @private
     * @param  {Object} config
     */
    convert: function(config) {
        var me    = this,
            keys  = Object.keys(config),
            key   = '',
            value = '';

        for (var i = keys.length - 1; i >= 0; i--) {
            key   = keys[i];
            value = config[key];

            if (!me.isTargetProperty(key)) {
                continue;
            }

            if (Ext.isString(value)) {
                config[key] = me.getMessage(value);
            }
        }
    },

    /**
     * @private
     * @param  {String}  key
     * @return {Boolean}
     */
    isTargetProperty: function(key) {
        return Ext.Array.contains(AI.util.i18n.TARGET_PROPERTIES, key);
    }

});
