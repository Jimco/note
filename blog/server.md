# 1. WampServer 更改默认 web 目录

要更改 wamp 默认 web 目录 D:/wamp/www 为 D:/workspace/cloudTV/trunk/src

1. 打开 D:/wamp/scripts/config.inc.php, 找到 `$wwwDir = $c_installDir.’/www’;` (`$c_installDir` 是个变量，指向 WampServer 安装根目录)，修改为 `$wwwDir = D:/workspace/cloudTV/trunk/src`.

2. 更改 apache 默认根目录，打开 D:/wamp/bin/apache/Apache2.2.11/conf/httpd.conf, 查找 D:/wamp/www 修改为 D:/workspace/cloudTV/trunk/src。

3. 重启服务器。


# 2. 默认端口

    http 默认端口：80
    https 默认端口：443
    FTP 默认端口：21
    SSH 默认端口：22
    TELNET 默认端口：23
    SMTP 默认端口：25
    POP 默认端口：110
    DNS 默认端口：53
    Mysql 默认端口：3306
    Sql 默认端口：3389
    Tomcat 默认端口：8080

# 3. XAMPP 本地多域名虚拟主机配置

首先配置网站根目录 
    
    DocumentRoot "D:/workspace/www"
    <Directory "D:/workspace/www">
      ...
    </Directory>

注意：若根目录未配置，会有访问权限问题。

虚拟主机配置，在 httpd.conf 配置文件底部添加：

    <virtualhost *:80>
        ServerName www.xxx.cn
        DocumentRoot D:\workspace\www\phpcms
    </virtualhost>

    <virtualhost *:80>
        ServerName xx.baidu.com
        DocumentRoot D:\workspace\www\dedecms
    </virtualhost>

最后，修改 hosts 文件：

    127.0.0.1  www.xxx.cn
    127.0.0.1  xx.baidu.com


