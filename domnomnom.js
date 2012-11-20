(function() {

    $(function(){
        // Look for template usages and load templates
        $(this).each(function(){
            $(this).find('[data-template]').each(function(){
                var template = $(this);
                var match = template.data('template');
                var source = [];
                var P = template;
                while (source.length === 0 && P[0] !== document) {
                    P = P.parent();
                    source = P.find(match);
                }
                template.html(source.eq(0).html());
                template.data(source.eq(0).data());
                template.removeAttr('data-template');
            });
        });
    });

    $.fn.domnomnom = function domnomnom(data) {

        // TODO: Figure out what this was supposed to be
        if (arguments.length == 2) {
            var data_obj = {};
            data_obj[arguments[0]] = arguments[1];
            return $(this).domnomnom(data_obj);
        }

        $(this).each(function(){
            // For each element matched, populate with data
            var template = $(this)
            ,   copy = template.clone()
            ,   applyinner = template.data('applyinner')
            ;

            if (!!applyinner) {
                template.find(applyinner).domnomnom(data);
            } else {

                var datatype = template.data('type');
                if (datatype == 'date') {
                    var ts = Date.parse(data);
                    data = new Date(ts);
                }

                // If the template defines a method, call it
                var call = template.data('call')
                if (call) {
                    data = data[call].call(data);
                }

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
                    $.each(data, function(key, value) {

                        // This is where renames can happen.
                        var ref = copy.data('rename-' + key);
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

                if (template.data('clone') == ':after') {
                    //template.parent().append(copy);
                    template.after(copy);
                } else if (template.data('clone') == ':before') {
                    copy.removeClass('clone-before');
                    template.before(copy);
                } else { // implies data-clone=replace
                    template.replaceWith(copy);
                }

                copy.removeAttr('data-clone');
                copy.removeClass('slot');
            }
        });

        return $(this);
    };

})();
