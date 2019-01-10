<?php

$site_name = "Русское такси Тройка"; // Название сайта - не изменяется OG
$title = "Такси на Пхукете из аэропорта: заказать онлайн 24 часа ✔";
$meta_key = "трансфер, такси, аэропорт, Пхукет, Краби, Самуи, Пхи Пхи, Карон, Патонг";
$og_type = 'website';
$og_locale = 'ru_RU';
$site_url = "http://troykataxi.ru";
$og_imgurl = $site_url . '/favicon/icon_192x192.png';

//$site_base = '/'; // Путь от корня для css js img НУЖНО МЕНЯТЬ
$site_base = '/troykataxi/'; // Путь от корня для css js img

// OPEN GRAPH
$open_graph = array(
    'type' => $og_type,
    'title' => $title,
    'site_name' => $site_name,
    'description' => $meta_desc,
    'url' => $site_url,
    'image' => $og_imgurl,
    'locale' => $og_locale
);

// ПОДКЛЮЧЕНИЕ СТИЛЕЙ
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

