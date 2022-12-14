(function(a) {
    a.fn.allofthelights = function(b) {
        var c = {
            color: "#000000",
            opacity: "0.9",
            switch_id: "switch",
            animation: "fade",
            delay_turn_on: 400,
            delay_turn_off: 400,
            scrolling: true,
            clickable_bg: false,
            is_responsive: true,
            z_index: "100001",
            custom_player: null
        };
        var b = a.extend(c, b);
        return this.each(function() {
            function o() {
                e = c.offset();
                f = c.height();
                g = c.width();
                h = a(window).width();
                i = a(document).height();
                j = a("#" + b.switch_id).offset()
            }
            function p() {
                a("#" + b.switch_id + "_off").css({
                    top: j.top,
                    left: j.left
                });
                a("#allofthelights_bg1").css({
                    top: "0px",
                    height: e.top,
                    left: "0px",
                    right: "0px"
                });
                a("#allofthelights_bg2").css({
                    height: f,
                    top: e.top,
                    left: "0px",
                    right: h - e.left
                });
                a("#allofthelights_bg3").css({
                    height: f,
                    top: e.top,
                    right: "0px",
                    bottom: "0px",
                    left: e.left + g
                });
                a("#allofthelights_bg4").css({
                    height: i - (e.top + f),
                    top: e.top + f,
                    bottom: "0px",
                    left: "0px",
                    right: "0px"
                })
            }
            var c = a(this),
            d = true,
            e = null,
            f = null,
            g = null,
            h = null,
            i = null,
            j = null,
            k = "#" + b.switch_id + "_off";
            if (b.is_responsive) {
                var l = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.dailymotion.com']", "iframe[src*='www.kickstarter.com']", "object", "embed"];
                if (b.custom_player) {
                    l.push(b.custom_player)
                }
                var m = a(this).parent().find(l.join(","));
                var n = '<style type="text/css">         				  .fluid_width_video_wrapper {        					 width: 100%;                     					 position: relative;              					 padding: 0;                      				  }                                   													  				  .fluid_width_video_wrapper iframe,  				  .ffluid_width_video_wrapper object,  				  .fluid_width_video_wrapper embed {  					 position: absolute;              					 top: 0;                          					 left: 0;                         					 width: 100%;                     					 height: 100%;                    				  }                                   				</style>';
                a("body").append(n);
                m.each(function() {
                    var b = a(this);
                    if (this.tagName.toLowerCase() == "embed" && b.parent("object").length || b.parent(".fluid_width_video_wrapper").length) {
                        return
                    }
                    var c = this.tagName.toLowerCase() == "object" || b.attr("height") ? b.attr("height") : b.height(),
                    d = b.attr("width") ? b.attr("width") : b.width(),
                    e = c / d;
                    if (!b.attr("id")) {
                        var f = "fitvid" + Math.floor(Math.random() * 999999);
                        b.attr("id", f)
                    }
                    b.wrap('<div class="fluid_width_video_wrapper"></div>').parent(".fluid_width_video_wrapper").css("padding-top", e * 100 + "%");
                    b.removeAttr("height").removeAttr("width")
                })
            }
            if (b.animation == "none") {
                b.delay_turn_on = 0;
                b.delay_turn_off = 0
            }
            if (b.clickable_bg) {
                k += ", div.allofthelights_bg"
            }
            a("body").on("click", k,
            function() {
                o();
                p();
                a("div.allofthelights_bg").fadeOut( + b.delay_turn_off);
                a("#" + b.switch_id + "_off").fadeOut(0);
                if (!b.scrolling) {
                    a("body").css("overflow", "auto")
                }
            }).on("click", "#" + b.switch_id,
            function() {
                o();
                if (d) {
                    d = false;
                    var c = "<style type='text/css'>.allofthelights_bg {display:none;position:absolute;background:" + b.color + ";z-index:" + b.z_index + ";}</style>" + "<div id='" + b.switch_id + "_off' style='display:none;position:absolute;left:" + j.left + "px;'></div>";
                    var e = 0;
                    for (e = 1; e <= 4; ++e) {
                        c += "<div id='allofthelights_bg" + e + "' class='allofthelights_bg'></div>"
                    }
                    a("body").append(c);
                    a(".allofthelights_bg").css("opacity", +b.opacity);
                    p()
                }
                a("#" + b.switch_id + "_off").fadeIn(0);
                a("div.allofthelights_bg").fadeIn( + b.delay_turn_on);
                if (!b.scrolling) {
                    a("body").css("overflow", "hidden")
                }
            });
            a(window).on("resize",
            function() {
                var b = false;
                if (a("div.allofthelights_bg").is(":visible")) {
                    b = true;
                    a("div.allofthelights_bg").hide()
                }
                o();
                p();
                if (b) {
                    a("div.allofthelights_bg").show()
                }
            })
        })
    }
})(jQuery)