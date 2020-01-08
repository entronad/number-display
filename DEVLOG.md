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



单位，分隔符，单位长度都沿用英语的kMG体系



length 默认值设为9，是为-9,999.99能原值显示，再大一般会变换单位



注意 '' 和 '-' 现在的正则挑不出来，要单独处理



小数末尾的0都去掉（包括小数只有.0）的情况

因为1，展示的数字不代表int和double类型的区分，2计算机中数值类型本身就不带多个0，js数字类型中连.0都没有，3.本函数的dicimal位数本身就不代表绝对的精度（优先级低于trimming）



目前的rounding方法，当intStr + decimalLength很大时，dart中的int会溢出，特别是decimalLength的默认值很大，加个判断，只有decimalstr  > decimalLength 时才执行（提示效率），同时intStr + decimalLength不能很大否则直接切割，杜绝decimalLength的默认值很大的情况，这样只有在length很大，实际值也很大的时候才会有问题



浮点数精度问题所以限制数字的有效数字不能超过12，故传入rounding方法时，decimalLength不能超过12-intStr

rounding方法里有了，外面parseFloat(value).toPrecision(maxPrecision)以应对纯整数的情况

因为外面的转换已经保证了里面的精度不超过12，rounding在第一步时不处理此种情况



首次取正则和判断正则还是要分开，以处理3.14some non-digit characters的情况