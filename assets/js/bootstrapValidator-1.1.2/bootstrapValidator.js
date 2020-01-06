(function(global,factory,plug){
    return factory.call(global,global.jQuery,plug);
})(typeof window !== 'undefined' ? window : this,function($,plug){
   
        var __DEFS__ = {
            raise:"keyup"
        };
        //规则引擎
        var __RULES__ = {
            "require":function(){
                return !!this.val();
            },
            "phone":function(){
                var reg = /\d{11}/;
                return reg.test(this.val());
            },
            "email":function(){
                return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.val());
            }
        }
        //创建$插件
        $.fn[plug] = function(ops){
            this.each(function(){
                var $this = $(this);
                $.extend($this,ops);
                $this.raise = $this.data("bv-raise") || $this.raise || __DEFS__.raise;
                var $fields = $this.find("[data-bv=true]");
                $fields.on($this.raise,function(){
                    //目标元素
                    var $field = $(this);
                    var $group = $field.parents(".form-group").removeClass("has-success has-error");
                    $group.find('.help-block').remove();
                    //校验结果
                    var result = true,error = null;
                    $.each(__RULES__,function(rule,valid){
                        if($field.data("bv-" + rule)){
                            result = valid.call($field);
                            if(!result){
                                error = $field.data("bv-" + rule + "-error");
                                $field.after("<span class='help-block'>"+error+"</span>")
                                return false;
                            }
                        }
                    });
                    $group.addClass(result?"has-success":"has-error");
                });
                $this.on("submit",function(){
                    $fields.trigger($this.raise);
                    !$fields.parents('.form-group.has-error').size() && this.submit();                })
                })
            this.extendRules = function(rules){
                $.extend(__RULES__,rules);
            }
            return this;
        }
},"bootstrapValidator");