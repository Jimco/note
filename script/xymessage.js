/**
 * iframe 跨域通信兼容性解决方案
 */
window.Message = (function(){
  var prefix = '[PROJECT_NAME]'
    , supportPostMessage = 'postMessage' in window;

  function Target(target, name){
    var errMsg = '';

    if(arguments.length < 2){
      errMsg = 'target error - target and name are both required';
    }
    else if(typeof target != 'object'){
      errMsg = 'target error - target itself must be window object';
    }
    else if(typeof name != 'string'){
      errMsg = 'target error - target name must be string type';
    }

    if(errMsg) throw new Error(errMsg);

    this.target = target;
    this.name = name;
  }

  if(supportPostMessage){ // IE8+ 及现代浏览器
    Target.prototype.send = function(msg){
      this.target.postMessage(prefix + msg, '*');
    }
  }
  else{ // 兼容 IE6/7
    Target.prototype.send = function(msg){
      var targetFunc = window.navigator[prefix + this.name];

      if(typeof targetFunc == 'function'){
        targetFunc(prefix + msg, window);
      }
      else{
        throw new Error('target callback function is not defined');
      }
    }
  }


  function Messager(name){
    this.targets = {};
    this.name = name;
    this.listenFunc = [];
    this.initListen();
  }

  Messager.prototype.addTarget = function(target, name){

  }

  Messager.prototype

})();