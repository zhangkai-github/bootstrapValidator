# bootstrapValidator
一个简单的表单校验js

Must import files：
1.bootstrap.css，link：https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css
2.jquery.js，link：https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js

Support for custom configuration，可以在index.html中script的extendRules添加需要检验的名称和检验规则，也可以在js中的规则引擎处进行自定义配置，
规则校验的优先级为data-bv-**》extendRules》规则引擎
