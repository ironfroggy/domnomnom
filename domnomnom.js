(function() {

    $.fn.domnomnom = function domnomnom(data) {

        if (arguments.length == 2) {
            var data_obj = {};
            data_obj[arguments[0]] = arguments[1];
            return $(this).domnomnom(data_obj);
        }

        $(this).each(function(){
            $(this).find('[data-template]').each(function(){
                var template = $(this);
                template.html(template.siblings(template.attr('data-template')).html());
                template.removeAttr('data-template');
            });
        });

        $(this).each(function(){
            var template = $(this)
            ,   copy = template.clone()
            ;

            if (typeof data === "string") {
                copy.text(data);
            } else if ($.isArray(data)) {
                $.each(data, function(i, value) {
                    template.domnomnom(value);
                })
                return;
            } else {
                $.each(data, function(key, value) {
                    if (key.indexOf('/') >= 0) {
                        var _ = key.split('/')
                        ,   key = _[0]
                        ,   attribute = _[1]
                        ,   el = copy.find(key)
                        ;

                        if (attribute) {
                            el.attr(attribute, value);
                        } else {
                            $.each(value, function(attribute, value) {
                                el.attr(attribute, value);   
                            });
                        }
                    } else {
                        copy.find(key).domnomnom(value);
                    }
                })
            }

            if (template.attr('data-clone') == ':after') {
                template.parent().append(copy);
            } else if (template.attr('data-clone') == ':before') {
                copy.removeClass('clone-before');
                template.parent().prepend(copy);
            } else { // implies data-clone=replace
                template.replaceWith(copy);
            }

            copy.removeAttr('data-clone');
            copy.removeClass('slot');
        });

        return $(this);
    };

})();
