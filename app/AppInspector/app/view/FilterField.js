/*
 * File: app/view/FilterField.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('AI.view.FilterField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.filterfield',

    forceEnter: true,
    maxWidth: 200,
    minWidth: 100,
    fieldLabel: 'Filter',
    hideLabel: true,
    name: 'filter',
    tabIndex: 1,
    emptyText: 'Filter',
    enableKeyEvents: true,
    selectOnFocus: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                change: {
                    fn: me.onTextfieldChange,
                    scope: me
                },
                keypress: {
                    fn: me.onTextfieldKeypress,
                    scope: me
                },
                beforerender: {
                    fn: me.onTextfieldBeforeRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        if (this.forceEnter === true) {
            return;
        }

        this.fireEvent('applyfilter', field, newValue);
    },

    onTextfieldKeypress: function(textfield, e, eOpts) {
        if (this.forceEnter === true && e.getKey() === Ext.EventObject.ENTER) {
            this.fireEvent('applyfilter', textfield, textfield.getValue());
        }
    },

    onTextfieldBeforeRender: function(component, eOpts) {
        this.emptyText = AI.util.i18n.getMessage(this.emptyText);

    }

});