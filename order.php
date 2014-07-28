<?php
$config = array(
  'mail' => array(
      'to'    => 'pettsonchello@gmail.com',
      'from'  => '',
      'reply' => 'support'
  )
);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $phone   = htmlspecialchars($_POST['phone']);
    $town    = htmlspecialchars($_POST['town']);
    $title   = htmlspecialchars($_POST['title']) ? htmlspecialchars($_POST['title']) : 'Заявка';

    $body    = array();
    $body[]  = "<h2>$title</h2>";

    if (empty($phone) || !preg_match("/^\+\d\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/", $phone)) {
        die(json_encode(array('error' => 'Некорректно заполнено поле Телефон.')));
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die(json_encode(array('error' => 'Некорректно заполнено поле E-mail.')));
    }

    if (empty($name)) {
        die(json_encode(array('error' => 'Некорректно заполнено поле Имя.')));
    }

    if (!empty($town)) {
        $body[] = "<p><b>Город:</b> $town</p>";
    }


    $headers = 'Content-type:text/html;charset=utf-8' . PHP_EOL . 'From: ' . $config['mail']['from'] . ' <' . $config['mail']['reply'] . '>';

    $body[] = "<p><b>Имя:</b> $name</p>";
    $body[] = "<p><b>E-mail:</b> $email</p>";
    $body[] = "<p><b>Телефон:</b> $phone</p>";

    if (mail($config['mail']['to'], 'Заявка', implode($body, ''), $headers)) { 

        die(json_encode(true));

    } 

    die(json_encode(array('error' => 'Неизвестная ошибка!')));

}

?>