# 前端笔记

# 0. 基础数据结构与算法

## 简单排序算法的 js 实现

    Array.prototype.swap = function(i, j){
      var temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }

    /* 快速排序 */
    function quickSort(arr){
      if(arr.length <= 1) return arr;

      var pivotIndex = Math.floor(arr.length/2)
        , pivot = arr.splice(pivotIndex, 1)[0]
        , left = []
        , right = [];

      for(var i = 0; i < arr.length; i++){
        if(arr[i] < pivot){
          left.push(arr[i]);
        }else{
          right.push(arr[i]);
        }
      }
      return quickSort(left).concat([pivot], quickSort(right));
    }

    /* 插入排序 */
    function insertSort(arr){
      var len = arr.length
        , i = 1
        , j, key;

      for(; i < len; i++){
        j = i;
        key = arr[j];  
        while(--j > -1){ 
          if(arr[j] > key){  
            arr[j + 1] = arr[j];  
          }else{
            break;  
          }  
        }  
        arr[j + 1] = key;  
      }  
      return arr;  
    }

    /* 冒泡排序 */
    function bubbleSort(arr){
      var len = arr.length
        , i, j;

      for(i = len - 1; i >= 1; i--){  
        for(j = 0; j <= i - 1; j++){  
          if(arr[j] > arr[j + 1]){  
            d = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = d;
          }
        }
      }
      return arr;  
    }

    /* 堆排序 */
    function heapSort(arr){
      for(var i = 1; i < arr.length; ++i){
        for (var j = i, k = (j - 1) >> 1; k >= 0; j = k, k = (k - 1) >> 1){
          if(arr[k] >= arr[j]) break;
          arr.swap(j, k);
        }
      }
      for(var i = arr.length - 1; i > 0; --i){
        arr.swap(0, i);
        for(var j = 0, k = (j + 1) << 1; k <= i; j = k, k = (k + 1) << 1){
          if(k == i || arr[k] < arr[k - 1]) --k;
          if(arr[k] <= arr[j]) break;
          arr.swap(j, k);
        }
      }
      return arr;
    }

    /* 希尔排序 */
    function ShellSort(arr){ //插入排序->希儿排序
      var st = new Date();
      var increment = arr.length;
      do {
       increment = (increment/3|0) + 1;
       arr = ShellPass(arr, increment);
      }
      while (increment > 1)

      status = (new Date() - st) + ' ms';
      return arr;
    }

    function ShellPass(arr, d){ //希儿排序分段执行函数
      var temp, j;
      for(var i = d; i < arr.length; i++) {
        if((arr[i]) < (arr[i-d])) {
          temp = arr[i]; j = i - d;
          do {
            arr[j+d] = arr[j];
            j = j-d;
          }
          while (j >- 1 && (temp) < (arr[j]));
          arr[j + d] = temp;
        }
      }
      return arr;
    }



# 1. HTML/CSS

## 1.0 BFC 和 HasLayout

### BFC 的定义

是 W3C CSS2.1 规范中的一个概念，它决定了元素如何对其元素进行定位，以及与其它元素的关系和相互作用。

在创建了 Block Formating Context 的元素中，其子元素会一个接一个地放置。垂直方向上他们的起点是一个包含块的顶部，两个相邻的元素之间的垂直距离取决于 margin 特性。在 Block Formating Context 中相邻的块级元素的垂直边距会折叠（collapse）。

在 Block Formating Context 中，每一个元素左外边距与包含块的左边相接触（对于从右到左的格式化，右外边接触右边），即使存在浮动也是如此（尽管一个元素的内容区域会由于浮动而压缩），除非这个元素也创建了一个 Block Formating Context。

### BFC到底是什么？

当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。这里有点类似一个BFC就是一个独立的行政单位的意思。

### 怎样才能形成BFC

* `float`的值不为`none`
* `overflow`的值不为`visible`
* `display`的值为`table-cell`, `table-caption`, `inline-block`中的任何一个
* `position`的值不为`relative`和`static`

### BFC 的作用

