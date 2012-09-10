/* 
 * 滚动条随动提示插件
 * 调用方法：
 * 1、在 html 标签中增加 data-fix="posfix" 属性，位置可用 data-offset-top、data-offset-right 控制
 * 2、直接 js 调用 $([selector]).posFix([option])
 */
!(function($){

  $.fn.posFix = function(options) {

    var defaultSettings = {
      offset: {top: 0, right: 0},
      headerWidth: 0,
      destroy: false
    },

    options = $.extend( true, {}, defaultSettings, options ),

    FixedFun = function(element) {
      var $target = $(element),
        right = options.offset.right,
        top = options.offset.top;
      
      $target.css({
        "position":"absolute",
        "right": right,
        "top": top
      });
      
      $(window).resize(function(){
        right = ( $(window).width() - options.headerWidth )/2 + options.right;
        $target.css({
          "right" : right
        });
      });

      $(window).on("scroll.posfix.data-api", function() {
        var scrolls = $(this).scrollTop();
        if (scrolls > options.offset.top) {
          if ( window.XMLHttpRequest ){
            //消息随动
            $target.css({
              position: "fixed",
              top: 0,
              right: right
            });
          } else {
            //IE6 兼容
            $target.css({
              position: "absolute",
              top: scrolls,
              right: right
            });
          }
        }else {
          $target.css({
            position: "absolute",
            top: top,
            right: right
          });
        }
      });

    };

    return $(this).each(function() {
      FixedFun( $(this) )
    })

  };

  $(window).on('load', function () {
    $('[data-fix="posfix"]').each(function () {
      var $fix = $(this)
        , data = $fix.data();

      data.offset = data.offset || {};

      data.offsetLeft && (data.offset.left = data.offsetLeft);
      data.offsetTop && (data.offset.top = data.offsetTop);
      
      $fix.posFix( data );
    })
  })

})(window.jQuery)
