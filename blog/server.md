# 1. WampServer 更改默认 web 目录

要更改 wamp 默认 web 目录 D:/wamp/www 为 D:/workspace/cloudTV/trunk/src

1. 打开 D:/wamp/scripts/config.inc.php, 找到 `$wwwDir = $c_installDir.’/www’;` (`$c_installDir` 是个变量，指向 WampServer 安装根目录)，修改为 `$wwwDir = D:/workspace/cloudTV/trunk/src`.

2. 更改 apache 默认根目录，打开 D:/wamp/bin/apache/Apache2.2.11/conf/httpd.conf, 查找 D:/wamp/www 修改为 D:/workspace/cloudTV/trunk/src。

3. 重启服务器。
