<?php
//88844642_32125144
//101187764_35570288
//101187764_35118150
$request_params = [
    'group_id' => '101187764',
    'topic_id' => '35118150',
    'count' => '100',
    'extended' => '1',
    'need_likes' => '1',
    'sort' => 'desc',
    'access_token' => 'e662468018375cbc86cd6fb8826ce7696dd27991bcf5f4ca82154a5602138a48ca3428d2aeb63efa3fd87',
    'v' => '5.74'

];

$url = "https://api.vk.com/method/board.getComments?" . http_build_query($request_params);

$page = file_get_contents($url);

/*
$group_id = "101187764"; // ID группы
$topic_id = "35118150"; // ID обсуждения
$count = 100; // Количество комментариев, которое будет выведено
$extended = 1; // Будут ли загружены профили
$need_likes = 1; // Будут ли загружены лайки
$sort = "desc"; // Отображаем с начала(asc) или конца(desc)
$version = "5.74"; // Версия VK API (На текущий момент менять не нужно)


$page = file_get_contents("https://api.vk.com/method/board.getComments?" . "group_id=" . $group_id . "&topic_id=" . $topic_id . "&count=" . $count . "&extended=" . $extended . "&need_likes=" . $need_likes . "&sort=" . $sort . "&v=" . $version);
*/
echo $page;

/* Если не срабатывает php код и страница с JSON пустая, то потребуется закомментировать $page и echo $page и раскомментировать код ниже */
/*
$page = "https://api.vk.com/method/board.getComments?" . "group_id=" . $group_id . "&topic_id=" . $topic_id . "&count=" . $count . "&extended=" . $extended . "&need_likes=" . $need_likes . "&sort=" . $sort . "&v=" . $version;

function file_get_contents_curl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

echo file_get_contents_curl($page);*/