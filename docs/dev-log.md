输出构造器createDisplay

默认输出还是使用所有默认值的display



是用来处理未知情况的，所以可转换为可处理数值（正则判断）的都会处理，本质上是在number -> string 过程添加了一道，但添加一条规则 null undefined nan系列会换为placeholder（placeholder超长了也截取）

1 非string number类型的一律placeholder

2 nan系列placeholder

3 转换为string

4 不符合正则的截取输出

5 符合正则的处理



判断优先级

length最重要，绝对不会超过length，如果实在不好压缩，比如leng是3，-123则会抛出异常

完全态是小数位数截取后全部加locale

绝对不能少的是符号、int部分至少存在的部分



首先不加locale

然后逐步移除小数

然后压缩整数



只有NaN等才会判断 ，‘NaN’等视为text

不会将小数位补足到precision

默认units长度*unitSpan就是最大长度，超过了返回placeholder

MAX_SAFE_INTEGER 是一个值为 9007199254740991的常量



分为localeSeparator, localeUnits, localeSpan,是关联的

直接对localeInt操作