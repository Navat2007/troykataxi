<?php
header("Content-Type: text/html; charset=utf-8");

$login = "phuket7dimension@gmail.com";
$api_key = "49fdd88b7a85d4cbaf010b76efde0882b0941be0";
$subdomen = "troykataxi";

$data = $_POST;
$action = $data['action'];

if ($action == "call") {
    $name = $data['name'];
    $phone = $data['phone'];

    $data = array(
        'add' =>
            array(
                0 =>
                    array(
                        'source_name' => 'Форма на сайте пхукет24.рф',
                        'source_uid' => '1111111',
                        'created_at' => time(),
                        'incoming_entities' =>
                            array(
                                'leads' =>
                                    array(
                                        0 =>
                                            array(
                                                'name' => 'пхукет24.рф: Заказ звонка',
                                            ),
                                    ),
                                'contacts' =>
                                    array(
                                        0 =>
                                            array(
                                                'name' => $name,
                                                'custom_fields' =>
                                                    array(
                                                        0 =>
                                                            array(
                                                                'id' => '335846',
                                                                'values' =>
                                                                    array(
                                                                        0 =>
                                                                            array(
                                                                                'value' => $phone,
                                                                                'enum' => 'WORK',
                                                                            ),
                                                                    ),
                                                            ),
                                                    ),
                                                'responsible_user_id' => '819939',
                                            ),
                                    ),
                            ),
                        'incoming_lead_info' =>
                            array(
                                'form_id' => '434343',
                                'form_page' => 'пхукет24.рф - Заказ звонка',
                                'ip' => '99.995.262.6',
                                'service_code' => '000002',
                            ),
                    ),
            ),
    );
    $link = "https://troykataxi.amocrm.ru/api/v2/incoming_leads/form?login=phuket7dimension@gmail.com&api_key=49fdd88b7a85d4cbaf010b76efde0882b0941be0";

    $headers[] = "Accept: application/json";

    //Curl options
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, "amoCRM-API-client-undefined/2.0");
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_HEADER, false);
    $out = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($out, TRUE);

    //$new_url = '../thanks_page_call.php';
    //header('Location: '.$new_url);
}

if ($action == "callback") {
    $name = $data['name'];
    $phone = $data['phone'];
    $email = $data['email'];
    $message = $data['message'];

    $data = array(
        'add' =>
            array(
                0 =>
                    array(
                        'source_name' => 'Форма на сайте пхукет24.рф',
                        'source_uid' => '1111111',
                        'created_at' => time(),
                        'incoming_entities' =>
                            array(
                                'leads' =>
                                    array(
                                        0 =>
                                            array(
                                                'name' => 'пхукет24.рф: Обратная связь',
                                                'notes' =>
                                                    array(
                                                        0 =>
                                                            array(
                                                                'note_type' => 4,
                                                                'element_type' => 'lead',
                                                                'text' => $message,
                                                            ),
                                                    ),
                                            ),

                                    ),
                                'contacts' =>
                                    array(
                                        0 =>
                                            array(
                                                'name' => $name,
                                                'custom_fields' =>
                                                    array(
                                                        0 =>
                                                            array(
                                                                'id' => '335846',
                                                                'values' =>
                                                                    array(
                                                                        0 =>
                                                                            array(
                                                                                'value' => $phone,
                                                                                'enum' => 'WORK',
                                                                            ),
                                                                    ),
                                                            ),
                                                        1 =>
                                                            array(
                                                                'id' => '335848',
                                                                'values' =>
                                                                    array(
                                                                        0 =>
                                                                            array(
                                                                                'value' => $email,
                                                                                'enum' => 'WORK',
                                                                            ),
                                                                    ),
                                                            ),
                                                    ),
                                                'responsible_user_id' => '819939',
                                            ),
                                    ),
                            ),
                        'incoming_lead_info' =>
                            array(
                                'form_id' => '434343',
                                'form_page' => 'пхукет24.рф - Обратная связь: ' . $message,
                                'ip' => '99.995.262.6',
                                'service_code' => '000002',
                            ),
                    ),
            ),
    );
    $link = "https://troykataxi.amocrm.ru/api/v2/incoming_leads/form?login=phuket7dimension@gmail.com&api_key=49fdd88b7a85d4cbaf010b76efde0882b0941be0";

    $headers[] = "Accept: application/json";

    //Curl options
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, "amoCRM-API-client-undefined/2.0");
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_HEADER, false);
    $out = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($out, TRUE);

    //$new_url = '../thanks_page_call.php';
    //header('Location: '.$new_url);
}

