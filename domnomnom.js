$.fn.domnomnom = function domnomnom(data) {
    var result = $();
    function add_result(r) {
        result = result.add(r);
    }

    $(this).each(function(){
        var el = $(this);
        $.each(data, function(key, value) {
            console.info(el, key, value);
            el.find(key).html(value);
        });
    });

    return result;
};
