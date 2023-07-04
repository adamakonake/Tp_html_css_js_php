<?php
    //Dossier d'upload
    $dir='../upload/';
    $conn;
    //Verification si les donnée sont présentent
    if(isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['age']) && isset($_POST['dateNaissance']) &&
    isset($_POST['email']) && isset($_POST['telephone']) && isset($_POST['promotion']) && isset($_POST['anneeCerf']) && isset($_FILES['file']) ){
        //asignation des informations de l'apprenant aux variables
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $age = $_POST['age'];
        $dateNaissance = $_POST['dateNaissance'];
        $email = $_POST['email'];
        $telephone = $_POST['telephone'];
        $promotion = $_POST['promotion'];
        $anneeCerf = $_POST['anneeCerf'];

        $cheminPhoto = strtolower($dir.$email.'.'.pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
        $check = getimagesize($_FILES["file"]["tmp_name"]);
        if($check !== false) {
            if ($_FILES["file"]["size"] > 5000000) {
                echo "L'image est supérieure à 5Mb";
                die();
            }else{
                if (file_exists($cheminPhoto)) {
                    if(!unlink($cheminPhoto)){
                        echo "erreur sup";
                        die();
                    }else{
                        if (move_uploaded_file($_FILES["file"]["tmp_name"], $cheminPhoto)) {
                            

                            try{
                                $conn = new PDO("mysql:host=localhost;dbname=odk","root","");
                                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                                $query = $conn->prepare("SELECT * FROM apprenant WHERE email = :email");
                                $query->execute(['email'=>$email]);
                                $appVerif = $query->fetchAll();
                                if($appVerif == null){
                                    $query = $conn->prepare("SELECT * FROM promotion WHERE nom = :promotion");
                                    $query->execute([':promotion'=>$promotion]);
                                    $promoVerif = $query->fetchAll();
                                    if($promoVerif != null){
                                        $query = $conn->prepare("INSERT INTO apprenant(id,matriculle,nom,prenom,age,dateNaissance,
                                        email,telephone,promotion,anneeCerf,photo,idApprenant) VALUES(:id,:matriculle,:nom,:prenom,:age,:dateNaissance,
                                        :email,:telephone,:promotion,:anneeCerf,:photo,:idApprenant)");
                                        $matriculle = $promotion.mt_rand(1111,9999);
                                        $id = null;
                                        $idApprenant = 1;
                                        $photo = "localhost/Tpphp/upload/".strtolower($email.'.'.pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
                                        $query->bindParam(':id',$id);
                                        $query->bindParam(':matriculle',$matriculle);
                                        $query->bindParam(':nom',$nom);
                                        $query->bindParam(':prenom',$prenom);
                                        $query->bindParam(':age',$age);
                                        $query->bindParam(':dateNaissance',$dateNaissance);
                                        $query->bindParam(':email',$email);
                                        $query->bindParam(':telephone',$telephone);
                                        $query->bindParam(':promotion',$promotion);
                                        $query->bindParam(':anneeCerf',$anneeCerf);
                                        $query->bindParam(':photo',$photo);
                                        $query->bindParam(':idApprenant',$idApprenant);
                                        $query->execute();
                                        $conn = null;
                                    }else{
                                        unlink($cheminPhoto);
                                        $conn = null;
                                        die("Pnotfound");
                                    }
                                }else{
                                    unlink($cheminPhoto);
                                    $conn = null;
                                    die("exist");
                                }
                                

                            }catch(PDOException $e){
                                echo "Connection failed: " . $e->getMessage();
                                die();
                            }
                            echo "succes";
                        } else {
                            echo "Une erreure interne reessayer";
                        }
                    }
                }else{
                    if (move_uploaded_file($_FILES["file"]["tmp_name"], $cheminPhoto)) {
                        try{
                            $conn = new PDO("mysql:host=localhost;dbname=odk","root","");
                            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $query = $conn->prepare("SELECT * FROM apprenant WHERE email = :email");
                            $query->execute(['email'=>$email]);
                            $appVerif = $query->fetchAll();
                            if($appVerif == null){
                                $query = $conn->prepare("SELECT * FROM promotion WHERE nom = :promotion");
                                $query->execute([':promotion'=>$promotion]);
                                $promoVerif = $query->fetchAll();
                                if($promoVerif != null){
                                    $query = $conn->prepare("INSERT INTO apprenant(id,matriculle,nom,prenom,age,dateNaissance,
                                    email,telephone,promotion,anneeCerf,photo,idApprenant) VALUES(:id,:matriculle,:nom,:prenom,:age,:dateNaissance,
                                    :email,:telephone,:promotion,:anneeCerf,:photo,:idApprenant)");
                                    $matriculle = $promotion.mt_rand(1111,9999);
                                    $id = null;
                                    $idApprenant = 1;
                                    $photo = "localhost/Tpphp/upload/".strtolower($email.'.'.pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
                                    $query->execute([
                                        ':id'=>$id,
                                        ':matriculle'=>$matriculle,
                                        ':nom'=>$nom,
                                        ':prenom'=>$prenom,
                                        ':age'=>$age,
                                        ':dateNaissance'=>$dateNaissance,
                                        ':email'=>$email,
                                        ':telephone'=>$telephone,
                                        ':promotion'=>$promotion,
                                        ':anneeCerf'=>$anneeCerf,
                                        ':photo'=>$photo,
                                        ':idApprenant'=>$idApprenant
                                    ]);
                                    $conn = null;
                                }else{
                                    $conn = null;
                                    die("Pnotfound");
                                }
                            }else{
                                $conn = null;
                                die("exist");
                            }
                            

                        }catch(PDOException $e){
                            echo "Connection failed: " . $e->getMessage();
                            die();
                        }
                        echo "succes";
                    } else {
                        echo "Une erreure interne reessayer";
                    }
                }
            }
        } else {
            echo "image incorrect";
        }

        
    }else{
        echo "oups erreur";
    }
    
    
?>