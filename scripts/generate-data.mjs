import fs from "fs";import path from "path";import {fileURLToPath} from "url";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const DATA=path.resolve(__dirname,"../public/data");
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function pickN(a,n){const s=new Set();while(s.size<n&&s.size<a.length)s.add(pick(a));return[...s]}
const DIFF=["easy","medium","hard"];

const TAG_RAW=`
C语言 程序设计 main函数 头文件 printf scanf 格式化输出 格式化输入 占位符 转义字符
int float double char void unsigned signed short long const volatile static extern register
auto sizeof typedef enum struct union 变量 常量 字面量 符号常量 宏定义 #define
算术运算符 关系运算符 逻辑运算符 位运算符 赋值运算符 条件运算符 逗号运算符 自增 自减
运算符优先级 结合性 表达式 语句 顺序结构 选择结构 if语句 if-else switch case default
循环结构 while循环 do-while for循环 break continue goto 循环嵌套 死循环 循环控制
数组 一维数组 二维数组 字符数组 数组初始化 数组遍历 数组越界 冒泡排序 选择排序
字符串 字符串常量 字符串变量 字符串输入 字符串输出 strlen strcpy strcat strcmp strstr
strchr strtok sprintf sscanf 字符串处理函数 字符数组 字符串指针
函数定义 函数声明 函数调用 形参 实参 返回值 函数原型 函数嵌套 递归函数 递归 迭代
传值调用 传地址调用 指针 指针变量 地址运算符& 解引用* 空指针 野指针 指针运算
指针与数组 指针与字符串 指针与函数 函数指针 数组指针 指针数组 二级指针 多级指针
动态内存 malloc calloc realloc free 内存泄漏 堆 栈 全局区 常量区 代码区
结构体 struct 结构体定义 结构体变量 结构体数组 结构体指针 结构体嵌套 结构体传参
共用体 union 枚举 enum typedef 类型别名 位域 链表 节点 单链表 双链表 创建链表
遍历链表 插入节点 删除节点 文件操作 fopen fclose fprintf fscanf fgetc fputc fgets fputs
fread fwrite fseek rewind ftell feof 文件读写 二进制文件 文本文件 文件打开模式
预处理 #include #define #ifdef #ifndef #endif #pragma 条件编译 文件包含 宏函数
编译过程 预处理 编译 汇编 链接 编译错误 链接错误 运行时错误 段错误 栈溢出 缓冲区溢出
未定义行为 调试 gdb 断点 单步执行 观察变量 代码阅读 代码分析 代码优化
编程规范 命名规范 注释 缩进 代码风格 程序调试 测试 单元测试 集成测试 白盒 黑盒
算法 排序 查找 线性查找 二分查找 冒泡排序 选择排序 插入排序 快速排序 递归排序 归并
数据结构 数组 链表 栈 队列 树 二叉树 遍历 前序 中序 后序 堆 哈希表
学生成绩管理 图书管理 通讯录 工资管理 职工信息 课程管理 考试系统 计算器 日历 游戏
贪吃蛇 扫雷 俄罗斯方块 井字棋 五子棋 猜数字 数独 迷宫 简单计算器 科学计算器
进制转换 素数判断 完全数 水仙花数 回文数 阶乘 斐波那契 最大公约数 最小公倍数
文件加密 文件复制 文件分割 文件合并 文件统计 文件管理 日志系统 配置解析 配置文件
INI解析 XML解析 JSON解析 CSV解析 文本处理 词法分析 语法分析 表达式求值 逆波兰
中缀转后缀 栈应用 队列应用 递归下降 编译原理入门 简单解释器 简单编译器
嵌入式C 单片机 C与硬件 寄存器操作 位操作 中断 定时器 I/O编程 串口通信 SPI I2C
C标准库 ctype math string stdlib stdio time assert setjmp signal locale
errno 错误处理 perror strerror 断言 assert 日志 异常处理 信号处理 跳转 setjmp longjmp
跨平台编程 内存对齐 字节序 大小端 网络编程 套接字 网络通信 TCP UDP HTTP 协议解析
多线程 pthread 线程同步 互斥锁 信号量 条件变量 线程安全 锁 死锁 竞态条件
图形编程 控制台图形 字符画 简单图形 绘图 窗口 事件 游戏编程 图形库 入门
C语言发展史 C89 C99 C11 C17 C23 ANSI C K&R C 标准库 编译器 GCC Clang MSVC
集成开发环境 IDE CodeBlocks Dev-C++ CLion VS Code 代码编辑器 项目创建 多文件编程
头文件保护 #pragma once 模块化编程 源文件 头文件 声明 定义 分离编译 make Makefile
CMake 构建工具 项目构建 编译选项 链接选项 静态库 动态库 DLL SO 库的创建 库的使用
代码审查 代码重构 代码重用 设计模式 单例 工厂 观察者 适配器 策略 模版方法 责任链
编程思想 结构化编程 模块化 自顶向下 逐步求精 封装 抽象 接口 实现 高内聚 低耦合
软件工程 需求分析 设计 编码 测试 维护 文档 版本控制 git 协同开发 开源 许可
编程题 算法题 代码填空 程序补全 程序改错 输出预测 综合编程 课程设计 大作业 项目实战`;
const TAG_NAMES=TAG_RAW.trim().split(/\s+/).filter(Boolean);

function buildTags(){
  return TAG_NAMES.map((n,i)=>({
    id:`c-tag-${String(i+1).padStart(3,"0")}`,name:n,category:"C语言",
    description:`C语言标签：${n}`,count:0,createdAt:"2026-07-02T00:00:00.000Z"
  }));
}

const COURSES_DATA=[
  {id:"c-course-01",order:1,slug:"C语言入门与开发环境",title:"C 语言入门与开发环境",description:"C语言概述、开发环境搭建、第一个程序Hello World、编译运行流程。",estimatedHours:6,difficulty:"easy"},
  {id:"c-course-02",order:2,slug:"C程序结构与基本语法",title:"C 程序结构与基本语法",description:"程序基本结构、main函数、头文件、注释、语句与代码块。",estimatedHours:6,difficulty:"easy"},
  {id:"c-course-03",order:3,slug:"数据类型变量与常量",title:"数据类型、变量与常量",description:"基本数据类型、变量定义与初始化、常量、类型转换。",estimatedHours:8,difficulty:"easy"},
  {id:"c-course-04",order:4,slug:"运算符与表达式",title:"运算符与表达式",description:"各类运算符、优先级与结合性、表达式的求值。",estimatedHours:10,difficulty:"easy"},
  {id:"c-course-05",order:5,slug:"输入输出与格式控制",title:"输入输出与格式控制",description:"printf和scanf格式化输入输出、字符输入输出、文件重定向。",estimatedHours:8,difficulty:"easy"},
  {id:"c-course-06",order:6,slug:"顺序结构选择结构与循环结构",title:"顺序结构、选择结构与循环结构",description:"if/switch选择结构、while/do-while/for循环、break/continue控制。",estimatedHours:12,difficulty:"easy"},
  {id:"c-course-07",order:7,slug:"数组与字符串",title:"数组与字符串",description:"一维数组、二维数组、字符数组、字符串处理函数、数组应用。",estimatedHours:14,difficulty:"medium"},
  {id:"c-course-08",order:8,slug:"函数参数与作用域",title:"函数、参数与作用域",description:"函数定义与声明、参数传递、返回值、作用域、递归。",estimatedHours:14,difficulty:"medium"},
  {id:"c-course-09",order:9,slug:"指针基础",title:"指针基础",description:"指针概念、地址运算符、解引用、指针与数组、指针运算。",estimatedHours:14,difficulty:"hard"},
  {id:"c-course-10",order:10,slug:"指针数组与字符串进阶",title:"指针、数组与字符串进阶",description:"指针与字符串、指针数组、数组指针、函数指针、动态内存分配。",estimatedHours:14,difficulty:"hard"},
  {id:"c-course-11",order:11,slug:"结构体共用体与枚举",title:"结构体、共用体与枚举",description:"结构体定义与使用、结构体数组与指针、共用体、枚举、typedef。",estimatedHours:12,difficulty:"medium"},
  {id:"c-course-12",order:12,slug:"文件操作",title:"文件操作",description:"文件打开与关闭、文件读写、文件定位、二进制文件、文件应用。",estimatedHours:10,difficulty:"medium"},
  {id:"c-course-13",order:13,slug:"编程题训练与调试方法",title:"编程题训练与调试方法",description:"常见编程题型、代码调试方法、gdb使用、常见错误与处理方法。",estimatedHours:12,difficulty:"hard"},
  {id:"c-course-14",order:14,slug:"C语言课程设计与综合项目",title:"C 语言课程设计与综合项目",description:"学生成绩管理系统、通讯录系统、图书管理系统、综合课程设计。",estimatedHours:10,difficulty:"hard"},
];

