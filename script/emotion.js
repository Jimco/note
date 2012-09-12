/**
 * Emotion plugin
 * 2012-09-12
 */

!function($){

  "use strict";

  var xy = xy || {}

  xy.Emotion = function( element, options ){
    this.element = $(element)
    this.faceType = $.fn.emotion.faceType
    this.options = $.extend({}, $.fn.emotion.defaults, options)
  }

  xy.Emotion.prototype = {

    constructor: Emotion,

    //渲染
    render: function(){

    },

    //设置表情弹层位置
    setPosition: function(){

    },

    //获取表情文字
    getFaceText: function( type, faceId ){
      var faceType = this.faceType, faceText;
      $.each(faceType, function( i, ele ){
        type == ele.type && faceText = "[" + ele.data[faceId] + "]";
      })
      return faceText;
    },

    //表情弹层
    show: function(){

    },

    //隐藏表情层
    hide: function(){

    },

    //切换表情类型
    changeFace: function(){

    },

    //向文本框插入表情
    addText: function(){

    },

    //将表情代码替换为文字
    faceToText: function( str ){
      return str.replace(/[[^\]^]*/g, "");
    },

    //获取光标在文本框中的位置
    getSelected: function(){

    },

    //设置文本框焦点位置
    setCursor: function(){

    },

    //表情文字与表情路径的键值对
    faceMap: function(){
      var faceMap = {};
      $.each(this.faceType, function( i, face ){
        $.each( face.data, function( j, text ){
          faceMap[text] = facePath + face.imgPath + ( y + 1 ) + face.imgSuffix;
        })
      })
      return faceMap;
    },

    //表情字符替换成表情图片
    textToFace: function( element ){
      
    }

  }

  $.fn.emotion = function( option ){
    var $this = $(this)
        , data = $this.data('emotion')
        , options = typeof option == 'object' && option
      if (!data) $this.data('emotion', (data = new xy.Emotion(this, options)))
      if (typeof option == 'string') data[option]()
    }
  

  $.fn.emotion.Constructor = xy.Emotion

  $.fn.emotion.defaults = {
    facePath: "", //表情图片路径
    isSmilesShow: true, //控制是否显示表情弹层
    targetArea: "", //目标文本框 ID
    offset: {"left": 0, "top": 0}, //表情弹层相对于触发元素的位置
    showEvent: "click", 
    delay: 0,
    tpl: $.fn.emotion.tpls["default"]
  }

  $.fn.emotion.tpls = {
    "default": "<div class='xyEmotion'><ul><li><a></a></li></ul></div>"
  }

  $.fn.emotion.faceType = [{
      "type" : "default",
      "name" : "默认",
      "data" : [ "呵呵", "嘻嘻", "哈哈", "可爱", "可怜", "挖鼻屎", "吃惊", "害羞", "挤眼", "闭嘴", "鄙视", "爱你", "泪", "偷笑", "亲亲", "生病", "太开心", "懒得理你", "右哼哼", "左哼哼", "嘘", "衰", "委屈", "吐", "打哈欠", "抱抱", "怒", "疑问", "馋嘴", "拜拜", "思考", "汗", "困", "睡觉", "钱", "失望", "酷", "花心", "哼", "鼓掌", "晕", "悲伤", "抓狂", "黑线", "阴险", "怒骂", "OK", "耶", "good", "不要", "赞", "来", "弱", "伤心", "心", "给力", "威武", "囧", "礼物", "蛋糕" ],
      "imgSuffix" : ".gif",
      "imgPath" : "default/"
    }]

  //emotion data-api
  $(function(){
    $("body").on("click.emotion.data-api", "[data-xy='emotion']", function( e ){
      var $this = $(this)

    })
  })


}(window.jQuery)
