// переменная мобильные
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

class PopUp {
    
    static prop_init() {
        PopUp.popup_show = false;
    }
    
    static show(title, body, buttons, exec_func) {
        if (!PopUp.popup_show) {
            $.ajax(
                {
                    url: "view/popUpWindow.php",
                    type: 'POST',
                    dataType: "html",
                    success: function (data) {
                        var html = data;
                        
                        PopUp.popup_show = true;
                        
                        $('#modal_cont').html(html);
                        
                        // проверка заголовка
                        if (title == undefined || title == "") {
                            
                            $('.popUpWindow__header').css("display", "none");
                            $("#popup_window_close_absolute").css("display", "block");
                            $('#popup_window_close_absolute').on('click', function () {
                                PopUp.popUp_close();
                            });
                            
                        } else {
                            
                            $('#popUp_title').html(title);
                            $("#popup_window_close_absolute").css("display", "none");
                            $('#popup_window_close').on('click', function () {
                                PopUp.popUp_close();
                            });
                            
                        }
                        // Загрузка тела
                        if (body != undefined) {
                            $.ajax(
                                {
                                    url: body,
                                    type: 'POST',
                                    dataType: "html",
                                    success: function (data) {
                                        
                                        $('#popup_window_body').empty();
                                        $('#popup_window_body').html(data);
                                        
                                        if (exec_func != undefined) {
                                            exec_func();
                                        }
                                    }
                                });
                        }
                        
                        // проверка панели кнопок
                        if (buttons == undefined || buttons == "" || buttons.btn.length == 0) {
                            
                            $('#popup_window_buttons').css("display", "none");
                            
                        } else {
                            
                            $('#popup_window_buttons').empty();
                            
                            for (var i = 0; i < buttons.btn.length; i++) {
                                
                                var btn = document.createElement('button');
                                
                                for (var j = 0; j < buttons.btn[i].class.length; j++) {
                                    
                                    btn.classList.add(buttons.btn[i].class[j]);
                                    
                                }
                                
                                btn.id = buttons.btn[i].ID;
                                btn.onclick = buttons.btn[i].func;
                                
                                var p = document.createElement('p');
                                p.innerText = buttons.btn[i].text;
                                btn.appendChild(p);
                                
                                document.getElementById('popup_window_buttons').appendChild(btn);
                                
                            }
                            
                        }
                        
                        $('#popup_window').css({display: 'flex'}).animate({opacity: '1'});
                        $('html').css({overflow: 'hidden', paddingRight: '0.2rem'});
                    }
                });
        }
    }
    
    static popUp_close() {
        $('#popup_window').css({opacity: '0'});
        
        setTimeout(function () {
            $('#modal_cont').empty();
            $('html').css({overflow: 'unset', paddingRight: '0'});
            PopUp.popup_show = false;
        }, 500);
    }
    
}

