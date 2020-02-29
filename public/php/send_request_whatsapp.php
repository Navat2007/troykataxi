<?php
$phone = htmlspecialchars($_POST["phone"]);

$data['json_data'] = json_encode([
    "method"  =>  "whatsapp_send",
    "phone"   =>  $phone,
    "text"    =>  "Здравствуйте! Какой маршрут Вас интересует?",
    "file_url" => "https://sendapi.net/img/kp6.png",
    "api_id"  =>  "58e7a31bacbebf9ebc63d30d1e36b16da99b3e224a90c6bfd191d3ca97964fc2d857db8f3a6c0fa8fca58"
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