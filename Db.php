<?php

class Db{

    private $pdo;

    public function __construct($dbname, $host, $user, $pass){
        try {
            $this->pdo = new PDO('mysql:dbname='.$dbname.";host=".$host, $user, null);
            //echo "OK";
        } catch(PDOException $e) {
            echo 'ERROR: ' . $e->getMessage();
        }
    }

    public function insere($ip,$pais,$estado,$cidade,$distrito,$lat,$lon){
        $sql = $this->pdo->prepare("INSERT INTO omegle (ip, pais, estado, cidade, distrito, lat, lon) VALUES (:ip, :pais, :estado, :cidade, :distrito, :lat, :lon)");
        $sql->bindValue(":ip",$ip);
        $sql->bindValue(":pais",$pais);
        $sql->bindValue(":estado",$estado);
        $sql->bindValue(":cidade",$cidade);
        $sql->bindValue(":distrito",$distrito);
        $sql->bindValue(":lat",$lat);
        $sql->bindValue(":lon",$lon);
        $sql->execute();
        return true;
    }
}
