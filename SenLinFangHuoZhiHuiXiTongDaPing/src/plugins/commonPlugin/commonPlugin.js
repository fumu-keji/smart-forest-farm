/**
 * Created by csz on 2023/06/16.
 */
import { nextTick } from "vue";
import { app } from "@/main";
import CryptoJS from "crypto-js";
import merge from "lodash/merge";
import { isEmpty } from "@/utils/functionUtil";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { APPLICATION_TYPE, PROJECT_KEY } from "@config/ip";
const ElementPlusIcons = [];
for (const [key] of Object.entries(ElementPlusIconsVue)) {
  ElementPlusIcons.push({ value: key });
}
// 表格相关方法
const tableUtils = {
  // 处理排序
  orderTransform(order) {
    return order === "ascending" ? "ASC" : "DESC";
  },
  // 通用处理表格头和表格列的方法
  setTableCellStyle(settingData, column, row) {
    const type = Array.isArray(row) ? "header" : "body";
    let fontSizeKey, colorKey, resultStyle;
    if (type === "header") {
      resultStyle = {};
      fontSizeKey = "headerFontSize";
      colorKey = "headerColor";
    } else {
      resultStyle = {};
      fontSizeKey = "columnFontSize";
      colorKey = "columnColor";
    }
    // 勾选，序号，操做栏设置样式
    if (column.type === "index" || column.type === "operateButton") {
      // 找到当前的表格内设置样式
      settingData.forEach(item => {
        if (item.type === column.type) {
          resultStyle["font-size"] = item[fontSizeKey] && `${item[fontSizeKey]}px`;
          resultStyle["color"] = item[colorKey];
        }
      });
    } else {
      // 找到当前的表格内设置样式
      settingData.forEach(item => {
        if (item.prop === column.property) {
          resultStyle["font-size"] = item[fontSizeKey] && `${item[fontSizeKey]}px`;
          resultStyle["color"] = item[colorKey];
        }
      });
    }
    return resultStyle;
  },
  // 表格列渲染的自定义的组件
  setTableColumnCompName(valueType) {
    const componentNameObject = {
      text: "TableTextComponent",
      iconText: "TableIconTextComponent",
      imageText: "TableImageTextComponent",
      tagText: "TableTagTextComponent",
      processText: "TableProcessTextComponent",
      dynamicImage: "TableDynamicImageComponent",
      file: "TableFileComponent",
      dictionary: "TableDictionaryComponent",
      textClick: "TableTextClickComponent"
    };
    return componentNameObject[valueType] || "";
  },
  // 表格列自定义表格配置的组件的样式设置
  setConfigureComponentStyle(align) {
    const alignObject = {
      left: "flex-start",
      center: "center",
      right: "flex-end"
    };
    return { "justify-content": alignObject[align] };
  },
  // 设置表格文件相关信息
  setTableFileInfo(tableList, fileIdProp) {
    let fileIds = tableList.map(item => item[fileIdProp]).join(",");
    app.config.globalProperties.$getDataAxios.getUrlByFileId(fileIds).then(res => {
      if (res.data) {
        let fileList = res.data;
        tableList.forEach(item => {
          let file = fileList.find(i => i.id === item[fileIdProp]);
          item[fileIdProp + "FileName"] = file.name;
        });
      }
    });
  },
  calculateSpans(spanMap, tableColumnData, tableData) {
    tableColumnData.forEach(prop => {
      const spans = [];
      let count = 1;  // 当前连续相同值计数
      let startIndex = 0;  // 当前合并段起始位置
      // 初始化数组（默认每行单独显示）
      for (let i = 0; i < tableData.length; i++) {
        spans[i] = 1;
      }
      // 从第1行开始比较
      for (let i = 1; i <= tableData.length; i++) {
        // 检查是否连续相同
        if (i < tableData.length
          && tableData[i][prop] === tableData[i - 1][prop]) {
          count++;
          continue;
        }
        // 设置合并段：起始行合并行数，后续行标记0
        if (count > 1) {
          spans[startIndex] = count;  // 设置起始行合并数
          for (let j = startIndex + 1; j < startIndex + count; j++) {
            spans[j] = 0;  // 标记被合并的行
          }
        }
        // 重置计数器
        startIndex = i;
        count = 1;
      }
      spanMap[prop] = spans;
    });
  },
  setSpanMerge(spanMap, tableColumnData, { row, column, rowIndex, columnIndex }) {
    // 基础列不合并
    if (column.type === "index" || column.type === "selection" || column.type === "operateButton") { return; }
    let prop = column.property;
    if (tableColumnData.findIndex(i => i === prop) > -1) {
      return {
        rowspan: spanMap[prop][rowIndex],
        colspan: 1
      };
    }
  }
};
// 表单容器相关方法
const formContainerUtils = {
  // 设置历史表单的值得回显
  async setHistoryFormData(flowData, formContainer) {
    await nextTick();
    const formKeyList = flowData.formKeyList;
    formContainer.activeNames = [];
    formKeyList.forEach(async (formKeyData, index) => {
      const formKey = `${formKeyData.formKey}${index}`;
      // 先展开 再赋值，移动端折叠面板展开后才能获取到ref
      if (flowData.finished === "1") {
        formContainer.activeNames.push(formKey);
      } else if (index === formKeyList.length - 1) {
        formContainer.activeNames.push(formKey);
      }
      await nextTick();
      // 给对应的表单进行赋值
      if (formContainer.$refs[formKey]) {
        let formParam;
        let refs = null;
        if (Array.isArray(formContainer.$refs[formKey])) {
          formParam = formContainer.$refs[formKey][0].formParam;
          refs = formContainer.$refs[formKey][0].$refs;
        } else {
          formParam = formContainer.$refs[formKey].formParam;
          refs = formContainer.$refs[formKey].$refs;
        }
        formContainerUtils.assignHistoryFormObject(formParam, formKeyData.formData);
        // 清除表单校验
        await nextTick();
        if (APPLICATION_TYPE === "h5") {
          Object.keys(refs).forEach(ref => {
            if (ref.includes("dynamic_form")) {
              refs[ref].vantDynamicFormRef.resetValidation();
            } else if (ref.includes("one_to_many")) {
              refs[ref].vantOneToManyRef.resetValidation();
            } else if (ref.includes("form")) {
              refs[ref].formRef.resetValidation();
            }
          });
        } else {
          Object.keys(refs).forEach(ref => {
            if (ref.includes("dynamic_form")) {
              refs[ref].dynamicFormRef.clearValidate();
            } else if (ref.includes("one_to_many")) {
              refs[ref].oneToManyRef.clearValidate();
            } else if (ref.includes("form")) {
              refs[ref].formRef.clearValidate();
            }
          });
        }

      }
    });
  },
  // 给表单容器中的每一个历史表单进行赋值
  assignHistoryFormObject(target, source) {
    target = merge(target, source);
  }
};
// 加密解密相关
const secretUtil = {
  // AES加密
  Encrypt: function (word, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse("1631503872411567");
    let iv = CryptoJS.enc.Utf8.parse("1631503872411567");
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },
  // AES解密
  Decrypt: function (word, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse("1631503872411567");
    let iv = CryptoJS.enc.Utf8.parse("1631503872411567");
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);
    let decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
};
// 公用方法
const objectUtil = {
  // 判断元素是否为空
  isEmpty(value) {
    // 判断res.data.list是否为空
    if (Object.prototype.toString.apply(value) === "[object Object]" && value.hasOwnProperty("list")
      && (value.list === undefined || value.list === null || value.list.length === 0)) {
      return true;
    }
    // 对象和数组判断是否为空
    if (
      Object.prototype.toString.apply(value) === "[object Array]"
      || Object.prototype.toString.apply(value) === "[object Object]"
    ) {
      if (
        value === undefined
        || value === "undefined"
        || value === null
        || value === "null"
        || value.length === 0
      ) {
        return true;
      } else {
        return false;
      }
      // 字符串判断是否为空
    } else if (
      value === undefined
      || value === "undefined"
      || value === ""
      || value === null
      || value === "null"
    ) {
      return true;
    } else {
      return false;
    }
  },
  existDataModelAndField(formData, dataModel, field) {
    if (Object.keys(formData).includes(dataModel)) {
      if (Object.keys(formData[dataModel]).includes(field)) {
        if (!isEmpty(formData[dataModel][field])) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
};

export default {
  install(app) {
    app.config.globalProperties.$setPopperClass = function (size) {
      let className = "";
      if (size) {
        className = `${size}-web-popper`;
      }
      if (APPLICATION_TYPE === "large") {
        className += " large-popper";
      }
      return className;
    };
    // 判断当前icon是否属于element plus
    app.config.globalProperties.$isElementPlusIcons = function (name) {
      return ElementPlusIcons.findIndex(item => item.value === name) !== -1;
    };
    // 处理静态资源或者oss的地址
    app.config.globalProperties.$setAssetType = function (value) {
      if (value.indexOf("http") !== -1) {
        return value;
      } else if (!isEmpty(value)) {
        try {
          return new URL(`../../assets/staticFile/${value}`, import.meta.url).href;
        } catch {
          return "";
        }
      } else {
        return "";
      }
    };
    // 下载线上文件
    app.config.globalProperties.$exportFile = function (url, fileName) {
      fetch(url).then(response => response.blob()).then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(err => {
        this.$getDataAxios.notifyError(err);
      });
    };
    // 下载本地文件
    app.config.globalProperties.$exportStaticFile = function (fileName) {
      const fileUrl = new URL(`../../assets/staticFile/${fileName}`, import.meta.url).href;
      // 创建一个a标签模拟点击进行下载
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    // 生成一个不重复的数字ID，长度为16位
    app.config.globalProperties.$generateId = function () {
      let p = new Date().getTime().toString();
      let m = Math.random().toString().slice(2, 5);
      return p + m;
    };
    // 深度拷贝
    app.config.globalProperties.$deepClone = function (source) {
      return JSON.parse(JSON.stringify(source));
    };
    // 对象扩展运算符
    app.config.globalProperties.$spreadObject = function (...objects) {
      const mergedObj = Object.assign({}, ...objects);
      return { ...mergedObj };
    };
    // 数组扩展运算符
    app.config.globalProperties.$spreadArray = function (...arrays) {
      return [].concat(...arrays);
    };
    // 根据calssName修改dom样式
    app.config.globalProperties.$modifyStyle = function (className, style) {
      let dom = document.body.getElementsByClassName(className)[0];
      if (!dom) { return; }
      if (!isEmpty(style)) {
        Object.keys(style).forEach(key => {
          if (style[key]) {
            dom.style[key] = style[key];
          }
        });
      }
    };
    // 操作组件属性
    app.config.globalProperties.$modifyAttr = function (tagComp, prop, value) {
      if (!tagComp) { return; }
      tagComp[prop] = value;
    };
    // 处理相关表单组件数据绑定的optionItem的获取
    app.config.globalProperties.$getOptionItem = function (setting, resultItem, type) {
      const { bindType } = setting;
      // 数据字典：请求字典数据后赋值
      if (bindType === "dictionary") {
        resultItem.length = 0;
        return app.config.globalProperties.$getDataAxios.getDictionaryItemByCode({ code: setting.dictionaryCode }).then(res => {
          res.data.forEach(item => {
            resultItem.push({ name: item.name, value: item.value });
          });
        }).catch(err => {
          app.config.globalProperties.$getDataAxios.notifyError(err);
        });
      }
      // 动态数据：调用指定数据模型的列表Api
      if (bindType === "dataModel" && Object.keys(app.config.globalProperties.$getDataAxios).includes(setting.requestApi)) {
        resultItem.length = 0;
        let filterParam = setting.filterParam ? setting.filterParam : { pageSize: 0 };
        return app.config.globalProperties.$getDataAxios[setting.requestApi](filterParam).then(res => {
          if (!isEmpty(res.data)) {
            let list = Object.prototype.toString.apply(res.data) === "[object Array]" ? res.data : res.data.list;
            list.forEach(item => {
              let resultObject = {
                name: item[setting.labelProperty],
                value: item[setting.valueProperty]
              };
              if (item.children) {
                resultObject.children = convertToTree(item.children, setting.labelProperty, setting.valueProperty);
              }
              resultItem.push(resultObject);
            });
            if (type === "tree") {
              transformTreeData(resultItem);
            }
          }
        }).catch(err => {
          app.config.globalProperties.$getDataAxios.notifyError(err);
        });
      }
    };
    // 过滤级联相关节点数据
    function transformTreeData(data) {
      if (isEmpty(data)) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length === 0) {
          delete data[i].children;
        } else {
          transformTreeData(data[i].children);
        }
      }
      return data;
    }
    // 树结构数据转换
    function convertToTree(data, name, value) {
      function buildTree(obj) {
        let node = {
          name: obj[name],
          value: obj[value],
          children: []
        };
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach(child => {
            node.children.push(buildTree(child));
          });
        }
        return node;
      }
      let result = [];
      data.forEach(item => {
        result.push(buildTree(item));
      });
      return result;
    }
    // 处理图表的数据绑定的数据回显
    app.config.globalProperties.$getChartOptionItem = function (setting, resultItem) {
      // 动态数据：调用指定数据模型的列表Api
      if (Object.keys(app.config.globalProperties.$getDataAxios).includes(setting.requestApi)) {
        app.config.globalProperties.$openLoading();
        return app.config.globalProperties.$getDataAxios[setting.requestApi]().then(res => {
          if (!isEmpty(res.data)) {
            let list = Object.prototype.toString.apply(res.data) === "[object Array]" ? res.data : res.data.list;
            list.forEach(item => {
              resultItem.push({
                name: item[setting.nameProperty],
                value: item[setting.valueProperty],
                catalog: item[setting.catalogProperty],
                type: item[setting.typeProperty],
                max: item[setting.maxProperty]
              });
            });
          }
        }).catch(err => {
          app.config.globalProperties.$getDataAxios.notifyError(err);
        }).finally(() => {
          app.config.globalProperties.$closeLoading();
        });
      }
    };
    // 计算卡片列表组件卡片样式
    app.config.globalProperties.$cardStyle = function (cardGutter = 0, rowNumber = 4, cardHeghit = 200, cardBorderRadius = 0) {
      return {
        width: `calc(${(100 / parseInt(rowNumber)).toFixed(2)}% - ${cardGutter}px)`,
        height: `${cardHeghit}px`,
        margin: `${parseInt(cardGutter) / 2}px`,
        borderRadius: `${cardBorderRadius}px`
      };
    };
    // 验证WEB表单是否通过验证
    app.config.globalProperties.$checkForm = function (validateForm, type = "form") {
      return new Promise((resolve, reject) => {
        if (!validateForm) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
        }
        // 验证普通表单
        if (type === "form") {
          validateForm.formRef.validate(valid => {
            if (valid) {
              resolve();
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject();
            }
          });
        }
        // 验证动态表单
        if (type === "dynamicForm") {
          // 如果动态表单没有数据只要是必要时才验证失败
          if (validateForm.formTableData.tableList.length === 0) {
            if (!validateForm.necessary) {
              resolve();
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject();
            }
          } else {
            validateForm.dynamicFormRef.validate(valid => {
              if (valid) {
                resolve();
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject();
              }
            });
          }
        }
        // 验证一对多组件
        if (type === "oneToMany") {
          if (validateForm.formTableData.tableList.length === 0) {
            if (!validateForm.necessary) {
              resolve();
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject();
            }
          } else {
            validateForm.oneToManyRef.validate(valid => {
              if (valid) {
                resolve();
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject();
              }
            });
          }
        }
      });
    };
    // 验证APP表单是否通过验证
    app.config.globalProperties.$vantCheckForm = function (validateForm, type = "vantForm") {
      return new Promise((resolve, reject) => {
        if (!validateForm) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
        }
        if (type === "vantForm") {
          validateForm.formRef.validate().then(() => {
            resolve();
          }).catch(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject();
          });
        }
        if (type === "vantDynamicForm") {
          if (validateForm.formTableData.tableList.length === 0) {
            if (!validateForm.necessary) {
              resolve();
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject();
            }
          } else {
            validateForm.vantDynamicFormRef.validate().then(() => {
              resolve();
            }).catch(() => {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject();
            });
          }
        }
        if (type === "vantOneToMany") {
          if (validateForm.formTableData.tableList.length === 0) {
            if (!validateForm.necessary) {
              resolve();
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject();
            }
          } else {
            validateForm.vantOneToManyRef.validate().then(() => {
              resolve();
            }).catch(() => {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject();
            });
          }
        }
      });
    };
    // 获取全局存储的用户信息
    app.config.globalProperties.$getUserInfoItem = function (key) {
      if (!localStorage.getItem(PROJECT_KEY)) { return ""; }
      let userInfo = JSON.parse(localStorage.getItem(PROJECT_KEY));
      return userInfo[key] || "";
    };
    // 更新全局存储的用户信息
    app.config.globalProperties.$setUserInfoItem = function (key, value) {
      let userInfo = localStorage.getItem(PROJECT_KEY) || {};
      userInfo[key] = value;
      localStorage.setItem(PROJECT_KEY, JSON.stringify(userInfo));
    };
    // 清除全局存储的用户信息
    app.config.globalProperties.$clearUserInfo = function () {
      localStorage.removeItem(PROJECT_KEY);
    };
    // 获取当前日期（yyyy-MM-dd）
    app.config.globalProperties.$getCurrentDate = function () {
      let date = new Date();
      return formatDate(date);
    };
    // 获取当前日期时间（yyyy-MM-dd hh:mm:ss）
    app.config.globalProperties.$getCurrentDateTime = function () {
      let date = new Date();
      return [
        formatDate(date),
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(":"),
      ].join(" ");
    };
    // 补齐两位数
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }
    // 日期转化为字符串横杠分隔
    function formatDate(date) {
      return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-");
    }
    // 集合处理插件挂载
    app.config.globalProperties.$tableUtils = tableUtils;
    app.config.globalProperties.$formContainerUtils = formContainerUtils;
    app.config.globalProperties.$secretUtil = secretUtil;
    app.config.globalProperties.$objectUtil = objectUtil;
  },
};