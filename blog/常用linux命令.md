## 1. find 命令 rm 删除某目录下所有子目录中的某类文件

使用find命令，将当前目录下所有test.file文件删除
    
    find .  -name "test.file" -exec rm -rf {} \;
    
find：linux的查找命令，用户查找指定条件的文件
    
.：当前目录
    
"test.file""：目标文件
    
-exec：选项
    
rm -rf：强制删除文件，包括目录
    
{} \; ：固定写法，一对大括号+空格+\


### 附 find 命令用法

    用法: find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec] [path...] [expression]
    
    默认路径为当前目录；默认表达式为 -print
    表达式可能由下列成份组成：操作符、选项、测试表达式以及动作：
    
    操作符 (优先级递减；未做任何指定时默认使用 -and):
          ( EXPR )   ! EXPR   -not EXPR   EXPR1 -a EXPR2   EXPR1 -and EXPR2
          EXPR1 -o EXPR2   EXPR1 -or EXPR2   EXPR1 , EXPR2
    
    位置选项 (总是真): -daystart -follow -regextype
    
    普通选项 (总是真，在其它表达式前指定):
          -depth --help -maxdepth LEVELS -mindepth LEVELS -mount -noleaf
          --version -xdev -ignore_readdir_race -noignore_readdir_race
    
    比较测试 (N 可以是 +N 或 -N 或 N): -amin N -anewer FILE -atime N -cmin N
          -cnewer 文件 -ctime N -empty -false -fstype 类型 -gid N -group 名称
          -ilname 匹配模式 -iname 匹配模式 -inum N -ipath 匹配模式 -iregex 匹配模式
          -links N -lname 匹配模式 -mmin N -mtime N -name 匹配模式 -newer 文件
          -nouser -nogroup -path PATTERN -perm [+-]MODE -regex PATTERN
          -readable -writable -executable
          -wholename PATTERN -size N[bcwkMG] -true -type [bcdpflsD] -uid N
          -used N -user NAME -xtype [bcdpfls]
          -context CONTEXT
    
    
    actions: -delete -print0 -printf FORMAT -fprintf FILE FORMAT -print 
          -fprint0 FILE -fprint FILE -ls -fls FILE -prune -quit
          -exec COMMAND ; -exec COMMAND {} + -ok COMMAND ;
          -execdir COMMAND ; -execdir COMMAND {} + -okdir COMMAND ;