if ($action == "order") {
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $flight = $data['flight'];
    $luggage = $data['luggage'];
    $date = $data['date'];
    $place_from = $data['place_from'];
    $place_to = $data['place_to'];
    $move_from = $data['from'];
    $move_to = $data['to'];
    $round_date = $data['round_date'];
    $note = $data['note'];
    $car = $data['car'];
    $adult = $data['adult'];
    $child = $data['child'];
    $people = $adult+$child;
    $price = $data['price'];

    $order_text = $car . "\n\n";
    $order_text .= "Дата:" . "\n";
    $order_text .= $date . "\n";
    $order_text .= "Откуда:" . "\n";
    $order_text .= $move_from . "\n";
    $order_text .= $place_from . "\n";
    $order_text .= "Куда:" . "\n";
    $order_text .= $move_to . "\n";
    $order_text .= $place_to . "\n\n";

    if (!empty($round_date)) {
        $order_text .= "Туда обратно: Да" . "\n";
        $order_text .= $round_date;
    }

    $data = array(
        'add' =>
            array(
                0 =>
                    array(
                        'source_name' => 'Форма на сайте пхукет24.рф',
                        'source_uid' => '1111111',
                        'created_at' => time(),
                        'incoming_entities' =>
                            array(
                                'leads' =>
                                    array(
                                        0 =>
                                            array(
                                                'name' => 'пхукет24.рф: Заказ трансфера',
                                                'custom_fields' =>
                                                    array(
                                                        // Номер рейса
                                                        0 =>
                                                            array(
                                                                'id' => '460117',
                                                                'values' =>
                                                                    array(
                                                                        0 => array(
                                                                            'value' => $flight,
                                                                        ),
                                                                    ),
                                                            ),
                                                        // Кол-во человек
                                                        1 =>
                                                            array(
                                                                'id' => '459657',
                                                                'values' =>
                                                                    array(
                                                                        0 => array(
                                                                            'value' => $adult + $child,
                                                                        ),
                                                                    ),
                                                            ),
                                                        // Кол-во багажа
                                                        2 =>
                                                            array(
                                                                'id' => '459659',
                                                                'values' =>
                                                                    array(
                                                                        0 => array(
                                                                            'value' => $luggage,
                                                                        ),
                                                                    ),
                                                            ),
                                                        // Примечание
                                                        3 =>
                                                            array(
                                                                'id' => '459663',
                                                                'values' =>
                                                                    array(
                                                                        0 => array(
                                                                            'value' => $note,
                                                                        ),
                                                                    ),
                                                            ),
                                                        // Заказ
                                                        4 =>
                                                            array(
                                                                'id' => '461219',
                                                                'values' =>
                                                                    array(
                                                                        0 => array(
                                                                            'value' => $order_text,
                                                                        ),
                                                                    ),
                                                            ),
                                                    ),
                                            ),
                                    ),
                                'contacts' =>
                                    array(
                                        0 =>
                                            array(
                                                'name' => $name,
                                                'custom_fields' =>
                                                    array(
                                                        0 =>
                                                            array(
                                                                'id' => '335846',
                                                                'values' =>
                                                                    array(
                                                                        0 =>
                                                                            array(
                                                                                'value' => $phone,
                                                                                'enum' => 'WORK',
                                                                            ),
                                                                    ),
                                                            ),
                                                    ),
                                                'responsible_user_id' => '819939',
                                            ),
                                    ),
                            ),
                        'incoming_lead_info' =>
                            array(
                                'form_id' => '434343',
                                'form_page' => 'пхукет24.рф - Заказ трансфера',
                                'ip' => '99.995.262.6',
                                'service_code' => '000002',
                            ),
                    ),
            ),
    );
    $link = "https://troykataxi.amocrm.ru/api/v2/incoming_leads/form?login=phuket7dimension@gmail.com&api_key=49fdd88b7a85d4cbaf010b76efde0882b0941be0";

    $headers[] = "Accept: application/json";

    //Curl options
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, "amoCRM-API-client-undefined/2.0");
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_HEADER, false);
    $out = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($out, TRUE);

    // Условия для пустых переменных
    if (empty($place_from)) {
        $place_from = 'Не указано';
    }
    if (empty($place_to)) {
        $place_to = 'Не указано';
    }
    if (empty($flight)) {
        $flight = 'Не указано';
    }
    if (empty($luggage)) {
        $luggage = 'Не указано';
    }
    if (empty($note)) {
        $note = 'Не указано';
    }
    if (!empty($round_date)) {
        $back_transfer = 'Да - ' . $round_date;
    } else {
        $back_transfer = 'Нет';
    }

    //Отправляем email клиенту
    $to = $email . ", taxireservephuket@gmail.com";
    $subject = "Заказ Такси на Пхукете";
    $message = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html lang="ru" style="margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch; width: 100%; font-family: Tahoma, Geneva, sans-serif;">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <title>Русское такси на Пхукете</title>
