<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_GET["id"]) && !empty($_GET["id"])){
        $id = $_GET["id"];
        try {
            $conn = new PDO("mysql:host=localhost;dbname=odk","root","");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $query = $conn->query("SELECT * FROM apprenant WHERE id = $id");
            $query->execute();
            $listApp = $query->fetchAll();
            echo json_encode($listApp);
    
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

}

?>