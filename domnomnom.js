(function() {

    $.fn.domnomnom = function domnomnom(data) {

        // TODO: Figure out what this was supposed to be
        if (arguments.length == 2) {
            var data_obj = {};
            data_obj[arguments[0]] = arguments[1];
            return $(this).domnomnom(data_obj);
        }

        // Look for template usages and load templates
        $(this).each(function(){
            $(this).find('[data-template]').each(function(){
                var template = $(this);
                template.html(template.siblings(template.attr('data-template')).html());
                template.removeAttr('data-template');
            });
        });

        $(this).each(function(){
            // For each element matched, populate with data
            var template = $(this)
            ,   copy = template.clone()
            ;

            // Strings set textnode directly
            if (typeof data === "string") {
                copy.text(data);
            // Arrays act as a sequence of calls with each item
            } else if ($.isArray(data)) {
                $.each(data, function(i, value) {
                    template.domnomnom(value);
                })
                return;
            // Objects match inner nodes to other data
            } else {
                console.log(copy, data);
                $.each(data, function(key, value) {
                    // This is where renames can happen.
                    var ref = copy.attr('data-rename-' + key);
                    copy.removeAttr('data-rename-' + key);
                    if (ref) {
                        key = ref;
                    }

                    // selector/attr is used to target attributes directly
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
                    // Finally, find the child and fill with data
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
