<?php
$phone = htmlspecialchars($_POST["phone"]);

$login = "phuket7dimension@gmail.com";
$api_key = "49fdd88b7a85d4cbaf010b76efde0882b0941be0";
$subdomen = "troykataxi";

$file = __DIR__ . '/counter.txt';
if (file_exists($file)) {
    $counter = file_get_contents($file);
} else {
    $counter = 0;
}
$counter++;

file_put_contents($file, $counter);

$data['json_data'] = json_encode([
    "method"  =>  "whatsapp_phone_add",
    "phone"   =>  $phone,
    "name"    =>  $counter,
    "contact_company" => "0",
    "api_id"  =>  "9e76d827b8d0d0d089589245c241c72df3869661"
]);

$ch = curl_init("https://sendapi.net/api.php");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
$add_body = curl_exec($ch);
curl_close($ch);

$add_result = json_decode($add_body)->result;

if($add_result == 0 || $add_result == 2)
{

    $data['json_data'] = json_encode([
        "method"  =>  "whatsapp_send",
        "phone"   =>  $phone,
        "text"    =>  "Здравствуйте! Какой маршрут Вас интересует?",
        "api_id"  =>  "9e76d827b8d0d0d089589245c241c72df3869661"
    ]);

    $ch = curl_init("https://sendapi.net/api.php");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $body = curl_exec($ch);
    curl_close($ch);

}
else
{

    $name = $counter;

    $data = array(
        'add' =>
            array(
                0 =>
                    array(
                        'source_name' => 'Форма на сайте troykataxi.ru',
                        'source_uid' => '1111111',
                        'created_at' => time(),
                        'incoming_entities' =>
                            array(
                                'leads' =>
                                    array(
                                        0 =>
                                            array(
                                                'name' => 'troykataxi.ru: Заказ напиши мне',
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
                                'form_page' => 'troykataxi.ru - Заказ напиши мне',
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

}

$content = (object)[

    'params' => "Done",

];

echo json_encode($content);