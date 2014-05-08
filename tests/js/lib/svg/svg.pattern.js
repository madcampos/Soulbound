// svg.pattern.js 0.1 - Copyright (c) 2013 Wout Fierens - Licensed under the MIT license
SVG.Pattern = function(type) {
  this.constructor.call(this, SVG.create('pattern'))
}

// Inherit from SVG.Container
SVG.Pattern.prototype = new SVG.Container

//
SVG.extend(SVG.Pattern, {
  // Return the fill id
  fill: function() {
    return 'url(#' + this.attr('id') + ')'
  }
  // Alias string convertion to fill
, toString: function() {
    return this.fill()
  }
  
})

//
SVG.extend(SVG.Defs, {
  // Define gradient
  pattern: function(width, height, block) {
    var element = this.put(new SVG.Pattern)
    
    /* invoke passed block */
    block(element)
    
    return element.attr({
      x:            0
    , y:            0
    , width:        width
    , height:       height
    , patternUnits: 'userSpaceOnUse'
    })
  }
  
})

//
SVG.extend(SVG.Container, {
  // Create pattern element in defs
  pattern: function(width, height, block) {
    return this.defs().pattern(width, height, block)
  }

})