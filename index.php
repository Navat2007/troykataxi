<?php
/*
    if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off"){
        $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        header('HTTP/1.1 301 Moved Permanently');
        header('Location: ' . $redirect);
        exit();
    }
*/

    session_start();

    $_SESSION['root'] = __DIR__ . '/';

    $page_name = 'Главная';
    $page_href = 'view/main/main.php';
    $meta_desc = 'Заказывайте такси из Пхукета. Русскоязычная круглосуточная поддержка. 5 классов авто: от экономичных седанов до микроавтобусов. Скидка 30%';

    include $_SESSION['root'] . 'config.php';

    require_once $_SESSION['root'] . 'view/main/footer.php';
?>