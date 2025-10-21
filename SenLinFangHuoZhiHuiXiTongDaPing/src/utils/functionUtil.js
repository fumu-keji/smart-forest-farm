/* eslint-disable operator-linebreak */
// 判断元素是否为空
export function isEmpty(value) {
  // 对象和数组判断是否为空
  if (
    Object.prototype.toString.apply(value) === "[object Array]" ||
    Object.prototype.toString.apply(value) === "[object Object]"
  ) {
    if (
      value === null ||
      value === "null" ||
      value === undefined ||
      value === "undefined" ||
      value.length === 0
    ) {
      return true;
    } else {
      return false;
    }
    // 字符串判断是否为空
  } else if (
    value === "" ||
    value === null ||
    value === "null" ||
    value === undefined ||
    value === "undefined"
  ) {
    return true;
  } else {
    return false;
  }
}
// 深拷贝对象
export function cloneObject(source) {
  return JSON.parse(JSON.stringify(source));
}
// 随机生成一个短的id
export function generateShortStr() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charsArray = chars.split("");
  let result = "";
  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * charsArray.length);
    result += charsArray[randomIndex];
    charsArray.splice(randomIndex, 1);
  }
  return result;
}
// 判断两个元素是否相等
export function isSame(o1, o2, compare = (a, b) => a === b) {
  if (o1 === o2) {
    return true;
  }
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  // 计算相等的属性个数
  let sameParamLen = 0;
  keys1.forEach(prop => {
    if (compare(o1[prop], o2[prop], prop)) {
      sameParamLen += 1;
    }
  });
  if (sameParamLen !== keys2.length) {
    return false;
  }
  return true;
}
// 移除对象内为空的属性
export function removeEmptyProp(source, hasValue) {
  if (typeof source !== "object") {
    return source;
  }
  function defaultValidate(val) {
    return !!val;
  }
  Object.keys(source).forEach(prop => {
    const check = hasValue || defaultValidate;
    if (!check(source[prop], prop)) {
      delete source[prop];
    }
  });
  return source;
}
// 数组的深度拷贝
export function copyArr(arr) {
  let obj = arr instanceof Array ? [] : {};
  for (let i in arr) {
    if (typeof arr[i] == "object" && arr[i] !== undefined) {
      obj[i] = copyArr(arr[i]);
    } else if (typeof arr[i] == "object" && arr[i] == undefined) {
      obj[i] = null;
    } else {
      obj[i] = arr[i];
    }
  }
  return obj;
}
// 字符串转数组
export function strToArray(str) {
  let strs = new Array(); //定义一数组
  if (typeof str == "string") {
    strs = str.split(","); //字符分割
  }
  return strs;
}
// 递归查找树里的某个对象
export function findItemFromTree(arr, k, v) {
  for (const ele of arr) {
    if (ele[k] === v) {
      return ele;
    } else {
      if (ele.children) {
        const res = findItemFromTree(ele.children, k, v);
        if (res) {
          return res;
        }
      }
    }
  }
  return null;
}
// 驼峰转下划线方法
export function humpToHyphen(str = "", splitStr = "-") {
  if (str === "") {
    return "";
  }
  if (typeof str.toLowerCase() !== "string") {
    return "incorrect character type";
  }
  let reg = new RegExp("[A-Z]", "g");
  return str
    .replace(reg, function (match) {
      return splitStr + match.toLowerCase();
    })
    .slice(1);
}
// 下划线转驼峰方法
export function hyphenToHump(str = "", splitStr = "-") {
  if (str === "") {
    return "";
  }
  if (typeof str !== "string") {
    return "incorrect character type";
  }
  let arrStr = str.split(splitStr);
  let newStr = "";
  arrStr.forEach((v, i) => {
    if (v.charCodeAt() == NaN) {
      arrStr.splice(i, 1);
    }
    newStr = newStr + v.substr(0, 1).toUpperCase() + v.substr(1);
  });
  return newStr;
}
// 获取url上的某个参数
export function getQueryVariable(url, variable) {
  let query = url ? url.substring(1) : window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return false;
}
// 字符串转json
export function stringifyJson(json) {
  return JSON.stringify(json, (k, v) => {
    // 将正则对象转换为正则字符串
    if (v instanceof RegExp) {
      return v.toString();
    }
    return v;
  });
}
// 判断是否有这个属性
export function hasInvalidateProp(tar, validate) {
  let msg;
  Object.keys(validate).some(prop => {
    const handler = validate[prop];
    if (typeof handler === "function") {
      msg = handler(tar[prop]);
    } else if (!tar[prop]) {
      msg = validate[prop];
    }
    return !!msg;
  });
  return msg;
}
// 获取两者之间不同的属性
export function getDifferenceProp(news, base) {
  if (!base && !news) {
    throw new Error("getDifferenceProp atleast need 1 arguemnts");
  }
  if (!base) {
    return news;
  }
  if (!news) {
    return base;
  }
  const result = {};
  Object.keys(news).forEach(prop => {
    const p1 = base[prop];
    const p2 = news[prop];
    if (!p1) {
      result[prop] = p2;
    }
    if (p1 !== p2) {
      result[prop] = p2;
    }
  });
  return result;
}
// 随机生成颜色
export function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
}
// 判断文件是不是图片文件
export function isImageFile(fileName) {
  const suffixArr = fileName.split(".");
  const suffix = suffixArr[suffixArr.length - 1];
  const imageSuffix = "jpeg, jpg, png, apng, bmp, svg, gif, webp, tif, pcx, tga, exif, raw, JPEG, JPG, PNG, APNG, BMP, SVG, GIF, WEBP, TIF, PCX, TGA, EXIF, RAW";
  return imageSuffix.includes(suffix);
}
// 下载文件
export function exportFile(res, fileName, fileType) {
  if (!fileName && res.headers["content-disposition"]) {
    let index = res.headers["content-disposition"].indexOf("=") + 1;
    fileName = decodeURI(res.headers["content-disposition"].substring(index));
  }
  if (!fileType) {
    fileType = "application/octet-stream";
  }
  const aLink = document.createElement("a");
  aLink.setAttribute("download", fileName);
  aLink.style.display = "none";
  let binaryData = [];
  binaryData.push(res.data);
  const url = URL.createObjectURL(new Blob(binaryData, { type: fileType }));
  aLink.setAttribute("href", url);
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
  URL.revokeObjectURL(url);
}
/**
 * 显示层级数据
 * @param tree {Array} 树数据
 * @param func {Function} 回调函数
 * @param field {String} 字段名称
 * @param path {Array} 路径数据
 * @returns {*[]|[]|*}
 */
