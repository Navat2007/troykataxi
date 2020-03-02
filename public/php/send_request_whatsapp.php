<?php
$phone = htmlspecialchars($_POST["phone"]);

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
$body = curl_exec($ch);
curl_close($ch);

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

$content = (object)[

    'params' => $body,

];

echo json_encode($content);