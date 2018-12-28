<?php

//ini_set('display_errors',1);
//error_reporting(E_ALL);

$myCurl = curl_init();
curl_setopt_array($myCurl, array(
    CURLOPT_URL => 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query(array())
));

$response = curl_exec($myCurl);
curl_close($myCurl);

echo $response;