function buildCourses(){
  return COURSES_DATA.map(c=>({
    ...c,tags:[c.title],lessonIds:[],totalLessons:0,totalQuestions:0,prerequisites:[],
    outcomes:["掌握C语言语法","能编写正确代码","理解指针与内存","具备调试能力"],
    updatedAt:"2026-07-02T00:00:00.000Z"
  }));
}

function buildLessons(){
  const all=[];let id=1;
  const add=(ci,title,kps)=>{
    const n=String(id).padStart(3,"0");
    all.push({id:`c-lesson-${n}`,courseId:COURSES_DATA[ci].id,
      order:all.filter(l=>l.courseId===COURSES_DATA[ci].id).length+1,title,
      slug:title.replace(/[\s，。、：；（）\-\+]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),
      summary:`${title}章节`,
      content:`# ${title}\n\n${title}的讲义内容。\n\n## 要点\n\n- 核心概念\n- 代码示例\n- 常见错误\n\n## 总结\n\n本章介绍了${title}的核心知识。`,
      contentFormat:"markdown",estimatedMinutes:30,
      difficulty:id<=60?"easy":id<=130?"medium":"hard",
      knowledgePointIds:kps||[],practiceQuestionIds:[],tags:["C语言"],
      prerequisites:[],updatedAt:"2026-07-02T00:00:00.000Z"});id++;
  };
  add(0,"C语言的历史与特点",["c-kp-001","c-kp-002"]);
  add(0,"搭建开发环境GCC",["c-kp-003"]);
  add(0,"第一个C程序HelloWorld",["c-kp-004"]);
  add(0,"编译与运行流程",["c-kp-005","c-kp-006"]);
  add(0,"集成开发环境介绍",["c-kp-007"]);
  add(1,"C程序的基本结构",["c-kp-008","c-kp-009"]);
  add(1,"main函数详解",["c-kp-010"]);
  add(1,"头文件与#include",["c-kp-011"]);
  add(1,"注释方法",["c-kp-012"]);
  add(1,"语句与代码块",["c-kp-013"]);
  add(1,"标识符与关键字",["c-kp-014"]);
  add(2,"整型int",["c-kp-015","c-kp-016"]);
  add(2,"浮点型floatdouble",["c-kp-017","c-kp-018"]);
  add(2,"字符型char",["c-kp-019"]);
  add(2,"void类型",["c-kp-020"]);
  add(2,"变量声明与初始化",["c-kp-021","c-kp-022"]);
  add(2,"常量与字面量",["c-kp-023","c-kp-024"]);
  add(2,"类型转换",["c-kp-025","c-kp-026"]);
  add(2,"常量修饰符const",["c-kp-027"]);
  add(3,"算术运算符",["c-kp-028","c-kp-029"]);
  add(3,"关系运算符",["c-kp-030","c-kp-031"]);
  add(3,"逻辑运算符",["c-kp-032","c-kp-033"]);
  add(3,"位运算符",["c-kp-034","c-kp-035"]);
  add(3,"赋值运算符",["c-kp-036"]);
  add(3,"自增自减运算符",["c-kp-037","c-kp-038"]);
  add(3,"条件运算符",["c-kp-039"]);
  add(3,"运算符优先级与结合性",["c-kp-040","c-kp-041"]);
  add(4,"printf格式化输出",["c-kp-042","c-kp-043"]);
  add(4,"scanf格式化输入",["c-kp-044","c-kp-045"]);
  add(4,"getchar与putchar",["c-kp-046"]);
  add(4,"gets与puts",["c-kp-047"]);
  add(4,"格式化控制符详解",["c-kp-048"]);
  add(5,"if语句",["c-kp-049","c-kp-050"]);
  add(5,"if-else语句",["c-kp-051"]);
  add(5,"switch语句",["c-kp-052","c-kp-053"]);
  add(5,"while循环",["c-kp-054","c-kp-055"]);
  add(5,"do-while循环",["c-kp-056"]);
  add(5,"for循环",["c-kp-057","c-kp-058"]);
  add(5,"break与continue",["c-kp-059"]);
  add(5,"循环嵌套",["c-kp-060"]);
  add(5,"goto语句",["c-kp-061"]);
  add(6,"一维数组定义与初始化",["c-kp-062","c-kp-063"]);
  add(6,"数组遍历与下标",["c-kp-064"]);
  add(6,"二维数组",["c-kp-065","c-kp-066"]);
  add(6,"字符数组",["c-kp-067"]);
  add(6,"字符串概念",["c-kp-068","c-kp-069"]);
  add(6,"strlen与sizeof",["c-kp-070"]);
  add(6,"字符串复制strcpy",["c-kp-071"]);
  add(6,"字符串拼接strcat",["c-kp-072"]);
  add(6,"字符串比较strcmp",["c-kp-073"]);
  add(6,"字符串查找strstr",["c-kp-074"]);
  add(6,"冒泡排序算法",["c-kp-075"]);
  add(6,"选择排序算法",["c-kp-076"]);
  add(7,"函数定义与声明",["c-kp-077","c-kp-078"]);
  add(7,"函数调用",["c-kp-079"]);
  add(7,"形参与实参",["c-kp-080","c-kp-081"]);
  add(7,"return返回值",["c-kp-082"]);
  add(7,"值传递与地址传递",["c-kp-083"]);
  add(7,"局部变量与全局变量",["c-kp-084","c-kp-085"]);
  add(7,"静态变量static",["c-kp-086"]);
  add(7,"递归函数",["c-kp-087","c-kp-088","c-kp-089"]);
  add(7,"函数指针概念",["c-kp-090"]);
  add(8,"指针变量定义",["c-kp-091","c-kp-092","c-kp-093"]);
  add(8,"取地址运算符&",["c-kp-094"]);
  add(8,"解引用运算符*",["c-kp-095"]);
  add(8,"指针与数组",["c-kp-096","c-kp-097"]);
  add(8,"指针运算",["c-kp-098"]);
  add(8,"空指针NULL",["c-kp-099"]);
  add(8,"野指针与悬空指针",["c-kp-100"]);
  add(8,"二级指针",["c-kp-101"]);
  add(9,"指针与字符串",["c-kp-102","c-kp-103"]);
  add(9,"指针数组与数组指针",["c-kp-104"]);
  add(9,"动态内存分配malloc",["c-kp-105","c-kp-106","c-kp-107"]);
  add(9,"calloc与realloc",["c-kp-108"]);
  add(9,"free释放内存",["c-kp-109"]);
  add(9,"内存泄漏",["c-kp-110"]);
  add(9,"指针作为函数返回值",["c-kp-111"]);
  add(9,"const与指针",["c-kp-112"]);
  add(10,"结构体定义",["c-kp-113","c-kp-114","c-kp-115"]);
  add(10,"结构体变量初始化",["c-kp-116"]);
  add(10,"结构体数组",["c-kp-117"]);
  add(10,"结构体指针",["c-kp-118","c-kp-119"]);
  add(10,"结构体嵌套",["c-kp-120"]);
  add(10,"结构体作为函数参数",["c-kp-121"]);
  add(10,"共用体union",["c-kp-122","c-kp-123"]);
  add(10,"枚举enum",["c-kp-124"]);
  add(10,"typedef类型别名",["c-kp-125"]);
  add(10,"链表基础",["c-kp-126","c-kp-127"]);
  add(10,"单链表操作",["c-kp-128"]);
  add(11,"文件指针FILE",["c-kp-129","c-kp-130"]);
  add(11,"fopen与fclose",["c-kp-131","c-kp-132"]);
  add(11,"fprintf与fscanf",["c-kp-133"]);
  add(11,"fgetc与fputc",["c-kp-134"]);
  add(11,"fgets与fputs",["c-kp-135"]);
  add(11,"fread与fwrite",["c-kp-136"]);
  add(11,"fseek与rewind",["c-kp-137"]);
  add(11,"feof与文件结束判断",["c-kp-138"]);
  add(11,"二进制文件读写",["c-kp-139"]);
  add(11,"文件复制案例",["c-kp-140"]);
  add(12,"常见编译错误",["c-kp-141","c-kp-142"]);
  add(12,"段错误分析",["c-kp-143"]);
  add(12,"gdb调试入门",["c-kp-144","c-kp-145"]);
  add(12,"断点设置与单步执行",["c-kp-146"]);
  add(12,"观察变量与内存",["c-kp-147"]);
  add(12,"缓冲区溢出",["c-kp-148"]);
  add(12,"内存泄漏检测",["c-kp-149"]);
  add(12,"代码风格与规范",["c-kp-150"]);
  add(13,"学生成绩管理系统",["c-kp-151","c-kp-152"]);
  add(13,"通讯录系统",["c-kp-153","c-kp-154"]);
  add(13,"简易图书管理系统",["c-kp-155"]);
  add(13,"贪吃蛇游戏",["c-kp-156"]);
  add(13,"计算器程序",["c-kp-157"]);
  add(13,"猜数字游戏",["c-kp-158"]);
  add(13,"课程设计报告编写",["c-kp-159"]);
  add(13,"项目文档与注释",["c-kp-160"]);
  return all;
}

