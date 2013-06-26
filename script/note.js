window.console || (console = { log: function(){}, dir: function(){}, error: function(){} });

/**
 * 观察者模式
 * eg: 猫叫、老鼠跑、主人醒
 */
(function(window, undefined){

  var air = function(){

    var events = {
      SubjectEvent: [] //订阅者的注册事件，当有情况时触发这些事件
    }

    this.addSubjectEvent = function(e){
      events.SubjectEvent.push(e);
      console.log('观察者接收了一个注册事件，待处理事件数：' + events.SubjectEvent.length);
    }

    this.sendSound = function(info){
      console.log('观察者开始传递声音，待处理事件数：' + events.SubjectEvent.length);
      Notify(info);
    }

    var Notify = function(info){
      for(var i = 0; i < events.SubjectEvent.length; i++){
        var sound = '';
        if(typeof info.Sound != 'undefined'){
          sound = info.Sound;
        }
        console.log('观察者发出了一个通知：——' + sound);
        events.SubjectEvent[i](info);
      }
    }
  }

  var cat = function(name){
    var name = name;
    this.sendSound;
    this.cry = function(){
      console.log(name + '开始喵喵叫~');
      if(this.sendSound != 'undefined'){
        console.log('声音传递出去了~');
        this.sendSound({Sound: '喵喵叫~', Volume: 3});
      }
    }

    console.log('我是' + name + '，有人摸俺俺就叫~');
  }

  var mouse = function(name){
    var _self = this 
      , name = name;

    this.sendSound;
    this.run = function(info){
      console.log(name + '听到了声音。');
      if(typeof info.Sound != 'undefined'){
        if(info.Sound == '自己跑'){
          console.log('听到自己跑的声音')
        }else{
          console.log(name + '开始狂飙！');
          if(typeof _self.sendSound != 'undefined'){
            console.log(name + '狂飙发出了声音。');
            _self.sendSound({Sound: '自己跑', Volume: 7});
          }
        }
      }
    }
    console.log('我是' + name + '，出来找吃的~');
  }

  var person = function(name){
    var name = name
      , isWake = false;

    this.sendSound;

    this.hearSound = function(info){
      if(isWake){
        console.log(name + '已经醒了');
      }else{
        if(typeof info.Volume != 'undefined'){
          if(info.Volume <= 5){
            console.log('声音小，' + name + '继续睡觉~');
          }else{
            console.log('声音大，' + name + '被吵醒！');
            isWake = true;
          }
        }
      }
    }
    console.log('我是' + name + '，俺睡着了~');
  }

  var myAir = new air();
  var tom = new cat('小喵汤姆');
  var jerry = new mouse('小老鼠杰瑞');
  var longtao = new mouse('可怜的龙套');
  var master = new person('小主');

  window.onload = function(){
    tom.sendSound = myAir.sendSound;
    jerry.sendSound = myAir.sendSound;
    longtao.sendSound = myAir.sendSound;

    myAir.addSubjectEvent(jerry.run);
    myAir.addSubjectEvent(master.hearSound);
  }

  window.tom = tom;

})(window);

/**
 * 职责链模式
 */
Function.prototype.before = function(func){
  var __self = this;
  return function(){
    if(fun.apply(this, arguments) === false){
      return false;
    }
    return __self.apply(this, arguments);
  }
}

Function.prototype.after = function(func){
  var  __self = this;
  return function(){
    var ret = __self.apply(this, arguments);
    
    if(ret) return ret;
    return func.apply(this, arguments);
  }
}
