/*
 * jquery插件基础模板。缺陷
 * 1、难以实现类与类之间的继承
 * 2、无法开放API供外部调用
 * 3、无法提供自定义事件支持
 * 4、无法模拟出接口
 * 5、缺少debug能力
*/

(function($){
  $.fn.插件名= function(settings){
    //默认参数
    var defaultSettings = {
 
    }
       
    /* 合并默认参数和用户自定义参数 */
    settings = $.extend(defaultSettings,settings);

    return this.each(function(){
      //代码
    });
       
  }

})(jQuery);