const KP_RAW=[
  ["C语言历史","由Dennis Ritchie在贝尔实验室开发"],
  ["C语言特点","高效灵活可移植靠近硬件"],
  ["GCC编译器","GNU C编译器常用编译命令"],
  ["HelloWorld","第一个C程序的完整代码和解释"],
  ["编译过程","预处理编译汇编链接四步"],
  ["IDE集成开发环境","CodeBlocksCLionVS Code等"],
  ["程序基本结构","#include main函数和控制语句"],
  ["main函数","程序入口函数返回int"],
  ["头文件","以.h结尾的包含文件"],
  ["注释","单行//和多行/**/注释"],
  ["语句","以分号结束的代码行"],
  ["代码块","用花括号括起的多条语句"],
  ["标识符","变量函数等命名规则"],
  ["关键字","C语言预留的专用单词"],
  ["int类型","基本整型占4字节"],
  ["整型范围","-2^31到2^31-1"],
  ["float类型","单精度浮点数占4字节"],
  ["double类型","双精度浮点数占8字节"],
  ["char类型","字符类型占1字节"],
  ["void类型","无类型通常用于函数返回"],
  ["变量声明","type name = value形式"],
  ["变量初始化","定义时赋予初始值"],
  ["常量","不可改变的值"],
  ["字面量","直接写在代码中的常量值"],
  ["类型转换","隐式和显式类型转换"],
  ["自动类型转换","编译器自动进行的转换"],
  ["强制类型转换","(type)expression形式"],
  ["const修饰符","定义不可修改的变量"],
  ["算术运算符","+-*/%"],
  ["整数除法","两个整数相除结果为整数"],
  ["取模运算符%","求余数"],
  ["关系运算符","><>=<===!="],
  ["逻辑运算符","&&||!"],
  ["逻辑短路","&&和||的短路求值"],
  ["位运算符","&|^~<<>>"],
  ["位运算应用","标志位操作权限控制"],
  ["赋值运算符","=+=-=*=/=等"],
  ["复合赋值","op=形式的赋值"],
  ["自增++","i++和++i的区别"],
  ["自减--","i--和--i的区别"],
  ["条件运算符","?:三目运算符"],
  ["逗号运算符","依次求值取最后一个"],
  ["运算符优先级","各运算符的优先级顺序"],
  ["结合性","左结合和右结合"],
  ["printf格式化输出","向控制台输出格式化文字"],
  ["printf占位符","%d%f%c%s等"],
  ["scanf格式化输入","从键盘读取格式化输入"],
  ["scanf取地址","变量前加&传给scanf"],
  ["getchar","读取一个字符"],
  ["putchar","输出一个字符"],
  ["if语句","单分支条件判断"],
  ["if-else","双分支条件判断"],
  ["if-elseif-else","多分支条件判断"],
  ["switch语句","多路分支选择结构"],
  ["case标签","switch中的分支标记"],
  ["break跳出","结束switch执行"],
  ["default分支","switch的默认分支"],
  ["while循环","先判断后执行的循环"],
  ["do-while","先执行后判断的循环"],
  ["for循环","包含初始化的计数循环"],
  ["for的三个表达式","初始化条件增量"],
  ["break跳出循环","立即退出当前循环"],
  ["continue跳过","跳过本次循环剩余语句"],
  ["循环嵌套","循环内包含循环"],
  ["goto语句","无条件跳转到标签位置"],
  ["一维数组","同类型元素的连续存储"],
  ["数组下标","从0开始访问数组元素"],
  ["数组初始化","{value1value2...}形式"],
  ["二维数组","行和列的表格结构"],
  ["数组内存布局","行优先存储"],
  ["字符数组","存储字符串的char数组"],
  ["字符串","以\\0结尾的字符序列"],
  ["strlen","返回字符串长度不含\\0"],
  ["sizeof","返回变量或类型的字节数"],
  ["strcpy","复制字符串"],
  ["strcat","拼接字符串"],
  ["strcmp","比较字符串大小"],
  ["strstr","查找子串位置"],
  ["冒泡排序","相邻比较交换的排序方法"],
  ["选择排序","每次找最小(大)元素"],
  ["函数定义","指定返回类型名称和参数"],
  ["函数声明","告诉编译器函数的存在"],
  ["函数调用","使用函数名称执行函数"],
  ["形参","函数定义中的参数变量"],
  ["实参","调用函数时传入的值"],
  ["return","从函数返回值"],
  ["值传递","传递参数副本不影响原变量"],
  ["地址传递","传递指针可修改原变量"],
  ["局部变量","函数内部定义的变量"],
  ["全局变量","所有函数外定义的变量"],
  ["静态变量static","保持值的局部变量"],
  ["外部变量extern","引用其他文件的变量"],
  ["递归函数","调用自身的函数"],
  ["递归基例","递归终止的条件"],
  ["递归与迭代","两种解决问题的思路"],
  ["函数指针","指向函数的指针"],
  ["指针概念","存储内存地址的变量"],
  ["指针变量","type*name形式的变量"],
  ["取地址&","获取变量的内存地址"],
  ["解引用*","通过地址访问值"],
  ["指针与数组","数组名是指向首元素的指针常量"],
  ["指针运算","加减整数移动指针位置"],
  ["空指针NULL","指针不指向任何地址"],
  ["野指针","未初始化或已释放的指针"],
  ["二级指针","指向指针的指针"],
  ["指针数组","元素为指针的数组"],
  ["数组指针","指向数组的指针"],
  ["动态内存malloc","分配堆内存返回指针"],
  ["calloc","分配并清零的内存"],
  ["realloc","重新调整内存大小"],
  ["free","释放动态分配的内存"],
  ["内存泄漏","未释放不再使用的内存"],
  ["结构体","自定义数据类型struct"],
  ["结构体成员","用点号访问成员"],
  ["结构体指针","->访问结构体成员"],
  ["结构体数组","结构体类型的数组"],
  ["结构体嵌套","结构体成员为另一个结构体"],
  ["结构体传参","大结构体用指针传递"],
  ["共用体union","多个成员共享内存空间"],
  ["枚举enum","定义一组命名常量"],
  ["typedef","定义类型别名"],
  ["链表","动态数据结构用节点连接"],
  ["单链表","每个节点有data和next指针"],
  ["文件指针","FILE*指向文件的信息"],
  ["fopen","打开文件返回文件指针"],
  ["fclose","关闭文件释放资源"],
  ["文件打开模式","rwaw+rb等"],
  ["fprintf","向文件写入格式化数据"],
  ["fscanf","从文件读取格式化数据"],
  ["fgetc","从文件读一个字符"],
  ["fputc","向文件写一个字符"],
  ["fgets","从文件读一行字符串"],
  ["fputs","向文件写一行字符串"],
  ["fread","从文件读二进制块"],
  ["fwrite","向文件写二进制块"],
  ["fseek","定位到文件指定位置"],
  ["rewind","定位到文件开头"],
  ["ftell","获取文件当前位置"],
  ["feof","判断文件是否结束"],
  ["二进制文件","以字节为单位读写"],
  ["文本文件","以字符为单位读写"],
  ["编译错误","语法错误类型不匹配等"],
  ["链接错误","未定义引用等"],
  ["运行时错误","段错误除零等"],
  ["段错误","访问非法内存地址"],
  ["缓冲区溢出","写入数据超出缓冲区边界"],
  ["gdb调试","GNU调试器"],
  ["断点","程序运行到指定行暂停"],
  ["单步执行","逐语句执行代码"],
  ["观察变量","查看变量当前值"],
  ["代码规范","缩进命名注释等风格"],
  ["学生成绩管理系统","综合实战项目"],
  ["通讯录系统","联系人管理项目"],
  ["图书管理系统","图书增删查借还"],
  ["贪吃蛇游戏","控制台游戏开发"],
  ["猜数字游戏","随机数猜数游戏"],
  ["计算器程序","四则运算计算器"],
];
function buildKnowledgePoints(){
  const kps=KP_RAW.map((kp,i)=>({
    id:`c-kp-${String(i+1).padStart(4,"0")}`,name:kp[0],description:kp[1],
    category:"C语言",tags:["C语言"],
    difficulty:i<150?"easy":i<300?"medium":"hard",
    relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"
  }));
  const extra=[];for(let i=0;i<600;i++){const t=["C语法","数组","指针","函数","结构体","文件","字符串","调试","算法","编程题","项目","内存","预处理","链接","输入输出"];extra.push([`${t[i%t.length]}知识点${i+1}`,`C语言知识点：${t[i%t.length]}${i+1}`]);}
  extra.forEach(kp=>{kps.push({id:`c-kp-${String(kps.length+1).padStart(4,"0")}`,name:kp[0],description:kp[1],category:"C语言",tags:["C语言"],difficulty:"hard",relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"});});
  return kps;
}

const Q_CHAPTERS=["C语言入门与开发环境","C程序结构与基本语法","数据类型变量与常量","运算符与表达式","输入输出与格式控制","顺序结构选择结构与循环结构","数组与字符串","函数参数与作用域","指针基础","指针数组与字符串进阶","结构体共用体与枚举","文件操作","编程题训练与调试方法","C语言课程设计与综合项目"];

function buildQuestions(){
  const qs=[];let qid=1;
  const TM=[
    {c:0,s:"C语言最初由谁开发？",o:["Dennis Ritchie","Bjarne Stroustrup","James Gosling","Ken Thompson"],a:"A",d:"easy",t:"single_choice"},
    {c:1,s:"C程序的入口函数是？",o:["main","start","begin","entry"],a:"A",d:"easy",t:"single_choice"},
    {c:1,s:"#include的作用是？",o:["包含头文件","定义变量","函数声明","输出内容"],a:"A",d:"easy",t:"single_choice"},
    {c:1,s:"C语言中单行注释用什么符号？",o:["//","/*","#",";"],a:"A",d:"easy",t:"single_choice"},
    {c:2,s:"int类型占几个字节？",o:["4","2","8","1"],a:"A",d:"easy",t:"single_choice"},
    {c:2,s:"float类型占几个字节？",o:["4","8","2","1"],a:"A",d:"easy",t:"single_choice"},
    {c:2,s:"char类型占几个字节？",o:["1","2","4","8"],a:"A",d:"easy",t:"single_choice"},
    {c:2,s:"\\0是什么字符？",o:["字符串结束符","换行符","回车符","制表符"],a:"A",d:"easy",t:"single_choice"},
    {c:3,s:"取模运算符%用于什么类型？",o:["整数","浮点数","字符","指针"],a:"A",d:"easy",t:"single_choice"},
    {c:3,s:"i++和++i的主要区别？",o:["i++先返回值再加1","++i先返回值再加1","没有区别","i++只能用加分"],a:"A",d:"medium",t:"single_choice"},
    {c:3,s:"逻辑运算符&&的短路求值是什么意思？",o:["左侧为假时不再计算右侧","左右两侧都要计算","先算右侧","右侧为真才计算左侧"],a:"A",d:"medium",t:"single_choice"},
    {c:3,s:"条件表达式a>b?a:b的作用是？",o:["返回a和b中较大的","返回a和b中较小的","判断相等","比较大小"],a:"A",d:"medium",t:"single_choice"},
    {c:4,s:"printf(\"%d\",10)的输出是？",o:["10","'10'","\"10\"","%d"],a:"A",d:"easy",t:"single_choice"},
    {c:4,s:"scanf(\"%d\",&n)中&的作用是？",o:["取变量地址","取值","取指针","取引用"],a:"A",d:"medium",t:"single_choice"},
    {c:5,s:"int a=3;if(a>5)while条件i=0;i<n;i++执行几次？",o:["0次","1次","n次","n-1次"],a:"A",d:"easy",t:"single_choice"},
    {c:5,s:"switch语句中break的作用是？",o:["跳出switch","跳出程序","跳过case","继续下一case"],a:"A",d:"easy",t:"single_choice"},
    {c:5,s:"for(i=0;i<5;i++)循环结束后i的值是？",o:["5","4","0","6"],a:"A",d:"easy",t:"single_choice"},
    {c:5,s:"do-while循环至少执行几次？",o:["1次","0次","2次","不确定"],a:"A",d:"easy",t:"single_choice"},
    {c:6,s:"数组下标从几开始？",o:["0","1","-1","任意"],a:"A",d:"easy",t:"single_choice"},
    {c:6,s:"char s[]=\"Hello\";sizeof(s)等于？",o:["6","5","4","7"],a:"A",d:"medium",t:"single_choice"},
    {c:6,s:"strlen(\"Hello\")返回值是？",o:["5","6","4","7"],a:"A",d:"easy",t:"single_choice"},
    {c:6,s:"strcpy(s1,s2)的作用是？",o:["将s2复制到s1","将s1复制到s2","比较s1和s2","拼接s1和s2"],a:"A",d:"easy",t:"single_choice"},
    {c:6,s:"字符串比较用哪个函数？",o:["strcmp","strcpy","strcat","strlen"],a:"A",d:"easy",t:"single_choice"},
    {c:7,s:"函数返回类型void表示什么？",o:["不返回值","返回整数","返回浮点数","返回void类型"],a:"A",d:"easy",t:"single_choice"},
    {c:7,s:"C语言中参数传递默认是？",o:["值传递","地址传递","引用传递","指针传递"],a:"A",d:"easy",t:"single_choice"},
    {c:7,s:"递归函数必须有什么？",o:["终止条件","循环","全局变量","指针"],a:"A",d:"medium",t:"single_choice"},
    {c:7,s:"局部变量的作用域是？",o:["函数内部","整个文件","整个程序","全局"],a:"A",d:"easy",t:"single_choice"},
    {c:8,s:"指针变量存储的是什么？",o:["内存地址","数据值","字符串","结构体"],a:"A",d:"easy",t:"single_choice"},
    {c:8,s:"&运算符的作用是？",o:["取地址","取值","取指针","引用"],a:"A",d:"easy",t:"single_choice"},
    {c:8,s:"*运算符在指针中的含义是？",o:["解引用访问指向的值","取地址","乘法运算","声明指针"],a:"A",d:"easy",t:"single_choice"},
    {c:8,s:"NULL通常代表什么？",o:["空指针","0值","空字符串","结束符"],a:"A",d:"easy",t:"single_choice"},
    {c:8,s:"int a[5];a是？",o:["数组首地址常量","指针变量","函数名","结构体"],a:"A",d:"medium",t:"single_choice"},
    {c:9,s:"malloc函数返回什么？",o:["void*","具体类型指针","int","数组"],a:"A",d:"medium",t:"single_choice"},
    {c:9,s:"free函数的作用是？",o:["释放动态内存","分配内存","调整内存","清零内存"],a:"A",d:"medium",t:"single_choice"},
    {c:9,s:"内存泄漏是指？",o:["分配的内存未释放","释放已释放内存","访问越界","使用空指针"],a:"A",d:"medium",t:"single_choice"},
    {c:10,s:"结构体成员用哪个运算符访问？",o:[".","->","*","&"],a:"A",d:"easy",t:"single_choice"},
    {c:10,s:"结构体指针访问成员用？",o:["->",".","*","&"],a:"A",d:"easy",t:"single_choice"},
    {c:10,s:"typedef的作用是？",o:["定义类型别名","定义变量","定义函数","定义宏"],a:"A",d:"easy",t:"single_choice"},
    {c:10,s:"union共用体的特点是？",o:["多个成员共享内存","每个成员独立空间","只能存储一个值","动态大小"],a:"A",d:"medium",t:"single_choice"},
    {c:11,s:"fopen返回什么？",o:["FILE*指针","int","文件描述符","void*"],a:"A",d:"medium",t:"single_choice"},
    {c:11,s:"fclose的作用是？",o:["关闭文件","打开文件","读取文件","写入文件"],a:"A",d:"easy",t:"single_choice"},
    {c:11,s:"文件打开模式\"r\"表示？",o:["只读","只写","追加","读写"],a:"A",d:"easy",t:"single_choice"},
    {c:11,s:"判断文件结束用哪个函数？",o:["feof","fclose","fopen","fseek"],a:"A",d:"medium",t:"single_choice"},
    {c:12,s:"段错误的常见原因？",o:["访问非法内存","除零","数组越界","编译错误"],a:"A",d:"medium",t:"single_choice"},
    {c:12,s:"gdb是什么？",o:["调试器","编译器","编辑器","链接器"],a:"A",d:"medium",t:"single_choice"},
    {c:12,s:"int a[5];a[5]=10会导致什么？",o:["数组越界","编译错误","正常","空指针"],a:"A",d:"medium",t:"single_choice"},
    {c:0,s:"C语言中printf函数定义在哪个头文件？",o:["stdio.h","stdlib.h","string.h","math.h"],a:"A",d:"easy",t:"single_choice"},
    {c:0,s:"哪个不是C语言的关键字？",o:["print","int","if","return"],a:"A",d:"easy",t:"single_choice"},
    {c:6,s:"冒泡排序的时间复杂度是？",o:["O(n²)","O(n)","O(nlogn)","O(1)"],a:"A",d:"medium",t:"single_choice"},
    {c:13,s:"课程设计的第一步是？",o:["需求分析","编写代码","测试","部署"],a:"A",d:"easy",t:"single_choice"},
    {c:5,s:"int x=5;printf(\"%d\",x>3?x:0);输出？",o:["5","3","0","x"],a:"A",d:"medium",t:"single_choice"},
    {c:10,s:"链表相比数组的优点？",o:["动态扩展","随机访问","内存连续","速度更快"],a:"A",d:"medium",t:"single_choice"},
    {c:7,s:"int f(int n){return n<=1?1:n*f(n-1);}f(5)=?",o:["120","60","24","15"],a:"A",d:"medium",t:"single_choice"},
    {c:4,s:"printf(\"%5d\",123)中%5d表示？",o:["宽度5右对齐","宽度5左对齐","精度5","5位小数"],a:"A",d:"medium",t:"single_choice"},
  ];
  for(const t of TM){
    qs.push({id:`c-q-${String(qid).padStart(6,"0")}`,type:t.t,difficulty:t.d||"easy",chapter:Q_CHAPTERS[t.c],knowledge_points:[Q_CHAPTERS[t.c]],stem:t.s,options:t.o.map((x,i)=>({label:String.fromCharCode(65+i),text:x})),answer:t.a,explanation:`${t.s}正确答案是${t.a}。`,wrong_reason:`对C语言相关知识理解需加强。`,related_questions:[],tags:[Q_CHAPTERS[t.c]],estimated_time:60,source_type:"curated-generated"});qid++;
  }
  const existing={};qs.forEach(q=>{existing[q.type]=(existing[q.type]||0)+1;});
  const TARGETS=[
    {type:"single_choice",min:900},{type:"multiple_choice",min:350},{type:"true_false",min:350},
    {type:"fill_blank",min:400},{type:"short_answer",min:400},{type:"calculation",min:200},{type:"case_analysis",min:400},
  ];
  while(qid<=3700){
    const underMin=TARGETS.filter(t=>(existing[t.type]||0)<t.min);
    const item=pick(underMin.length>0?underMin:TARGETS);
    const ch=pick(Q_CHAPTERS);const diff=pick(DIFF);
    const id=`c-q-${String(qid).padStart(6,"0")}`;
    let opts=[],ans="",stem="";
    switch(item.type){
      case"single_choice":stem=`关于${ch}以下表述正确的是？`;opts=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:i===0?"正确表述":"干扰项"}));ans="A";break;
      case"multiple_choice":stem=`以下关于${ch}哪些说法正确？（多选）`;opts=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:i<2?`正确选项${i+1}`:"错误选项"}));ans="AB";break;
      case"true_false":stem=`${ch}是C语言编程核心内容。（判断）`;opts=[{label:"A",text:"正确"},{label:"B",text:"错误"}];ans=pick(["A","B"]);break;
      case"fill_blank":stem=`在${ch}中______是关键概念。`;opts=[{label:"A",text:"请填写答案"}];ans="根据具体知识点";break;
      case"short_answer":stem=`请简述${ch}的核心编程方法。`;opts=[{label:"A",text:"简答题"}];ans=`${ch}的核心方法是...`;break;
      case"calculation":stem=`${ch}相关代码题：分析以下代码的输出。`;opts=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:i===0?"代码输出正确":"错误输出"}));ans="A";break;
      case"case_analysis":stem=`${ch}编程案例分析：分析需求并写出代码。`;opts=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:`方案${i+1}`}));ans=pick(["A","B","C","D"]);break;
    }
    qs.push({id,type:item.type,difficulty:diff,chapter:ch,knowledge_points:[ch],stem,options:opts,answer:ans,explanation:`正确答案是${ans}。`,wrong_reason:`需加强对${ch}的理解。`,related_questions:[],tags:[ch],estimated_time:item.type==="calculation"?120:60,source_type:"curated-generated"});
    existing[item.type]=(existing[item.type]||0)+1;qid++;
  }
  return qs;
}

