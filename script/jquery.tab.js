/**
 * jQuery Tab plugin
 * Author: jimco@color7.net
 */
!function($){

  "use strict";

  var xy = xy || {};

  xy.Tab = function( element, options ){
    this.options = $.extend({}, $.fn.tab.defaults, options)
    this.$element = $(element)

  }

  xy.Tab.prototype = {

    constructor: Tab,

    show: function(){

    },

    delay: function(){
      var time = this.options.timeout
      time ? setTimeout( function(){ tabHandle(elem) }, time) : tabHandle(elem)
    },

    start: function(){
      var auto = this.options.auto
      if( !auto ) return
      timer = setInterval( autoRun, auto )
    },

    autoRun: function(){

    }

  }

  $.fn.tab = function(option){
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tab', (data = new xy.Tab(this, options)))
      if (typeof option == 'string') data[option]()
    })

  }

  $.fn.tab.Constructor = xy.Tab

  $.fn.tab.defaults = {
    event: "mouseover",
    timeout: 0,
    auto: 0,
    callback: null
  }

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}(window.jQuery)
