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
                console.debug(template, template.html());
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
                    //console.debug(copy, key, value);
                    copy.find(key).domnomnom(value);
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
