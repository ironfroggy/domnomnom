(function() {

    $.fn.domnomnom = function domnomnom(data) {

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
