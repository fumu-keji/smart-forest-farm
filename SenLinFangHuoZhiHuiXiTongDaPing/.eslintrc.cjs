/* eslint-disable indent */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        /**** 代码质量控制 ****/
        /**
         * 正式环境不容许出现debugger
         */
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        /**
         * 不能存在多个相同的变量命名
         * readonly: this.readonly,readonly: true bad
         */
        "no-dupe-keys": 2,
        /**
         * 强制把变量的使用限制在其定义的作用域范围内
         */
        "block-scoped-var": 2,
        /**
         * 控制语句使用括号
         * if (ture) { var test = 2 }; good
         * if (ture) var test = 2; bad
         */
        "curly": 2,
        /**
         * 禁止使用alert
         */
        "no-alert": 2,
        /**
         * 在全局范围内使用变量声明和 function 声明
         */
        "no-implicit-globals": 2,
        /**
         * 禁止循环中出现 function 声明和表达式
         */
        "no-loop-func": 2,
        /**
         * 要求使用 Error 对象作为 Promise 拒绝的原因
         */
        "prefer-promise-reject-errors": 2,
        /**** 风格指南 ****/
        /**
         * 禁止出现空语句块
         * function() {} good
         * function() {
         * 
         * } bad
         */
        // 导出代码后台生成，改规则暂时不加
        "no-empty": 0,
        /**
         * 箭头函数单个参数不使用括号包裹
         * item => {} good
         * (item) => {} bad
         * (item, index) => {} good
         * item, index => bad
         */
        "arrow-parens": [2, "as-needed"],
        /**
         * 函数后面不容许有空格
         * function() {} good
         * function  () {} bad
         */
        "space-before-function-paren": [
            2,
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always"
            }
        ],
        /**
         * 数组内部不容许出现空格
         * let array = [1, 2, 3] good
         * let array = [ 1, 2, 3 ] bad
         */
        "array-bracket-spacing": [2, "never"],
        /**
         * 代码块换行风格
         * if () {
         *   // dosomething
         * } else {
         *   // dosomething
         * } good
         * if () {
         *   // dosomething
         * } 
         * else {
         *   // dosomething
         * } bad
         */
        "brace-style": [2, "1tbs", { allowSingleLine: true }],
        /**
         * 在逗号后使用空格
         * let array = [1, 2, 3], let number = 2 good
         * let array = [ 1, 2, 3],let number = 2 bad
         */
        "comma-spacing": [2, { before: false, after: true }],
        /**
        * 逗号在末尾
        * let foo = 1,
        *  bar = 2; good
        * let foo = 1
        * ,
        *  bar = 2; bad
        */
        "comma-style": [2, "last"],
        // 缩进2个空格
        "indent": [2, 2, { SwitchCase: 1 }],
        /**
         * 对象字面量键值空格
         * let foo = { a: 1, b:2 } good
         * let foo = {a: 1, b:2} bad
         */
        "key-spacing": [2, { mode: "minimum" }],
        /**
        * 关键字前后空格
        * if () {
        *   // dosomething
        * } else {
        *   // dosomething
        * } good
        * if () {
        *   // dosomething
        * }else {
        *   // dosomething
        * } bad
        */
        "keyword-spacing": 2,
        // 块语句最大深度为4
        "max-depth": [2, 4],
        // 回调函数深度最大为10
        "max-nested-callbacks": [2, 10],
        /**
         * 混合使用不同的操作符 需要使用括号
         * let foo = a && b || c || d; good
         * let foo = (a && b) || c || d bad
         */
        // 混合使用不同的操作符 需要使用括号
        "no-mixed-operators": 2,
        /**
         * 属性前有空白 需要使用括号
         * object.foo good
         * object. foo bad
         */
        "no-whitespace-before-property": 2,
        // 花括号内一致的空格  never|always
        "object-curly-spacing": ["error", "always"],
        //
        /**
         * 换行操作符在前面
         * let foo = a + b
         * + c good
         * let foo = a + b +
         * c bad
         */
        "operator-linebreak": [2, "before"],
        // 尽量使用双引号 特殊情况下反勾号 也可使用
        "quotes": [1, "double"],
        // 语句末尾有分号
        "semi": [2, "always"],
        /**
         * 分号之后有空格 分号之前没空格
         * let foo = 2; let boo = 3; good
         * let foo = 2;let boo = 3; bad
         * let foo = 2 ; let boo = 3 ; bad
         */
        "semi-spacing": 2,
        // 分号强制在末尾
        "semi-style": 2,
        // 块语句必须总是至少有一个前置空格
        "space-before-blocks": 2,
        // 中缀操作符周围有空格
        "space-infix-ops": 2,
        // 强制一元操作符空格一致性
        "space-unary-ops": 2,
        // switch case语句冒号空格
        "switch-colon-spacing": 2,
        // 删除无效空行
        // "no-multiple-empty-lines": [1, { "max": 0 }],
        /**
         * 代码块前后空格
         * function foo() { return true; } good
         * function foo() {return true;}  bad
         */
        "block-spacing": 2,
        "no-unused-vars": 0,
        "no-undef": 0,
        "no-prototype-builtins": 0,
        "use-isnan": 0,
        "no-useless-escape": 0,
        "no-constant-condition": 0,
        "vue/multi-word-component-names": 0,
        "no-unreachable": 0,
        "no-mixed-operators": 0,
        "vue/valid-v-slot": ["error", {
            "allowModifiers": false
        }]
    }
};