</head>

<body style="margin: 0; padding: 0; max-width: 100%;">
<table border="0" cellpadding="0" cellspacing="0" id="wrapper" style="background-color: #cccccc; width: 100%; margin: 0; padding: 0;">
    <tbody>
    <tr>
        <td>
            <table class="header" align="center" style="max-width: 450px; width: 100%; margin: 2em auto; background-color: #ffffff; padding: 1em 0.75em 0.5em;">
                <tbody>
                <tr>
                    <td colspan="2">
                        <div class="logo" style="max-width: 300px; margin: auto; display: flex;">
                            <a href="https://xn--24-mlctyuep.xn--p1ai" style="display: inline-block; margin-right: 0.5em;">
                                <img src="https://xn--24-mlctyuep.xn--p1ai/img/logo.png" alt="Русское такси на Пхукете" border="0" height="90" width="90">
                            </a>
                            <div>
                                <h1 class="logo__text" style="font-weight: bold; margin: 0; padding: 0; font-size: 1.5em; line-height: 1; white-space: nowrap; text-transform: uppercase; color: #d43c33;">Русское такси <br><span style="display: block; text-align: left; font-size: 1.33em; font-style: normal;">На Пхукете</span></h1>
                                <p class="logo__smallText" style="padding: 0; margin: 0; font-weight: bold; font-size: 1.0625em; line-height: 1; letter-spacing: 0.025em; color: #000000; margin-top: 0.75em;">работаем с 2014 года</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <hr style="border-bottom: 1px solid #D8D8D8; margin: 1em 0;">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <h3 style="font-size: 1.25em; text-align: center; font-weight: bold; color: #000000;">Ваш заказ успешно сформирован!</h3>
                        <table class="order" align="center" style="width: 100%;">
                            <caption style="font-size: 0.875em; color: rgba(0,0,0,0.54); padding-bottom: 0.5em;">Детали поездки:</caption>
                            <tbody>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Транспорт:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$car.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Дата и время:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$date.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Номер рейса:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$flight.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Откуда:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$move_from.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Место отправления:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$place_from.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Куда:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$move_to.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Место назначения:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$place_to.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Обратный трансфер:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$back_transfer.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Количество пассажиров:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$people.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Количество багажа:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$luggage.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Имя:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$name.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Телефон:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$phone.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Примечание к заказу:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$note.'</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.15);">
                                <td><p style="padding: 0; margin: 0; color: rgba(0,0,0,0.54); font-size: 0.75em;">Итоговая стоимость:</p></td>
                                <td><strong style="display: block; text-align: right; color: rgba(0,0,0,0.87); font-size: 1em; font-weight: normal; padding-left: 0.5em;">'.$price.'</strong></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <hr style="border-bottom: 1px solid #D8D8D8; margin: 1em 0;">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span style="display: block; text-align: center; font-size: 0.675em; font-style: italic;">Это сообщение сформировано автоматически, отвечать на него не нужно.<br>С уважением Ваше Русское такси на Пхукете.</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>
</body>

</html>';

    $headers= 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8 \r\n";

    /* дополнительные шапки */
    $headers .= "From: Phuket7Dimension <no.reply.phuket@gmail.com>\r\n";

    mail($to, $subject, $message, $headers);


    $new_url = '../view/thanks_page_order.php';
    header('Location: ' . $new_url);
}
