$.fn.domnomnom = function domnomnom(data) {
    var result = $();
    function add_result(r) {
        result = result.add(r);
    }

    $(this).each(function(){
        var template = $(this)
        ,   copy = template.clone()
        ;
        if (typeof data === "string") {
            copy.text(data);
        } else {
            $.each(data, function(key, value) {
                copy.find(key).domnomnom(value);
            })
        }

        if (template.hasClass('clone-after')) {
            template.parent().append(copy);
        } else {
            template.replaceWith(copy);
        }
    });

    return result;
};
