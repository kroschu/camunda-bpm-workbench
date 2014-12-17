'use strict';

var handlers = [];
handlers.push(require('./handlers/flowNode'));
handlers.push(require('./handlers/scriptTask'));


var PropertyPanel = (function() {

  function PropertyPanel(workbench, renderer) {
    this.selectedElement = null;
    this.workbench = workbench;
    this.renderer = renderer;
  }

  PropertyPanel.prototype.selectElement = function(element) {
    this.clear();

    if(!!element) {
      this.selectedElement = element;
      this.init();
    }
  };

  PropertyPanel.prototype.init = function() {

    var handlerCtx = {
      selectedElement: this.selectedElement,
      providers: [],
      provide: function(provider) {
        this.providers.push(provider);
      }
    };

    handlers.forEach(function(handler) {
      handler.init(handlerCtx);
    });

    this.renderer.render(handlerCtx);

  };

  PropertyPanel.prototype.clear = function() {
    this.renderer.clear();
  };

  return PropertyPanel;

})();


module.exports = PropertyPanel;