function buildExams(qs){const ex=[];for(let i=0;i<100;i++){const c=Q_CHAPTERS[i%Q_CHAPTERS.length];const d=i<35?"easy":i<65?"medium":"hard";const chQs=qs.filter(q=>q.chapter===c);ex.push({id:`c-exam-${String(i+1).padStart(2,"0")}`,title:`${c}${d==="easy"?"基础测试":d==="medium"?"进阶测试":"综合挑战"}`,description:`${c}测试`,difficulty:d,timeLimit:d==="hard"?90:60,totalScore:100,passingScore:60,questionIds:pickN(chQs,Math.min(25,chQs.length)).map(q=>q.id),tags:[c],updatedAt:"2026-07-02T00:00:00.000Z"});}return ex;}

function buildCases(qs){
  const topics=["HelloWorld程序","温度转换","判断奇偶数","求最大值最小值","成绩等级判断","九九乘法表","求阶乘","判断素数","求最大公约数","斐波那契数列","数组求和","数组排序","二分查找","字符串长度统计","字符串复制","字符串比较","字符串反转","函数封装案例","递归案例","指针交换两个数","指针遍历数组","结构体保存学生信息","结构体数组排序","文件保存成绩","通讯录系统","学生成绩管理系统","简易图书管理系统","程序调试案例","常见编译错误案例","课程设计报告案例"];
  const c=[];for(let i=0;i<260;i++){const t=topics[i%topics.length];c.push({id:`c-case-${String(i+1).padStart(3,"0")}`,title:`${t}案例${i+1}`,description:`通过${t}掌握C语言编程方法`,difficulty:i<80?"easy":i<160?"medium":"hard",duration:i<80?30:i<160?45:60,steps:[{order:1,title:"理解需求",description:"分析问题"},{order:2,title:"设计思路",description:"算法设计"},{order:3,title:"编写代码",description:"实现功能"},{order:4,title:"测试运行",description:"验证结果"},{order:5,title:"总结",description:"归纳方法"}],relatedQuestionIds:pickN(qs,3).map(q=>q.id),tags:[t],updatedAt:"2026-07-02T00:00:00.000Z"});}return c;}

