$.fn.domnomnom = function domnomnom(data) {
    var result = $();
    function add_result(r) {
        result = result.add(r);
    }

    $(this).each(function(){
        var el = $(this);
        if (typeof data === "string") {
            el.html(data);
        } else {
            $.each(data, function(key, value) {
                console.info(el, key, value);
                if (typeof value === "string") {
                    el.find(key).html(value);
                } else {
                    $.each(value, function(key, value) {
                        var slot = $(key);
                        if (slot.hasClass('clone-after')) {
                            console.log("clone-after", slot, value, slot.parent())
                            slot.clone().domnomnom(value).appendTo(slot.parent());
                        }
                    })
                }
            });
        }
    });

    return result;
};