1. 不和浮动元素重叠
  如果一个浮动元素后面跟着一个非浮动的元素，那么就会产生一个覆盖的现象，很多自适应的两栏布局就是这么做的。比如下图的效果，[参考例子](http://hikejun.com/blog/2011/10/26/%E8%BF%91%E6%9C%9F%E9%9D%A2%E8%AF%95%E6%84%9F%E5%8F%97/)

2. 清除元素内部浮动
  只要把父元素设为BFC就可以清理子元素的浮动了，最常见的用法就是在父元素上设置`overflow: hidden`样式，对于 IE6 加上`zoom:1`就可以了(IE Haslayout)

3. 嵌套元素 margin 边距折叠问题的解决
  按照BFC的定义，只有同属于一个BFC时，两个元素才有可能发生垂直Margin的重叠，这个包括相邻元素，嵌套元素，只要他们之间没有阻挡(例如边框，非空内容，padding等)就会发生margin重叠。
  因此要解决margin重叠问题，只要让它们不在同一个BFC就行了，但是对于两个相邻元素来说，意义不大，没有必要给它们加个外壳，但是对于嵌套元素来说就很有必要了，只要把父元素设为BFC就可以了。这样子元素的margin就不会和父元素的margin发生重叠了。

### IE HasLayout

Layout 是一个 Internet Explorer for Windows 的私有概念，它决定了一个元素如何显示以及约束其包含的内容、如何与其他元素交互和建立联系、如何响应和传递应用程序事件、用户事件等。这种渲染特性可以通过某些 CSS 属性被不可逆转地触发。而有些 HTML 元素则默认就具有 layout。

一个元素“得到 layout”，或者说一个元素“拥有 layout” 的时候，是指它的微软专有属性 hasLayout 被设为了 true 。一个“layout 元素”可以是一个默认就拥有 layout 的元素或者是一个通过设置某些 CSS 属性得到 layout 的元素。

不同于标准属性，也不像某些浏览器的私有 CSS 属性，layout 无法通过某一个 CSS 声明直接设定 。也就是说没有“layout 属性”这么一个东西，元素要么本身自动拥有 layout，要么借助一些 CSS 声明悄悄地获得 layout。

下列元素应该是默认具有 layout 的：

* `<html>`, `<body>`
* `<table>`, `<tr>`, `<th>`, `<td>`
* `<img>`
* `<hr>`
* `<input>`, `<button>`, `<select>`, `<textarea>`, `<fieldset>`, `<legend>`
* `<iframe>`, `<embed>`, `<object>`, `<applet>`
* `<marquee>`

下列 CSS 属性和取值将会让一个元素获得 layout：

* position: `absolute` 
  绝对定位元素的包含区块(containing block)就会经常在这一方面出问题。
* float: `left` | `right` 
  由于 layout 元素的特性，浮动模型会有很多怪异的表现。
* display: `inline-block` 
  当一个内联级别的元素需要 layout 的时候往往就要用到它，这也可能也是这个 CSS 属性的唯一效果–让某个元素拥有 layout。`inline-block行为`在 IE 中是可以实现的，但是非常与众不同： IE/Win: inline-block and hasLayout 。
* width: 除 `auto` 外的任意值 
  很多人遇到 layout 相关问题发生时，一般都会先尝试用这个来修复。
* height: 除 `auto` 外的任意值 
  height: 1% 就在 Holly Hack 中用到。
* zoom: 除 `normal` 外的任意值 
  IE专有属性。不过 zoom: 1 可以临时用做调试。
* writing-mode: `tb-rl` 
  MS专有属性。

IE7中引入的hasLayout成员

* overflow: `hidden` | `scroll` | `auto`
  在 IE7 中，`overflow` 也变成了一个 layout 触发器，这个属性在之前版本 IE 中没有触发 layout 的功能。
* position: `fixed`
* min-width: 任意值 
  就算设为0也可以让该元素获得 layout。
* max-width: 除 `none` 之外的任意值
* min-height: 任意值 
  即使设为0也可以让该元素的 haslayout=true
* max-height: 除 `none` 之外的任意值



## 1.1 圣杯布局

经典的三列布局，也叫做圣杯布局【Holy Grail of Layouts】，是Kevin Cornell在2006年提出的一个布局模型概念，在国内最早是由淘宝UED的工程师传播开来，在中国也有叫法是双飞翼布局，它的布局要求有几点：

1. 三列布局，中间宽度自适应，两边定宽
2. 中间栏要在浏览器中优先展示渲染
3. 允许任意列的高度最高
4. 要求只用一个额外的 div 标签
5. 要求用最少的 CSS，最少的 Hack 语句

    .wrap{padding: 0 100px 0 120px; overflow: hidden; zoom: 1;}
    .center, .left, .right{float: left; height: 200px; padding-bottom: 9999px; margin-bottom: -9999px;}
    .center{width: 100%; background: #eee;}
    .left{width: 120px; margin-left: 100%; background: #ace; position: relative; left: -120px;}
    .right{width: 100px; margin-left: -100px; background: #f50; position: relative; right: -100px;}

    <div class="header"></div>
    <div class="wrap">
      <div class="main"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="footer"></div>



# 2. HTTP

Http 定义了与服务器交互的不同方法，最基本的方法有 4 种，分别是 `GET、POST、PUT、DELETE`。URL 全称是资源描述符，我们可以这样认为：一个 URL 地址，它用于描述一个网络上的资源，而 HTTP 中的 `GET、POST、PUT、DELETE` 就对应着这个资源的 `查、该、增、删` 4个操作。



# 3. JavaScript

## 3.0 javascript 异步编程原理

Javascript 的执行环境是单线程的，所谓的单线程，就是指一次只能完成一件任务，如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。

这种模式的好处是实现起来比较简单，执行环境相对单纯。坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为一段 Js 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其它任务无法执行。

为了解决这个问题，Javascript 语言将任务的执行模式分成两种：同步（Synchronous）和异步（Asynchronous）。

* “同步模式”如上文所描述的，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；
* “异步模式”则完全不同，每一个任务有一个或多个回调函数，前一个任务结束后不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。

“异步模式”非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是 Ajax 操作。在服务器端，“异步模式”甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有 http 请求，服务器性能会急剧下降，很快就会失去响应。

### setTimeout 神器

弊端1：setTimeout 和 setInterval 运行的最短周期是 5ms 左右，[HTML规范](http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout)

    var d = new Date(), count = 0, timer;
    timer = setTimeout(function(){
      if( new Date() - d > 1000){
        clearTimeout(timer);
        console.log(count);
      }
      count++;
    }, 0);

setTimeout 是存在一定时间间隔的，不是设定 n 毫秒执行，它就是 n 毫秒执行，可能会有一点时间延迟（2ms 左右）

弊端2：while 循环阻塞 setTimeout 执行

    var d = new Date();
    setTimeout(function(){
      console.log('show me after 1s, but you konw: ' + ( new Date() -d  ));
    }, 1000);
    while(true) if( new Date() - d > 2000 ) break;

上面代码，我们期望 console 在 1s 后打出结果，可事实却是在 2000ms+ 之后运行的，这就是 Javascript 单线程给我们带来的烦恼，while 循环阻塞了 setTimeout 的执行。

弊端3：try...catch... 捕捉不到它的错误

    try{
      setTimeout(function(){
        throw new Error('我不希望这个错误出现');
      }, 1000);
    }
    catch(e){
      console.log(e.message);
    }

setTimeout 是异步编程不可缺少的角色，但它本身存在诸多问题，这就要求我们用更恰当的方式去规避。

什么样的函数是异步的？
异步的概念和非阻塞是息息相关的，我们通过 ajax 请求的时候一般是通过异步的方式：

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/', true);  // 第三个参数设置为 true， 也就是异步加载
    xhr.send();
    xhr.onreadystatechange = function(){
      console.log(xhr.status);
    }

### 常见异步模型

1. 回调函数
陷入回调地狱，解耦程度特别低。

2. 事件监听（on / off / trigger）
JS 和浏览器提供的原生方法基本都是基于事件触发机制的，耦合度很低，不过事件不能得到流程控制。

3. 发布/订阅模式（Pub / Sub）
把事件全部交给控制器管理，可以完全掌握事件被订阅的次数，以及订阅者的信息，管理起来特别方便。
这种方法的性质与“事件监听”类似，但是明显优于后者。因为我们可以通过查看“消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

4. Promise 对象
Promise 对象是 CommonJS 工作组提出的一种规范，目的是为异步编程提供统一的接口。简单说，它的思想是，每一个异步任务返回一个 Promise 对象，该对象有一个 then 方法，允许指定回调函数。


    var Promise = function(thens){
      this.thens = thens || [];
    }
    Promise.prototype = {
      resolve: function(){
        var t = this.thens.shift(), n;
        t && ( n ＝ t.apply(null, arguments), n instanceof Promise && ( n.thens = this.thens ) )
      },
      then: function(n){
        return this.thens.push(n), this;
      }
    }

## 3.1 Javascript OO 简单说明

### 简单栗子

理解三个关键字：

1. function, JS 世界里 Class 的定义用 `function`, function 里面的内容就是构造函数的内容
2. this, 代表调用这个函数的对象
3. prototype, 用它来定义成员函数，比较规范和保险

    // 定义 Circle 类，拥有成员变量 r，常量 PI 和计算面积的成员函数 area()
    function Circle(radius){
      this.r = radius;
    }

    Circle.PI = 3.1415926;
    Circle.prototype.area = function(){
      return Circle.PI * this.r * this.r;
    }

    // 使用 Circle 类
    var c = new Circle(1.0);
    console.log(c);

另外成员函数也可以写成这样：

    function compute_area(){
      return Circle.PI * this.r * this.r;
    }

    Circle.prototype.area = compute_area;

### 继承

注意两点：

1. 定义继承关系 `ChildCircle.prototype = new Circle(0);` 其中 0 是占位用的
2. 调用父类的构造函数

    // 定义 ChildCircle 子类
    function ChildCircle(radius){
      this.base = Circle;
      this.base(radius);
    }

    ChildCircle.prototype = new Circle(0);

    function Circle_max(a, b){
      return (a.r > b.r) ? a : b;
    }

    ChildCircle.max = Circle_max;

    // 使用 ChildCircle 子类
    var c = new ChildCircle(1);
    var d = new ChildCircle(2);
    var bigger = d.max(c, d);
    console.log(bigger.area());

### var 式定义

JS 还支持一种 `var Circle = { radius: 1.0, PI: 3.1415926 }` 的形式，因此如果 Circle 只有一个实例，下面的定义方式更简洁：

    var newCircle = {
      r: 1.0,
      PI: 3.14.15926,
      area: function(){
        return this.PI * this.r * this.r;
      }
    }

    console.log(newCircle.area());





# 4. 浏览器对网页的解析渲染

渲染引擎首先通过请求获得文档的内容，渲染引擎在取得内容之后的流程：

 `构建 dom 树 -> 构建 render 树 -> 布局 render 树 -> 绘制 render 树`

这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有 html 解析完成之后再去构建和布局 render 树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

chrome 浏览器下，如果我们在 render 树未完全绘制并渲染之前，向下快速拖动滚动条，会出现白屏现象。应该说这是避免不了的，我们能做的是：

* 遵循 XHTML 编码规范，错误的标签在解析的过程中，浏览器需要花更多的时间去进行容错处理，会在构建 dom 树时花掉额外的时间
* 优化 html 代码，减少代码层次
* 优化 css，减少样式计算所需要的时间，尽量不要出现太过复杂的选择符
* 尽量不要使用 document.write，html 不能被自顶向下或自底向上地解析，一种重要的原因也是因为脚本标签中含有这个所导致，它可能会添加标签
* 减少第一屏的内容，后几屏的内容用 js 异步+判断滚动条动作载入，减少构建和布局 render 树的时间
