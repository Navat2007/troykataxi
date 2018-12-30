<?php

$title = "Русское Такси Тройка";
$site_name = "https://пхукет24.рф";
//
//  if ($meta_desc == ''){
//    $meta_desc = "Расчитай стоимость такси по Пхукету на 30% дешевле!";
//  }

$meta_key = "трансфер пхукет, такси пхукет, русское такси на пхукете, такси на пхукете из аэропорта, трансфер пхукет краби, трансфер пхукет самуи, трансфер пхукет отель, трансфер пхукет пхи пхи, трансфер пхукет карон, трансфер пхукет патонг";

//  $site_base = '/'; // Путь от корня для css js img НУЖНО МЕНЯТЬ
$site_base = '/troykataxi/'; // Путь от корня для css js img

$styles = array(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'fonts/font.css',
);
if ($page_name == 'Оформление заказа') {
    array_unshift($styles, "css/libs/bootstrap-datetimepicker.min.css");
}
include_once $_SESSION['root'] . 'view/main/header.php';
if ($page_href == '') {

} else {
    require_once $_SESSION['root'] . $page_href;
}

?>