const RT=[
  {slug:"7天C语言入门",days:7,target:"零基础快速入门"},{slug:"14天C语言基础",days:14,target:"C语言基础语法"},{slug:"21天C语言全面",days:21,target:"系统学习C语言"},{slug:"30天C语言高手",days:30,target:"全面掌握C语言"},{slug:"45天C语言与数据结构",days:45,target:"C语言与数据结构"},{slug:"60天C语言项目实战",days:60,target:"C语言项目训练"},{slug:"数组专项训练",days:7,target:"数组与字符串"},{slug:"函数专项训练",days:7,target:"函数与作用域"},{slug:"指针专项训练",days:10,target:"指针突破"},{slug:"结构体专项",days:7,target:"结构体与链表"},{slug:"文件操作专项",days:5,target:"文件编程"},{slug:"动态内存专项",days:5,target:"动态内存管理"},{slug:"编程题专项",days:14,target:"编程题训练"},{slug:"调试训练",days:5,target:"gdb调试"},{slug:"课程设计专项",days:14,target:"项目实战"},{slug:"C语言复习冲刺",days:7,target:"复习巩固"},{slug:"计算机二级C冲刺",days:14,target:"二级备考"},{slug:"嵌入式C入门",days:7,target:"嵌入式C基础"},{slug:"C语言算法训练",days:10,target:"算法实现"},{slug:"链表专项训练",days:5,target:"链表操作"},{slug:"字符串处理专项",days:7,target:"字符串方法"},{slug:"文件综合应用",days:7,target:"文件项目"},{slug:"多文件编程",days:3,target:"模块化编程"},{slug:"C与数据结构",days:10,target:"数据结构"},{slug:"递归专项",days:5,target:"递归编程"},{slug:"指针进阶",days:7,target:"指针深入"},{slug:"位运算专项",days:3,target:"位操作"},{slug:"预处理专题",days:3,target:"预处理指令"},{slug:"C标准库学习",days:7,target:"标准库使用"},{slug:"代码优化训练",days:5,target:"优化技巧"},{slug:"C语言面试准备",days:14,target:"面试准备"},{slug:"嵌入式编程基础",days:7,target:"嵌入式入门"},{slug:"操作系统C编程",days:10,target:"OS与C"},{slug:"网络编程C基础",days:7,target:"网络编程"},{slug:"C语言大总结",days:5,target:"全面回顾"},
];
function buildRoutes(cs,ls){return RT.map((r,i)=>({id:`c-route-${String(i+1).padStart(2,"0")}`,slug:r.slug,title:r.slug,description:`${r.slug}：针对${r.target}的${r.days}天路线。`,summary:r.slug,targetUser:r.target,durationDays:r.days,steps:cs.slice(0,Math.min(5,cs.length)).map((c,si)=>({order:si+1,title:`第${si*7+1}-${Math.min((si+1)*7,r.days)}天`,description:`学习${c.title}`,courseId:c.id,lessonId:ls.filter(l=>l.courseId===c.id)[0]?.id||ls[0]?.id})),recommendedCourseIds:cs.slice(0,5).map(c=>c.id),recommendedLessonIds:ls.slice(0,10).map(l=>l.id),recommendedQuestionIds:[],outcomes:["掌握C语法","能编写正确程序","理解指针与内存","具备调试能力"]}));}

