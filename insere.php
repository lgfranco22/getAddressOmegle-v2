<?php
error_reporting(E_ALL);

require 'Db.php';

$db = new Db('test','localhost','root',null);

if(isset($_GET['ip']))
{
    $ip = $_GET['ip'];
    $pais = $_GET['pais'];
    $estado = $_GET['estado'];
    $cidade = $_GET['cidade'];
    $distrito = $_GET['distrito'];
    $lat = $_GET['lat'];
    $lon = $_GET['lon'];

    $db->insere($ip,$pais,$estado,$cidade,$distrito,$lat,$lon);

    echo json_encode(array("status"=>"ok"));
}
