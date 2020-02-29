<?php
$phone = htmlspecialchars($_POST["phone"]);

$data['json_data'] = json_encode([
    "method"  =>  "whatsapp_send",
    "phone"   =>  $phone,
    "text"    =>  "Здравствуйте! Какой маршрут Вас интересует?",
    "file_url" => "https://sendapi.net/img/kp6.png",
    "api_id"  =>  "9e76d827b8d0d0d089589245c241c72df3869661"
]);

$ch = curl_init("https://sendapi.net/api.php");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
$body = curl_exec($ch);
curl_close($ch);

$content = (object)[

    'params' => $body,

];

echo json_encode($content);