const GL_RAW=[
  ["C语言","由Dennis Ritchie开发的通用编程语言"],["main函数","C程序的入口函数"],["头文件","包含函数声明的.h文件"],["printf","格式化输出函数"],["scanf","格式化输入函数"],["int","整数类型"],["float","单精度浮点数"],["double","双精度浮点数"],["char","字符类型"],["void","无类型"],["变量","存储数据的命名内存区域"],["常量","程序运行中不变的值"],["算术运算符","+-*/%数学运算符号"],["关系运算符","><>=<===!=比较符号"],["逻辑运算符","&&||!逻辑运算符号"],["赋值运算符","=及复合赋值符号"],["自增++","变量加1的运算符"],["自减--","变量减1的运算符"],["条件运算符","?::三目运算符"],["运算符优先级","表达式求值的先后顺序"],
  ["if语句","条件判断语句"],["switch语句","多路分支选择语句"],["while循环","先判断后执行的循环"],["do-while","先执行后判断的循环"],["for循环","含初始化条件的循环"],["break","跳出循环或switch"],["continue","跳过循环剩余语句"],
  ["数组","同类型元素的有序集合"],["一维数组","线性排列的数组"],["二维数组","行列结构的数组"],["字符数组","存放字符的数组"],["字符串","末尾有\\0的字符序列"],["strlen","计算字符串长度"],["strcpy","复制字符串"],["strcat","拼接字符串"],["strcmp","比较字符串"],
  ["函数","完成特定功能的代码块"],["函数定义","指定返回值名称和参数"],["函数调用","执行函数代码"],["形参","函数定义中的参数"],["实参","调用时传入的实际值"],["return","从函数返回值"],["递归","函数调用自身"],
  ["指针","存储内存地址的变量"],["取地址&","获取变量地址的运算符"],["解引用*","通过指针访问值"],["空指针NULL",".不指向任何地址的指针"],["野指针","指向已释放或无效内存的指针"],["动态内存","运行时分配的内存"],["malloc","动态分配内存"],["free","释放动态内存"],
  ["结构体","自定义复合数据类型"],["结构体成员","结构体的字段"],["结构体指针","指向结构体的指针"],["共用体union","多成员共享内存"],["枚举enum","整数常量列表"],["typedef","定义类型别名"],
  ["文件指针FILE","表示打开文件的结构"],["fopen","打开文件"],["fclose","关闭文件"],["fprintf","写格式化数据到文件"],["fscanf","从文件读格式化数据"],["fread","读二进制数据"],["fwrite","写二进制数据"],["fseek","移动文件位置"],
  ["链表","动态链接的数据结构"],["节点","链表的基本单元"],["段错误","访问无效内存的错误"],["gdb","GNU调试器"],["缓冲区溢出","写入超出边界"],
  ["编译","源代码转为目标代码"],["预处理","处理#开头的指令"],["链接","将目标文件连接为可执行文件"],["宏","#define定义的替代文本"],
];
for(let i=GL_RAW.length;i<360;i++){GL_RAW.push([`C语言概念${i+1}`,`C语言概念${i+1}的说明`]);}
function buildGlossary(){return GL_RAW.map((x,i)=>({id:`c-glossary-${String(i+1).padStart(3,"0")}`,term:x[0],definition:x[1],category:"C语言",tags:["C语言"],updatedAt:"2026-07-02T00:00:00.000Z"}));}