$(document).ready(function () {
    var CURSE_MULTIPLY = 1;
    var RUR_CURSE = 0;
    var USD_CURSE = 0;

    var PEOPLE_COUNT = 0;
    var FROM_TITLE = '';
    var TO_TITLE = '';
    var FROM_ID = 0;
    var TO_ID = 0;

    var FROM_KEY = "";
    var TO_KEY = "";

    //console.log("Start load!");

    $(function () {
        $('input[type="phone"]').inputmask({alias: "phone", "clearIncomplete": true});
    });

    scr_h = window.innerHeight;
    scr_w = window.innerWidth;
    $('body').css({'min-height': scr_h, 'max-width': scr_w});

    // FLOWTYPE
    $('body').flowtype({
        minimum: 320,
        maximum: 1920,
        minFont: 10,
        maxFont: 16,
        //fontRatio : 24
    });

    var search_submit = $('#search_submit');
    search_submit.on('click', function (event) {
        if (FROM_ID == 0 || TO_ID == 0) {
            swal({
                type: 'error',
                title: 'Не выбран маршрут, пожалуйста выберите маршрут из выпадающего списка.',
                showConfirmButton: false,
                timer: 2500
            });

            return;
        }

        if (FROM_ID == TO_ID) {
            swal({
                type: 'error',
                title: 'Маршрут совпадает, пожалуйста выберите маршрут из выпадающего списка.',
                showConfirmButton: false,
                timer: 2500
            });

            return;
        }

        load_car();

        close_all();
    });

    loadCurse();

    /*Седан Эконом*/
    function load_car() {
        $.ajax(
            {
                url: "https://exmax.store/tarifs/api/Car/",
                data:
                    {
                        way_fromID: FROM_ID,
                        way_toID: TO_ID
                    },
                type: 'POST',
                dataType: "html",
                success: function (data) {
                    var answer = $.parseJSON(data);

                    if (answer[0] == 1) {
                        if (DEBUG) {
                            console.log("error: " + answer[1]);
                        }
                        return;
                    } else {
                        var params = answer[2];

                        $('#cars_choice').empty();

                        for (var i = 0; i < params.length; i++) {
                            var supplier = params[i];

                            var finalHtml = "";

                            finalHtml += "<div class=\"row search__col\" style=\"padding: 0rem 0.5rem 0.75rem;\">";
                            finalHtml += "<div class=\"col-md-4 search__img\">";
                            finalHtml += "<picture>";
                            finalHtml += "<source srcset=\"img/cars/mini/webp/vios.webp\" type=\"image/webp\">";
                            finalHtml += "<source srcset=\"img/cars/mini/vios_@2x.jpg 2x\" type=\"image/jpg\">";
                            finalHtml += "<img src=\"img/cars/mini/vios.jpg\" type=\"image/jpg\" alt=\"Седан Эконом\">";
                            finalHtml += "</picture>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-5 search__detailBox\">";
                            finalHtml += "<div class=\"detailTitle\">Седан Эконом</div>";
                            finalHtml += "<p>Новые комфортные авто 2017 года! Заказать такси можно по номеру +66945800333 WhatsApp Viber.</p>";
                            finalHtml += "<p>Максимум <strong>4 человека</strong> в автомобиле</p>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-3 search__detailPrice\">";
                            finalHtml += "<div class=\"currencyBlock\">";
                            finalHtml += "<p>" + supplier[1] + " THB</p>";
                            finalHtml += "<p>" + ceil(supplier[1], "USD") + " USD | " + ceil(supplier[1], "RUR") + " RUB</p>";
                            finalHtml += "</div>";
                            finalHtml += "<p>за транспортное средство</p>";
                            finalHtml += "<input class=\"detailBtn\" type=\"button\" id=\"order_taxi_car\" value=\"ВЫБРАТЬ\">";
    
                            finalHtml += "<div class=\"search__social\" style='margin-top: 0.5em;'>";
                            finalHtml += "<p>Заказать через:</p>";
                            finalHtml += "<a id='whatsapp_sedan'>";
                            finalHtml += "<img src='img/svg/whatsApp_round.svg' alt='whatsapp'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='viber_sedan'>";
                            finalHtml += "<img src='img/svg/viber_round.svg' alt='viber'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='telegram_sedan'>";
                            finalHtml += "<img src='img/svg/telegram_round.svg' alt='telegram'>";
                            finalHtml += "</a>";
                            finalHtml += "</div>";
                            
                            finalHtml += "</div>";
                            finalHtml += "</div>";

                            $('#cars_choice').append(finalHtml);

                            $('#order_taxi_car').on('click', function () {
                                form_send('Седан Эконом', supplier[1]);
                            });
                        }
                    }

                    load_minivan();
                },
                error: function (data) {
                    console.log('ERROR \n');
                    console.log(data);
                }
            });
    }

    /*Минивен*/
    function load_minivan() {
        $.ajax(
            {
                url: "https://exmax.store/tarifs/api/Minivan/",
                data:
                    {
                        way_fromID: FROM_ID,
                        way_toID: TO_ID
                    },
                type: 'POST',
                dataType: "html",
                success: function (data) {
                    var answer = $.parseJSON(data);

                    if (answer[0] == 1) {
                        if (DEBUG) {
                            console.log("error: " + answer[1]);
                        }
                        return;
                    } else {
                        var params = answer[2];

                        for (var i = 0; i < params.length; i++) {
                            var supplier = params[i];

                            var finalHtml = "";

                            finalHtml += "<div class=\"row search__col\" style=\"padding: 0rem 0.5rem 0.75rem;\">";
                            finalHtml += "<div class=\"col-md-4 search__img\">";
                            finalHtml += "<picture>";
                            finalHtml += "<source srcset=\"img/cars/mini/webp/minivan.webp\" type=\"image/webp\">";
                            finalHtml += "<source srcset=\"img/cars/mini/minivan_@2x.jpg 2x\" type=\"image/jpg\">";
                            finalHtml += "<img src=\"img/cars/mini/minivan.jpg\" type=\"image/jpg\" alt=\"Минивен\">";
                            finalHtml += "</picture>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-5 search__detailBox\">";
                            finalHtml += "<div class=\"detailTitle\">Минивен</div>";
                            finalHtml += "<p>Новые комфортные авто 2017 года! Заказать такси можно по номеру +66945800333 WhatsApp Viber.</p>";
                            finalHtml += "<p>Максимум <strong>9 человек</strong> в автомобиле</p>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-3 search__detailPrice\">";
                            finalHtml += "<div class=\"currencyBlock\">";
                            finalHtml += "<p>" + supplier[1] + " THB</p>";
                            finalHtml += "<p>" + ceil(supplier[1], "USD") + " USD | " + ceil(supplier[1], "RUR") + " RUB</p>";
                            finalHtml += "</div>";
                            finalHtml += "<p>за транспортное средство</p>";
                            finalHtml += "<input class=\"detailBtn\" type=\"button\" id=\"order_taxi_minivan\" value=\"ВЫБРАТЬ\">";
    
                            finalHtml += "<div class=\"search__social\" style='margin-top: 0.5em;'>";
                            finalHtml += "<p>Заказать через:</p>";
                            finalHtml += "<a id='whatsapp_minivan'>";
                            finalHtml += "<img src='img/svg/whatsApp_round.svg' alt='whatsapp'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='viber_minivan'>";
                            finalHtml += "<img src='img/svg/viber_round.svg' alt='viber'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='telegram_minivan'>";
                            finalHtml += "<img src='img/svg/telegram_round.svg' alt='telegram'>";
                            finalHtml += "</a>";
                            finalHtml += "</div>";
                            
                            finalHtml += "</div>";
                            finalHtml += "</div>";

                            $('#cars_choice').append(finalHtml);

                            $('#order_taxi_minivan').on('click', function () {
                                form_send('Минивен', supplier[1]);
                            });
                        }
                    }

                    load_vip_minivan();
                },
                error: function (data) {
                    console.log('ERROR \n');
                    console.log(data);

                    $('#cars_choice').css('display', 'block');
                }
            });
    }

    /*Vip Минивен*/
    function load_vip_minivan() {
        $.ajax(
            {
                url: "https://exmax.store/tarifs/api/VipMinivan/",
                data:
                    {
                        way_fromID: FROM_ID,
                        way_toID: TO_ID
                    },
                type: 'POST',
                dataType: "html",
                success: function (data) {
                    var answer = $.parseJSON(data);

                    if (answer[0] == 1) {
                        if (DEBUG) {
                            console.log("error: " + answer[1]);
                        }
                        return;
                    } else {
                        var params = answer[2];

                        for (var i = 0; i < params.length; i++) {
                            var supplier = params[i];

                            var finalHtml = "";

                            finalHtml += "<div class=\"row search__col\" style=\"padding: 0rem 0.5rem 0.75rem;\">";
                            finalHtml += "<div class=\"col-md-4 search__img\">";
                            finalHtml += "<picture>";
                            finalHtml += "<source srcset=\"img/cars/mini/webp/vip_minivan.webp\" type=\"image/webp\">";
                            finalHtml += "<source srcset=\"img/cars/mini/vip_minivan_@2x.jpg 2x\" type=\"image/jpg\">";
                            finalHtml += "<img src=\"img/cars/mini/vip_minivan.jpg\" type=\"image/jpg\" alt=\"Vip Минивен\">";
                            finalHtml += "</picture>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-5 search__detailBox\">";
                            finalHtml += "<div class=\"detailTitle\">Vip Минивен</div>";
                            finalHtml += "<p>Новые комфортные авто 2017 года! Заказать такси можно по номеру +66945800333 WhatsApp Viber.</p>";
                            finalHtml += "<p>Максимум <strong>7 человек</strong> в автомобиле</p>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-3 search__detailPrice\">";
                            finalHtml += "<div class=\"currencyBlock\">";
                            finalHtml += "<p>" + supplier[1] + " THB</p>";
                            finalHtml += "<p>" + ceil(supplier[1], "USD") + " USD | " + ceil(supplier[1], "RUR") + " RUB</p>";
                            finalHtml += "</div>";
                            finalHtml += "<p>за транспортное средство</p>";
                            finalHtml += "<input class=\"detailBtn\" type=\"button\" id=\"order_taxi_vip_minivan\" value=\"ВЫБРАТЬ\">";
    
                            finalHtml += "<div class=\"search__social\" style='margin-top: 0.5em;'>";
                            finalHtml += "<p>Заказать через:</p>";
                            finalHtml += "<a id='whatsapp_vip_minivan'>";
                            finalHtml += "<img src='img/svg/whatsApp_round.svg' alt='whatsapp'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='viber_vip_minivan'>";
                            finalHtml += "<img src='img/svg/viber_round.svg' alt='viber'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='telegram_vip_minivan'>";
                            finalHtml += "<img src='img/svg/telegram_round.svg' alt='telegram'>";
                            finalHtml += "</a>";
                            finalHtml += "</div>";
                            
                            finalHtml += "</div>";
                            finalHtml += "</div>";

                            $('#cars_choice').append(finalHtml);

                            $('#order_taxi_vip_minivan').on('click', function () {
                                form_send('Vip Минивен', supplier[1]);
                            });
                        }
                    }

                    load_pickup()
                },
                error: function (data) {
                    console.log('ERROR \n');
                    console.log(data);
                }
            });
    }

    /*Внедорожник*/

    // Пока нет тарифов
    function load_jeep() {
        $.ajax(
            {
                url: "https://exmax.store/tarifs/api/Minivan/",
                data:
                    {
                        way_fromID: FROM_ID,
                        way_toID: TO_ID
                    },
                type: 'POST',
                dataType: "html",
                success: function (data) {
                    var answer = $.parseJSON(data);

                    if (answer[0] == 1) {
                        if (DEBUG) {
                            console.log("error: " + answer[1]);
                        }
                        return;
                    } else {
                        var params = answer[2];

                        for (var i = 0; i < params.length; i++) {
                            var supplier = params[i];

                            var finalHtml = "";

                            finalHtml += "<div class=\"row search__col\" style=\"padding: 0rem 0.5rem 0.75rem;\">";
                            finalHtml += "<div class=\"col-md-4 search__img\">";
                            finalHtml += "<picture>";
                            finalHtml += "<source srcset=\"img/cars/mini/webp/jeep.webp\" type=\"image/webp\">";
                            finalHtml += "<source srcset=\"img/cars/mini/jeep_@2x.jpg 2x\" type=\"image/jpg\">";
                            finalHtml += "<img src=\"img/cars/mini/jeep.jpg\" type=\"image/jpg\" alt=\"Внедорожник\">";
                            finalHtml += "</picture>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-5 search__detailBox\">";
                            finalHtml += "<div class=\"detailTitle\">Внедорожник</div>";
                            finalHtml += "<p>Новые комфортные авто 2017 года! Заказать такси можно по номеру +66945800333 WhatsApp Viber.</p>";
                            finalHtml += "<p>Максимум <strong>9 человек</strong> в автомобиле</p>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-3 search__detailPrice\">";
                            finalHtml += "<div class=\"currencyBlock\">";
                            finalHtml += "<p>" + supplier[1] + " THB</p>";
                            finalHtml += "<p>" + ceil(supplier[1], "USD") + " USD | " + ceil(supplier[1], "RUR") + " RUB</p>";
                            finalHtml += "</div>";
                            finalHtml += "<p>за транспортное средство</p>";
                            finalHtml += "<input class=\"detailBtn\" type=\"button\" id=\"order_taxi_minivan\" value=\"ВЫБРАТЬ\">";
    
                            finalHtml += "<div class=\"search__social\" style='margin-top: 0.5em;'>";
                            finalHtml += "<p>Заказать через:</p>";
                            finalHtml += "<a href=\"view/social/whatsupp/\" target=\"_blank\"";
                            finalHtml += "onclick=\"ym(51784160, 'reachGoal', 'whatsapp'); return true;\">";
                            finalHtml += "<img src='img/svg/whatsApp_round.svg' alt='whatsapp'>";
                            finalHtml += "</a>";
                            finalHtml += "<a href=\"view/social/viber/\" target=\"_blank\"";
                            finalHtml += "onclick=\"ym(51784160, 'reachGoal', 'viber'); return true;\">";
                            finalHtml += "<img src='img/svg/viber_round.svg' alt='viber'>";
                            finalHtml += "</a>";
                            finalHtml += "<a href=\"view/social/telegramm/\" target=\"_blank\"";
                            finalHtml += "onclick=\"ym(51784160, 'reachGoal', 'telegram'); return true;\">";
                            finalHtml += "<img src='img/svg/telegram_round.svg' alt='telegram'>";
                            finalHtml += "</a>";
                            finalHtml += "</div>";
                            
                            finalHtml += "</div>";
                            finalHtml += "</div>";

                            $('#cars_choice').append(finalHtml);

                            $('#order_taxi_minivan').on('click', function () {
                                form_send('Минивен', supplier[1]);
                            });
                        }
                    }

                    load_pickup();
                },
                error: function (data) {
                    console.log('ERROR \n');
                    console.log(data);

                    $('#cars_choice').css('display', 'block');
                }
            });
    }

    /*Пикап*/
    function load_pickup() {
        $.ajax(
            {
                url: "https://exmax.store/tarifs/api/Truck/",
                data:
                    {
                        way_fromID: FROM_ID,
                        way_toID: TO_ID
                    },
                type: 'POST',
                dataType: "html",
                success: function (data) {
                    var answer = $.parseJSON(data);

                    if (answer[0] == 1) {
                        if (DEBUG) {
                            console.log("error: " + answer[1]);
                        }
                        return;
                    } else {
                        var params = answer[2];

                        for (var i = 0; i < params.length; i++) {
                            var supplier = params[i];

                            var finalHtml = "";

                            finalHtml += "<div class=\"row search__col\" style=\"padding: 0rem 0.5rem 0.75rem;\">";
                            finalHtml += "<div class=\"col-md-4 search__img\">";
                            finalHtml += "<picture>";
                            finalHtml += "<source srcset=\"img/cars/mini/webp/pickup.webp\" type=\"image/webp\">";
                            finalHtml += "<source srcset=\"img/cars/mini/pickup_@2x.jpg 2x\" type=\"image/jpg\">";
                            finalHtml += "<img src=\"img/cars/mini/pickup.jpg\" type=\"image/jpg\" alt=\"Пикап\">";
                            finalHtml += "</picture>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-5 search__detailBox\">";
                            finalHtml += "<div class=\"detailTitle\">Пикап</div>";
                            finalHtml += "<p>Новые комфортные авто 2017 года! Заказать такси можно по номеру +66945800333 WhatsApp Viber.</p>";
                            finalHtml += "<p>Максимум <strong>4 человек</strong> в автомобиле</p>";
                            finalHtml += "</div>";
                            finalHtml += "<div class=\"col-md-3 search__detailPrice\">";
                            finalHtml += "<div class=\"currencyBlock\">";
                            finalHtml += "<p>" + supplier[1] + " THB</p>";
                            finalHtml += "<p>" + ceil(supplier[1], "USD") + " USD | " + ceil(supplier[1], "RUR") + " RUB</p>";
                            finalHtml += "</div>";
                            finalHtml += "<p>за транспортное средство</p>";
                            finalHtml += "<input class=\"detailBtn\" type=\"button\" id=\"order_taxi_truck\" value=\"ВЫБРАТЬ\">";
    
                            finalHtml += "<div class=\"search__social\" style='margin-top: 0.5em;'>";
                            finalHtml += "<p>Заказать через:</p>";
                            finalHtml += "<a id='whatsapp_pickup'>";
                            finalHtml += "<img src='img/svg/whatsApp_round.svg' alt='whatsapp'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='viber_pickup'>";
                            finalHtml += "<img src='img/svg/viber_round.svg' alt='viber'>";
                            finalHtml += "</a>";
                            finalHtml += "<a id='telegram_pickup'>";
                            finalHtml += "<img src='img/svg/telegram_round.svg' alt='telegram'>";
                            finalHtml += "</a>";
                            finalHtml += "</div>";
                            
                            finalHtml += "</div>";
                            finalHtml += "</div>";

                            $('#cars_choice').append(finalHtml);

                            $('#order_taxi_truck').on('click', function () {
                                form_send('Пикап', supplier[1]);
                            });
                        }
                    }

                    $('#cars_choice').css('display', 'block');

                    $('html, body').animate({ scrollTop: $('#form_search').offset().top }, 700);
    
                    QrTarget();
    
                },
                error: function (data) {
                    console.log('ERROR \n');
                    console.log(data);

                    $('#cars_choice').css('display', 'block');
                }
            });
    }

    // Анимация полосы на кнопке
    setInterval(function () {
        $('#animate_btn').addClass('animateBtn');
        setTimeout(function () {
            $('#animate_btn').removeClass('animateBtn');
        }, 1500);
    }, 6000);

    //#region ORDER WINDOW
    var date_input = $('#date_input');
    date_input.on('change', function (event) {
        document.getElementById('date').innerHTML = date_input.val();
    });

    var round_date_input = $('#round_date_input');
    round_date_input.on('change', function (event) {
        document.getElementById('round_date').innerHTML = round_date_input.val();
    });

    var name_input = $('#name_input');
    name_input.on('keyup', function (event) {
        document.getElementById('name').innerHTML = name_input.val();
    });

    var phone_input = $('#phone_input');
    phone_input.on('keyup', function (event) {
        document.getElementById('phone').innerHTML = phone_input.val();
    });

    var email_input = $('#email_input');
    email_input.on('keyup', function (event) {
        document.getElementById('email').innerHTML = email_input.val();
    });

    var agreePolicy = $('#agreePolicy');
    agreePolicy.on('click', function (event) {
        //document.getElementById('check_agree').innerHTML = 'check'
    });

    $('#round_input').on('click', function () {
        if ($("#round_input").prop("checked")) {
            $('#round_date_cont').fadeIn();
            $('#round_cont').fadeIn();

            document.getElementById('round_from').innerHTML = document.getElementById('to').innerHTML;
            document.getElementById('round_to').innerHTML = document.getElementById('from').innerHTML;

            $('#round_price').fadeIn();

            var amount = parseInt(document.getElementById('amount').innerHTML);
            document.getElementById('round_amount').innerHTML = "" + amount + " THB";
            calc(amount)
        } else {
            $('#round_date_cont').fadeOut();
            $('#round_cont').fadeOut();
            $('#round_price').fadeOut();

            var amount = parseInt(document.getElementById('amount').innerHTML) * -1;
            calc(amount)
        }
    });

    try {
        $("#date_input").datetimepicker({
            format: 'dd.mm.yyyy hh:ii',
            autoclose: true,
            startDate: new Date(),
            todayBtn: true,
            todayHighlight: true,
            language: 'ru',
            minuteStep: 10
        });

        $('#date_input')
            .datetimepicker()
            .on('changeDate', function (ev) {

                var date = $("#date_input").val();

                $('#round_date_input').datetimepicker('setStartDate', date);
                $("#round_date_input").val("");
            });

        $("#round_date_input").datetimepicker({
            format: 'dd.mm.yyyy hh:ii',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            language: 'ru',
            minuteStep: 10
        });
    } catch (e) {

    }

    function calc(amount) {
        var sum = parseInt(document.getElementById('summ').innerHTML);

        document.getElementById('price_input').value = sum + amount + " THB";
        document.getElementById('summ').innerHTML = sum + amount + " THB";
        document.getElementById('summ_other').innerHTML = ceil(sum + amount, "USD") + " USD | " + ceil(sum + amount, "RUR") + " RUB";
    }
    //#endregion

    //#region SERCH WAY FROM
    var search_from_input = $('#taxi_from_input');
    var search_from_list = $('#taxi_from_list');

    search_from_list.on('click', function (event) {
        if (event.target.tagName == "LI") {
            FROM_ID = event.target.getAttribute('data-id');
            FROM_TITLE = event.target.getAttribute('data-title');

            if (event.target.getAttribute('data-key').includes("Аэропорт")) {
                FROM_KEY = "Air";
            }

            search_from_input.val(event.target.innerHTML);

            close_all();
        }
    });

    search_from_input.on('click', function (event) {
        if($('#taxi_from').css('display') == "block")
        {
            close_all();
            return;
        }

        close_all();
        search("", "from");
    });

    search_from_input.on('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    search_from_input.on('keyup', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }

        search(search_from_input.val(), "from");
    });
    //#endregion

    //#region SERCH WAY TO
    var search_to_input = $('#taxi_to_input');
    var search_to_list = $('#taxi_to_list');

    search_to_list.on('click', function (event) {
        if (event.target.tagName == "LI") {
            TO_ID = event.target.getAttribute('data-id');
            TO_TITLE = event.target.getAttribute('data-title');

            if (event.target.getAttribute('data-key').includes("Аэропорт")) {
                TO_KEY = "Air";
            }

            search_to_input.val(event.target.innerHTML);

            close_all();
        }
    });

    search_to_input.on('click', function (event) {
        if($('#taxi_to').css('display') == "block")
        {
            close_all();
            return;
        }

        close_all();
        search("", "to");
    });

    search_to_input.on('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    search_to_input.on('keyup', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }

        search(search_to_input.val(), "to");
    });
    //#endregion

    //#region SERCH COUNT PEOPLE
    $('#people_count').on('click', function (event) {
        if ($("#mini_modal").css('display') == 'none') {
            $("#mini_modal").css('display', 'block');
        } else {
            close_all();
        }
    });

    $('#adult_plus').on('click', function (event) {
        var count = parseInt(document.getElementById('adult_count').innerHTML);

        count++;

        document.getElementById('adult_count').innerHTML = count;

        calc_all();
    });

    $('#adult_minus').on('click', function (event) {
        var count = parseInt(document.getElementById('adult_count').innerHTML);

        if (count > 1) {
            count--;
        }

        document.getElementById('adult_count').innerHTML = count;

        calc_all();
    });

    $('#child_plus').on('click', function (event) {
        var count = parseInt(document.getElementById('child_count').innerHTML);

        count++;

        document.getElementById('child_count').innerHTML = count;

        calc_all();
    });

    $('#child_minus').on('click', function (event) {
        var count = parseInt(document.getElementById('child_count').innerHTML);

        if (count > 0) {
            count--;
        }

        document.getElementById('child_count').innerHTML = count;

        calc_all();
    });

    function calc_all() {
        var adult_count = parseInt(document.getElementById('adult_count').innerHTML);
        var child_count = parseInt(document.getElementById('child_count').innerHTML);

        PEOPLE_COUNT = adult_count + child_count;

        document.getElementById('all_count').innerHTML = PEOPLE_COUNT;
        document.getElementById('all_text').innerHTML = declOfNum(PEOPLE_COUNT, ['пассажир', 'пассажира', 'пассажиров']);
    }

    //#endregion

    //#region CURSE
    function loadCurse() {
        $.ajax(
            {
                url: "https://exmax.store/tarifs/api/Currency/",
                async: true,
                type: 'POST',
                dataType: "html",
                success: function (data) {
                    var answer = $.parseJSON(data);

                    if (answer[0] == 0) {
                        CURSE_MULTIPLY = answer[2];

                        $.ajax(
                            {
                                async: true,
                                url: "php/curse.php",
                                type: 'POST',
                                dataType: "html",
                                success: function (response) {
                                    //console.log(response);

                                    var rub = 0;
                                    var thb = 0;
                                    var usd = 0;

                                    jQuery(response).find('Cube').each(
                                        function () {
                                            var cur = jQuery(this).attr('currency'),
                                                val = jQuery(this).attr('rate');

                                            if (cur == "RUB")
                                                rub = val;

                                            if (cur == "THB")
                                                thb = val;

                                            if (cur == "USD")
                                                usd = val;
                                        });

                                    RUR_CURSE = rub / thb;
                                    RUR_CURSE *= CURSE_MULTIPLY;

                                    USD_CURSE = usd / thb;
                                    USD_CURSE *= CURSE_MULTIPLY;

                                    if(document.getElementById('summ') != null)
                                        calc(0);
                                },
                                error: function (error) {
                                    console.log(error);
                                }
                            });
                    }
                }
            });


    }

    //#endregion

    //#region FUNCTION
    function close_all() {
        $('#taxi_from').css('display', 'none');
        $('#taxi_to').css('display', 'none');
        $("#mini_modal").css('display', 'none');
        $("#main_menu_drop").css('display', 'none');
    }

    $(document).mouseup(function (e) {
        // Проверка на клик вне формы поиска
        var div = $("#form_search");
        var div2 = $("#main_menu_open");

        if (!div.is(e.target) && div.has(e.target).length === 0 && !div2.is(e.target) && div2.has(e.target).length === 0) {
            // console.log("Close");
            close_all();
        }
    });

    function form_send(car, amount) {
        var url = 'view/orders.php';
        var auto = car;
        var amount = amount;
        var passengers = document.getElementById('all_count').innerHTML + " " + document.getElementById('all_text').innerHTML;
        var adult = document.getElementById('adult_count').innerHTML;
        var child = document.getElementById('child_count').innerHTML;

        var form = document.createElement("form");
        form.setAttribute("method", 'post');
        form.setAttribute("action", url);

        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", 'auto');
        input.setAttribute("value", auto);

        var input2 = document.createElement("input");
        input2.setAttribute("type", "hidden");
        input2.setAttribute("name", 'amount');
        input2.setAttribute("value", amount);

        var input3 = document.createElement("input");
        input3.setAttribute("type", "hidden");
        input3.setAttribute("name", 'from');
        input3.setAttribute("value", FROM_TITLE);

        var input4 = document.createElement("input");
        input4.setAttribute("type", "hidden");
        input4.setAttribute("name", 'to');
        input4.setAttribute("value", TO_TITLE);

        var input5 = document.createElement("input");
        input5.setAttribute("type", "hidden");
        input5.setAttribute("name", 'passengers');
        input5.setAttribute("value", passengers);

        var input6 = document.createElement("input");
        input6.setAttribute("type", "hidden");
        input6.setAttribute("name", 'from_key');
        input6.setAttribute("value", FROM_KEY);

        var input7 = document.createElement("input");
        input7.setAttribute("type", "hidden");
        input7.setAttribute("name", 'to_key');
        input7.setAttribute("value", TO_KEY);

        var input8 = document.createElement("input");
        input8.setAttribute("type", "hidden");
        input8.setAttribute("name", 'adult');
        input8.setAttribute("value", adult);

        var input9 = document.createElement("input");
        input9.setAttribute("type", "hidden");
        input9.setAttribute("name", 'child');
        input9.setAttribute("value", child);

        form.appendChild(input);
        form.appendChild(input2);
        form.appendChild(input3);
        form.appendChild(input4);
        form.appendChild(input5);
        form.appendChild(input6);
        form.appendChild(input7);
        form.appendChild(input8);
        form.appendChild(input9);

        document.body.appendChild(form);

        form.submit();
    }

    function search(text, where) {
        var url = "https://exmax.store/tarifs/api/Ways/";

        $.ajax(
            {
                url: url,
                data:
                    {
                        search: text
                    },
                type: 'POST',
                dataType: "html",
                success: function (data) {
                    var answer = $.parseJSON(data);

                    if (answer[0] == 1) {
                        if (DEBUG) {
                            console.log("error: " + answer[1]);
                        }
                        return;
                    } else {
                        var params = answer[2];

                        $('#taxi_' + where + '_list').empty();

                        for (var i = 0; i < params.length; i++) {
                            var supplier = params[i];
                            var finalHtml = "";

                            finalHtml += "<li data-id=\"" + supplier[0] + "\" data-title =\"" + supplier[1] + "\" data-key=\"" + supplier[2] + "\">" + supplier[1] + "</li>";

                            $('#taxi_' + where + '_list').append(finalHtml);
                        }
                    }

                    $('#taxi_' + where).css('display', 'block');
                },
                error: function (data) {
                    console.log('ERROR \n');
                    console.log(data);
                }
            });
    }

    function declOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function load_page(page_address, container) {
        $.ajax(
            {
                url: page_address,
                type: 'GET',
                dataType: "html",
                data: {},
                success: function (response) {
                    $('#' + container).empty();
                    $('#' + container).append(response);
                }
            });
    }

    function get_parent_id(target, id, count) {
        var found = false;
        var t = target;

        for (var i = 0; i < count; i++) {
            if (t.getAttribute('id') == id) {
                found = true;
                break;
            }

            t = t.parentNode;
        }

        return found;
    }

    function ceil(number, type) {
        var i = Number(number);

        if (type == "USD")
            i *= USD_CURSE;

        if (type == "RUR")
            i *= RUR_CURSE;

        return i.toFixed(0);
    }

    //#endregion
});

