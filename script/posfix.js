/* 
 * 滚动条随动提示插件
 * 调用方法：
 * 1、在 html 标签中增加 data-fix="posfix" 属性，位置可用 data-offset-top、data-offset-left 控制
 * 2、直接 js 调用 $([selector]).posfix([option])
 */
!(function($){

  "use strict"

  var Posfix = function(element, options){
    this.$element = $(element)
    this.$window = $(window).on("scroll.posfix.data-api resize.posfix.data-api", $.proxy(this.fixPosition, this))
    this.options = $.extend({}, $.fn.posfix.defaults, options)
    this.fixPosition()
  }

  Posfix.prototype.fixPosition = function(evt){
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offsetLeft = this.options.offsetLeft
      , offsetTop = this.options.offsetTop
      , pageWidth = this.options.pageWidth || $(document).width()
      , resizeLeft = ( this.$window.width() - pageWidth )/2 + offsetLeft;


    if( evt && evt.type == "scroll" ){
      // console.log(offsetLeft+"-"+offsetTop+"-"+position.left+"-"+position.top+"-"+scrollHeight+"-"+scrollTop+"-"+pageWidth+"-"+resizeLeft)
      if(scrollTop > offsetTop){
        if(window.XMLHttpRequest){
          this.$element.css({position: "fixed", top: 0, left: offsetLeft})
        }else{
          this.$element.css({position: "absolute", top: scrollTop, left: offsetLeft})
        }
      }else{
        this.$element.css({position: "absolute", top: offsetTop, left: offsetLeft})
      }
    }else{
      this.$element.css({position: "fixed", top: offsetTop, left: resizeLeft})
    }
  }

  $.fn.posfix = function(option){
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('posfix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('posfix', (data = new Posfix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.posfix.Constructor = Posfix

  $.fn.posfix.defaults = {
    offsetTop: 0,
    offsetLeft: 0,
    pageWidth: 0,
    destroy: false
  }

  $(window).on("load", function(){
    $("[data-fix='posfix']").each(function(){
      var $fix = $(this)
        , data = $fix.data()

      $fix.posfix(data)
    })
  })

})(window.jQuery)