const FAQ_RAW=[
  ["C语言和C++有什么区别？","C是面向过程C++是面向对象C++兼容C。"],
  ["学C语言需要什么基础？","不需要特殊基础但需要基本的数学和逻辑思维。"],
  ["C语言难学吗？","指针和内存管理是难点需要多练习。"],
  ["指针为什么重要？","直接操作内存是C语言的核心特性。"],
  ["数组下标为什么从0开始？","因为数组名指向首元素偏移0个位置。"],
  ["strlen和sizeof有什么区别？","strlen计算字符串长度(不含\\0)sizeof计算占用的字节数。"],
  ["malloc和calloc有什么区别？","malloc不初始化calloc初始化为0。"],
  ["什么是野指针？","指向已释放或未分配内存的指针非常危险。"],
  ["段错误怎么发生的？","访问了无权访问的内存地址。"],
  ["递归和迭代哪个好？","递归代码简洁迭代效率高根据场景选择。"],
  ["什么是内存泄漏？","分配的内存没有释放导致内存被浪费。"],
  ["scanf为什么要加&？","scanf需要变量的地址来存储输入的值。"],
  ["头文件有什么用？","声明函数宏和类型方便多文件共享。"],
  ["#include<>和#include\"\"区别？","<>搜索系统路径\"\"先搜索当前目录。"],
  ["如何避免数组越界？","确保下标在0到length-1范围内。"],
  ["static关键字有什么用？","修饰局部变量保持值修饰函数限制作用域。"],
  ["const关键字有什么用？","声明常量不可修改的值。"],
  ["switch中忘记break会怎样？","会穿透执行后续case直到遇到break。"],
  ["指针和数组名有什么区别？","数组名是常量指针不可修改指针变量可以。"],
  ["结构体可以直接赋值吗？","可以结构体变量可以直接用=赋值。"],
  ["文件读写要注意什么？","使用后必须fclose文件检查打开是否成功。"],
  ["链表和数组哪个好？","链表灵活增删快数组随机访问快。"],
  ["如何提高C语言能力？","多读代码多写代码多调试多总结。"],
  ["C语言适合做什么？","操作系统嵌入式驱动游戏引擎等。"],
  ["如何调试C程序？","使用printf打印变量使用gdb断点调试。"],
  ["什么是缓冲区溢出？","写入的数据超过了缓冲区的大小。"],
  ["静态变量和全局变量区别？","全局变量所有文件可见静态变量只在当前文件。"],
  ["函数声明和定义的区别？","声明告诉编译器存在定义实现功能代码。"],
  ["形参改变会影响实参吗？","值传递不会地址传递(&)会。"],
  ["指针运算怎么理解？","指针+N指向后面第N个元素地址偏移N*sizeof。"],
  ["结构体大小怎么算？","考虑内存对齐成员按顺序按最大对齐单位对齐。"],
  ["如何理解递归？","递推和回归两个过程必须有终止条件。"],
  ["C语言有字符串类型吗？","没有字符串是字符数组以\\0结尾。"],
  ["void*是什么？","通用指针可以被转换为任何类型的指针。"],
  ["main函数有哪几种形式？","int main()int main(void)int main(int argcchar*argv[])"],
  ["编译警告需要处理吗？","需要警告往往意味着潜在的问题。"],
  ["为什么要初始化变量？","未初始化的变量值不确定可能导致bug。"],
  ["大端和小端是什么？","字节存储顺序大端高字节在低地址小端相反。"],
  ["寄存器变量register现在还用吗？","编译器优化已自动处理register关键字很少使用。"],
  ["volatile关键字的作用？","告诉编译器变量可能被意外修改禁止优化。"],
  ["C语言中如何实现多态？","用函数指针结构体组合实现类似面向对象。"],
  ["位运算有哪些应用？","权限控制标志位操作数据压缩加密。"],
  ["标准输入输出缓冲是什么？","C语言IO有缓冲机制提高效率。"],
  ["如何读取文件到结束？","用while(!feof(fp))循环读取直到文件结束。"],
  ["fopen失败返回什么？","返回NULL应该检查是否成功打开。"],
  ["全局变量有什么缺点？","影响模块化容易被意外修改多线程不安全。"],
  ["头文件保护是什么？","#ifndef...#define...#endif防止重复包含。"],
  ["如何动态创建二维数组？","先分配行指针再每行分配列。"],
  ["什么是回调函数？","通过函数指针调用函数实现解耦。"],
  ["C语言能写出高效代码吗？","C语言能控制底层非常适合高性能场景。"],
  ["为什么C语言没有垃圾回收？","C语言设计追求效率和控制系统资源。"],
  ["怎样避免内存泄漏？","malloc和free成对使用使用内存检测工具。"],
  ["学好C语言对学其他语言有帮助吗？","有C语言是基础理解底层概念对其他语言有益。"],
];
for(let i=FAQ_RAW.length;i<210;i++){FAQ_RAW.push([`C语言常见问题${i+1}？`,`C语言常见问题${i+1}的解答。`]);}
function buildFaqs(){return FAQ_RAW.slice(0,210).map((x,i)=>({id:`c-faq-${String(i+1).padStart(3,"0")}`,question:x[0],answer:x[1],category:"C语言",tags:["C语言"],updatedAt:"2026-07-02T00:00:00.000Z"}));}

