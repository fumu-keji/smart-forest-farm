// element-ui 的form表单可以为元素制定一些验证规则，该文件存放一些公用规则
export function validateTrim(rule, value, callback) {
  if (value.trim() === "") {
    callback(new Error("输入不能为纯空格"));
  }
  callback();
}
export function validateStr60(rule, value, callback) {
  if (value.length > 60) {
    callback(new Error("输入内容不得超过60个字符"));
  } else {
    callback();
  }
}
export function validateStr50(rule, value, callback) {
  if (value.length > 50) {
    callback(new Error("输入内容不得超过50个字符"));
  } else {
    callback();
  }
}
export function validateInt(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(new Error("输入不能为空"));
  } else {
    if (isNaN(Number(value))) {
      callback(new Error("输入应该为数字"));
    } else if (value < 0) {
      callback(new Error("输入应该大于等于0"));
    } else if (value % 1 !== 0) {
      callback(new Error("应该为整数"));
    } else {
      callback();
    }
  }
}
export function validateFloat(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(new Error("内容为空"));
  } else {
    if (isNaN(Number(value))) {
      callback(new Error("输入应该为数字"));
    } else if (value < 0) {
      callback(new Error("输入应该大于等于0"));
    } else if ((value * 100).toFixed(1) % 1 !== 0) {
      callback(new Error("最多允许2位小数"));
    } else {
      callback();
    }
  }
}
export function validateTel(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(new Error("手机号码不能为空"));
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error("请输入正确格式的手机号"));
    } else {
      callback();
    }
  }
}
export function validateIdCard(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(new Error("内容为空"));
  } else {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      callback(new Error("输入的身份证号码不符合规范"));
    } else {
      callback();
    }
  }
}
export function validateLinkUrl(rule, value, callback) {
  let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if (value === "" || value === undefined) {
    callback(new Error("地址不能为空"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入有效的地址"));
  } else {
    callback();
  }
}
export function validateCommissionRate(rule, value, callback) {
  if (value > 100) {
    callback(new Error("填写的比例不应大于100"));
  } else {
    callback();
  }
}
export function validateIllegalString(rule, value, callback) {
  if (/[!！@#\$%\^&\*\,\，\'\‘\’\:\?\？\<\>\|\"\“\”\{\}\[\]\=\+\(\)\、\`\~\《\》\-\：\；\;\、\/\\]+/g.test(value)) {
    callback(new Error("您的输入含有非法字符"));
  } else {
    callback();
  }
}
export function validatePassword(rule, value, callback) {
  if (!/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{10,20}$/.test(value)) {
    callback(new Error("包含大小写字母、数字、特殊符号至少2种且长度在10~20"));
  } else {
    callback();
  }
}
export function validateEmail(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(new Error("内容为空"));
  } else if (!/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})$/) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
}
export function validatePageIllegal(rule, value, callback) {
  if (/[!！@#\$%\^&\*\,\，\.\。\'\‘\’\:\?\？\|\"\“\”\{\}\[\]\=\+\、\`\~\《\》\（\）\——\：\；\;\、\/\\]+/g.test(value)) {
    callback(new Error("您的输入含有非法字符"));
  } else {
    callback();
  }
}
export function validateDictionaryCode(rule, value, callback) {
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(value)) {
    callback(new Error("只支持输入英文、数字、下划线，且首字母不能为数字、下划线"));
  } else {
    callback();
  }
}
export function validatePageLabel(rule, value, callback) {
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(value)) {
    callback(new Error("只支持输入英文和数字，且首字母不能为数字"));
  } else {
    callback();
  }
}
export function validateApplicationSize(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(new Error("输入不能为空"));
  } else {
    if (isNaN(Number(value))) {
      callback(new Error("输入应该为数字"));
    } else if (value < 0) {
      callback(new Error("输入应该大于等于0"));
    } else if (value % 1 !== 0) {
      callback(new Error("应该为整数"));
    } else if (Number(value) < 200) {
      callback(new Error("最小值不能低于200"));
    } else {
      callback();
    }
  }
}
export function validateVariableName(rule, value, callback) {
  const javascriptKeywords = [
    "break", "case", "catch", "class", "const", "continue", "debugger", "default",
    "delete", "do", "else", "export", "extends", "finally", "for", "function",
    "if", "import", "in", "instanceof", "let", "new", "return", "super", "switch",
    "this", "throw", "try", "typeof", "var", "void", "while", "with", "yield",
    "enum", "await", "implements", "package", "protected", "static", "interface",
    "public", "private"
  ];
  if (value === "") {
    callback(new Error("变量名称不能为空"));
  } else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(value)) {
    callback(new Error("只能输入英文+数字，且不以数字开头"));
  } else if (javascriptKeywords.includes(value)) {
    callback(new Error("输入不能为编程语言关键字"));
  } else {
    callback();
  }
}