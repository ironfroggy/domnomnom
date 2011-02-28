$.fn.domnomnom = function domnomnom(data) {
    var result = $();
    function add_result(r) {
        result = result.add(r);
    }

    $(this).each(function(){
        var el = $(this);
        if (typeof data === "string") {
            el.text(data);
        } else {
            $.each(data, function(key, value) {
                el.find(key).domnomnom(value);
            })
        }
    });

    return result;
};