export function treeFindPath(tree, func, field = "", path = []) {
  if (!tree) { return []; }
  for (const data of tree) {
    field === "" ? path.push(data) : path.push(data[field]);
    if (func(data)) { return path; }
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, field, path);
      if (findChildren.length) { return findChildren; }
    }
    path.pop();
  }
  return [];
}
// 生成随机字符串
export function generateIdStr() {
  let p = new Date().getTime().toString(36);
  let m = Math.random().toString().slice(2, 9);
  return p + Number(m).toString(36);
}
// 事件id转换方法
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
// 生成随机token
export function getRandomString(len) {
  let _charStr = "abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789",
    min = 0,
    max = _charStr.length - 1,
    _str = "";                    //定义随机字符串 变量
  //判断是否指定长度，否则默认长度为15
  len = len || 15;
  //循环生成字符串
  for (var i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc);
    })(function (min, max, i, _self) {
      // eslint-disable-next-line no-mixed-operators
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
        numStart = _charStr.length - 10;
      if (i == 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self);
      }
      return indexTemp;
    }, i);
    _str += _charStr[index];
  }
  return _str;
}
// 处理echart图的属性
export function setEchartCommonOption(Attr, option) {
  // 设置图例
  option.legend.show = Attr.showLegend;
  option.legend.orient = Attr.legendOrient;
  option.legend.left = Attr.legendLeft ? `${Attr.legendLeft}%` : "left";
  option.legend.top = Attr.legendTop ? `${Attr.legendTop}%` : "1%";
  option.legend.textStyle.fontSize = Attr.legendFontSize || 14;
  option.legend.textStyle.color = Attr.legendColor;
  option.legend.textStyle.rich = { a: { verticalAlign: "middle" } };
  option.legend.textStyle.padding = [0, 0, -2, 0];
  // 设置标题
  option.title.show = Attr.showTitle;
  option.title.text = Attr.titleText;
  option.title.textStyle.fontSize = Attr.titleFontSize || 18;
  option.title.textStyle.color = Attr.titleColor;
  option.title.left = Attr.titleLeft ? `${Attr.titleLeft}%` : "center";
  option.title.top = Attr.titleTop ? `${Attr.titleTop}%` : "auto";
  // 设置工具
  option.toolbox.show = Attr.showToolbox;
  option.toolbox.orient = Attr.toolboxOrient;
  if (Attr.toolboxRight) {
    option.toolbox.right = `${Attr.toolboxRight}%`;
  } else {
    option.toolbox.left = "right";
  }
  option.toolbox.top = Attr.toolboxTop ? `${Attr.toolboxTop}%` : "top";
  // 设置提示
  option.tooltip.show = Attr.showTooltip;
  // 设置图表位置
  if (option.grid) {
    option.grid.left = `${Attr.gridLeft || 12}%`;
    option.grid.right = `${Attr.gridRight || 10}%`;
    option.grid.top = `${Attr.gridTop || 20}%`;
    option.grid.bottom = `${Attr.gridBottom || 10}%`;
  }
  return option;
}
// 处理highchart图的属性
export function setHighChartCommonOption(Attr, option) {
  // 设置图例
  option.legend.enabled = Attr.showLegend;
  option.legend.layout = Attr.legendOrient;
  option.legend.align = Attr.legendAlign;
  option.legend.verticalAlign = Attr.legendVerticalAlign;
  option.legend.x = Attr.legendLeft ? parseInt(Attr.legendLeft) : "";
  option.legend.y = Attr.legendTop ? parseInt(Attr.legendTop) : "";
  option.legend.itemStyle = {
    fontSize: Attr.legendFontSize ? `${Attr.legendFontSize}px` : "",
    color: Attr.legendColor ? Attr.legendColor : ""
  };
  // 设置标题
  option.title.text = Attr.showTitle ? Attr.titleText : "";
  option.title.align = Attr.titleAlign;
  option.title.verticalAlign = Attr.titleVerticalAlign;
  option.title.x = Attr.titleLeft ? parseInt(Attr.titleLeft) : "";
  option.title.y = Attr.titleTop ? parseInt(Attr.titleTop) : "";
  option.title.style = {
    fontSize: Attr.titleFontSize ? `${Attr.titleFontSize}px` : "",
    color: Attr.titleColor ? Attr.titleColor : ""
  };
  // 设置工具
  option.exporting.enabled = Attr.showToolbox;
  // 设置提示
  option.tooltip.enabled = Attr.showTooltip;
  // 设置图表位置
  option.chart.marginLeft = parseInt(Attr.marginLeft) || "";
  option.chart.marginRight = parseInt(Attr.marginRight) || "";
  option.chart.marginTop = parseInt(Attr.marginTop) || "";
  option.chart.marginBottom = parseInt(Attr.marginBottom) || "";
  return option;
}
// 设置echart图的默认属性
export function setChartAttribute(attrs, defaultAttrs) {
  let resultAttrs = {};
  Object.keys(defaultAttrs).forEach(key => {
    if (attrs.hasOwnProperty(key)) {
      resultAttrs[key] = attrs[key];
    } else {
      resultAttrs[key] = defaultAttrs[key];
    }
  });
  return resultAttrs;
}