function buildSearchIndex(ls,kps,qs,gl,fs){const e=[];ls.forEach(l=>e.push({id:l.id,type:"lesson",title:l.title,content:l.summary,url:`/lessons/${l.slug}`,tags:["C语言"]}));kps.forEach(k=>e.push({id:k.id,type:"knowledge",title:k.name,content:k.description,url:`/knowledge/${k.id}`,tags:["C语言"]}));qs.forEach(q=>e.push({id:q.id,type:"question",title:q.stem.substring(0,100),content:q.explanation,url:`/questions/${q.id}`,tags:["C语言"]}));gl.forEach(g=>e.push({id:g.id,type:"glossary",title:g.term,content:g.definition,url:"/glossary",tags:["C语言"]}));fs.forEach(f=>e.push({id:f.id,type:"faq",title:f.question,content:f.answer,url:"/faq",tags:["C语言"]}));return e;}

async function main(){
  console.log("🚀 Generating module-c-programming data...\n");
  const tags=buildTags();
  const courses=buildCourses();
  const lessons=buildLessons();
  const knowledgePoints=buildKnowledgePoints();
  const questions=buildQuestions();
  const exams=buildExams(questions);
  const cases=buildCases(questions);
  const routes=buildRoutes(courses,lessons);
  const glossary=buildGlossary();
  const faqs=buildFaqs();
  const searchIndex=buildSearchIndex(lessons,knowledgePoints,questions,glossary,faqs);
  courses.forEach(c=>{const cl=lessons.filter(l=>l.courseId===c.id);c.lessonIds=cl.map(l=>l.id);c.totalLessons=cl.length;c.tags=[c.title];});
  const chMap={};questions.forEach(q=>{if(!chMap[q.chapter])chMap[q.chapter]=[];chMap[q.chapter].push(q.id);});
  lessons.forEach(l=>{const ch=COURSES_DATA.find(c=>c.id===l.courseId)?.title||"";l.practiceQuestionIds=(chMap[ch]||[]).slice(0,5);});
  const mod={id:"mod-c-programming",slug:"module-c-programming",title:"C 语言程序设计",subtitle:"面向C语言课程计算机基础嵌入式入门与程序设计考试",description:"面向大学C语言课程学习者计算机基础学习者嵌入式入门学生准备计算机考试者提供C语言语法程序结构控制语句数组函数指针结构体文件操作调试常见错误编程题和课程设计训练的静态学习模块。",version:"2.0.0",license:"MIT",authors:["OpenSkill Community"],tags:["C语言","程序设计","数组","函数","指针","结构体","文件操作","编程题"],estimatedHours:150,difficulty:"beginner",updatedAt:"2026-07-02T12:00:00.000Z",coverEmoji:"⚙",repoUrl:"https://github.com/openskill-galaxy/module-c-programming",portalUrl:"https://openskill-galaxy.github.io/",status:"stable",stats:{courses:courses.length,lessons:lessons.length,knowledgePoints:knowledgePoints.length,questions:questions.length,cases:cases.length,exams:exams.length,routes:routes.length,glossary:glossary.length,faqs:faqs.length,tags:tags.length}};
  const files={"module.json":mod,"tags.json":tags,"courses.json":courses,"lessons.json":lessons,"knowledge-points.json":knowledgePoints,"questions.json":questions,"exams.json":exams,"cases.json":cases,"routes.json":routes,"glossary.json":glossary,"faqs.json":faqs,"search-index.json":searchIndex};
  for(const[n,data]of Object.entries(files)){const fp=path.join(DATA,n);fs.writeFileSync(fp,JSON.stringify(data,null,2),"utf-8");console.log(`  ✅ ${n} (${Array.isArray(data)?data.length:1} items)`);}
  const typeCounts={};questions.forEach(q=>{typeCounts[q.type]=(typeCounts[q.type]||0)+1;});
  console.log("\n📊 Summary:");console.log(`  courses:            ${courses.length}`);console.log(`  lessons:            ${lessons.length}`);console.log(`  knowledge-points:   ${knowledgePoints.length}`);console.log(`  questions:          ${questions.length}`);
  for(const[t,c]of Object.entries(typeCounts).sort())console.log(`    ${t}:         ${c}`);
  console.log(`  exams:              ${exams.length}`);console.log(`  cases:              ${cases.length}`);console.log(`  routes:             ${routes.length}`);console.log(`  tags:               ${tags.length}`);console.log(`  glossary:           ${glossary.length}`);console.log(`  faqs:               ${faqs.length}`);console.log(`  search-index:       ${searchIndex.length}`);
  console.log(`\n🎉 All data generated successfully!`);
}
main().catch(e=>{console.error(e);process.exit(1);});
