<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpbrk($_SERVER['HTTP_REFERER'],"http://localhost/tpphp/detail.html?")) {

    //echo $_SERVER['HTTP_REFERER'];

    //Dossier d'upload
    $dir='../upload/';
    if(isset($_GET["id"]) && !empty($_GET["id"])){
        $id = $_GET["id"];
        try {
            $conn = new PDO("mysql:host=localhost;dbname=odk","root","");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $query = $conn->prepare("SELECT photo FROM apprenant WHERE id = :id");
            $query->execute([':id'=>$id]);
            $appPhoto = json_encode($query->fetch(PDO::FETCH_ASSOC));
            $oldImage = strtolower($dir.substr($appPhoto,strrpos($appPhoto,"/")+1));
            $oldImage = str_ireplace("\"","",$oldImage);
            $oldImage = str_ireplace("}","",$oldImage);
            if(!unlink($oldImage)){
                $conn = null;
                die("erreur de suppression");
            }else{
                $query = $conn->prepare("DELETE FROM apprenant WHERE id = :id");
                $query->execute([":id"=>$id]);
                echo "succes";
            }
    
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }else{
        echo "error is";
    }

}else{
    echo "erreur rt";
}

?>