function QrTarget() {
    
    var way_from = $('#taxi_from_input').val();
    var way_to = $('#taxi_to_input').val();
    
    var adult_count = parseInt(document.getElementById('adult_count').innerHTML);
    var child_count = parseInt(document.getElementById('child_count').innerHTML);
    
    var PEOPLE_COUNT = adult_count + child_count;
    
    $("#whatsapp_sedan, #whatsapp_minivan, #whatsapp_vip_minivan, #whatsapp_pickup").on("click", function () {
    
        var price = $(this).parent().parent().find(".currencyBlock").children("p:first-of-type").text();
        var car_name = $(this).parent().parent().parent().find(".detailTitle").text();
    
        var link = "https://api.whatsapp.com/send?phone=66945800333&text= From-" + way_from
            + "%0d%0a To-" + way_to
            + "%0d%0a Pax-" + PEOPLE_COUNT
            + "%0d%0a Price-" + price
            + "%0d%0a Car.-" + car_name;
        
        if (isMobile.any()) {
            // отправка get запроса
            window.open(link, '_blank');
            ym(51784160, 'reachGoal', 'whatsapp');
            
        }
        else {
            PopUp.show("", "view/popup/whatsapp.php", "",function () {
                    document.getElementById('msg_send').href = link;
                    new QRCode(document.getElementById("qrcode"), link);
                }
            );
        }
    });
    
    $("#viber_sedan, #viber_minivan, #viber_vip_minivan, #viber_pickup").on("click", function () {
    
        var price = $(this).parent().parent().find(".currencyBlock").children("p:first-of-type").text();
        var car_name = $(this).parent().parent().parent().find(".detailTitle").text();
    
        var link = "viber://pa?chatURI=taxiphuket.&context=Your&text= From-" + way_from
            + "%0d%0a To-" + way_to
            + "%0d%0a Pax-" + PEOPLE_COUNT
            + "%0d%0a Price-" + price
            + "%0d%0a Car.-" + car_name;
        
        if (isMobile.any()) {
            // отправка get запроса
            window.open(link, '_blank');
            ym(51784160, 'reachGoal', 'viber');
            
        }
        else {
            PopUp.show("", "view/popup/viber.php", "", function () {
                    document.getElementById('msg_send').href = link;
                    new QRCode(document.getElementById("qrcode"), link);
                }
            );
        }
    });
    
    $("#telegram_sedan, #telegram_minivan, #telegram_vip_minivan, #telegram_pickup").on("click", function () {
        
        var link = "https://t.me/Taxi_Phuket_bot";
        
        if (isMobile.any()) {
            // отправка get запроса
            window.open(link, '_blank');
            ym(51784160, 'reachGoal', 'telegram');
            
        }
        else {
            PopUp.show("", "view/popup/telegram.php", "", function () {
                    document.getElementById('msg_send').href = link;
                    new QRCode(document.getElementById("qrcode"), link);
                }
            );
        }
    });
}