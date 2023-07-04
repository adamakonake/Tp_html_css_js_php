<?php

    //Dossier d'upload
    $dir='../upload/';
    $conn;
    //Verification si les donnée sont présentent
    if(isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['age']) && isset($_POST['dateNaissance']) &&
    isset($_POST['email']) && isset($_POST['telephone']) && isset($_POST['promotion']) && isset($_POST['anneeCerf']) ){
        //asignation des informations de l'apprenant aux variables
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $age = $_POST['age'];
        $dateNaissance = $_POST['dateNaissance'];
        $email = $_POST['email'];
        $telephone = $_POST['telephone'];
        $promotion = $_POST['promotion'];
        $anneeCerf = $_POST['anneeCerf'];

        if(isset($_FILES['file'])){
            
            $cheminPhoto = strtolower($dir.$email.'.'.pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
            $check = getimagesize($_FILES["file"]["tmp_name"]);
            if($check !== false) {
                if ($_FILES["file"]["size"] > 5000000) {
                    $response = array(
                        "message"=>"L'image est supérieure à 5Mb",
                    );
                    echo json_encode($response);
                    die();
                }else{

                    try{
                        $conn = new PDO("mysql:host=localhost;dbname=odk","root","");
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $query = $conn->prepare("SELECT * FROM apprenant WHERE email = :email");
                        $query->execute(['email'=>$email]);
                        $appVerif = $query->fetchAll();
                        if($appVerif != null){
                            $query = $conn->prepare("SELECT photo FROM apprenant WHERE email = :email");
                            $query->execute(['email'=>$email]);
                            $appPhoto = json_encode($query->fetch(PDO::FETCH_ASSOC));
                            $oldImage = strtolower($dir.substr($appPhoto,strrpos($appPhoto,"/")+1));
                            $oldImage = str_ireplace("\"","",$oldImage);
                            $oldImage = str_ireplace("}","",$oldImage);
                            if(!unlink($oldImage)){
                                $conn = null;
                                die("erreur de suppression");
                            }else{
                                if(move_uploaded_file($_FILES["file"]["tmp_name"], $cheminPhoto)){

                                    $query = $conn->prepare("UPDATE apprenant SET nom=:nom ,prenom=:prenom ,age=:age ,dateNaissance=:dateNaissance ,
                                    email=:email,telephone=:telephone,promotion=:promotion,anneeCerf=:anneeCerf,photo=:photo WHERE email =:email;");
                                    $photo = "localhost/Tpphp/upload/".strtolower($email.'.'.pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
                                    $query->bindParam(':nom',$nom);
                                    $query->bindParam(':prenom',$prenom);
                                    $query->bindParam(':age',$age);
                                    $query->bindParam(':dateNaissance',$dateNaissance);
                                    $query->bindParam(':email',$email);
                                    $query->bindParam(':telephone',$telephone);
                                    $query->bindParam(':promotion',$promotion);
                                    $query->bindParam(':anneeCerf',$anneeCerf);
                                    $query->bindParam(':photo',$photo);
                                    $query->execute();
                                    $query = $conn->prepare("SELECT * FROM apprenant WHERE email = :email");
                                    $query->execute(['email'=>$email]);
                                    $apprenant = $query->fetchAll();
                                    $response = array(
                                        "message"=>"succes",
                                        "apprenant"=> $apprenant,
                                    );
                                    $conn = null;
                                    echo json_encode($response);

                                }else{
                                    $response = array(
                                        "message"=>"erruer interne",
                                    );
                                    $conn = null;
                                    echo json_encode($response);
                                    die();
                                }
                            } 
        
                        }else{
                            $response = array(
                                "message"=>"notExist",
                            );
                            $conn = null;
                            echo json_encode($response);
                            die();
                        }
        
                    }catch(PDOException $e){
                        $response = array(
                            "message"=>"Connection failed: " . $e->getMessage(),
                        );
                        echo json_encode($response);
                        die();
                    }

                }
            }else{
                $response = array(
                    "message"=>"image incorrect",
                );
                echo json_encode($response);
                die();
            }

        }else{

            try{
                $conn = new PDO("mysql:host=localhost;dbname=odk","root","");
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $query = $conn->prepare("SELECT * FROM apprenant WHERE email = :email");
                $query->execute(['email'=>$email]);
                $appVerif = $query->fetchAll();
                if($appVerif != null){

                    $query = $conn->prepare("UPDATE apprenant SET nom=:nom ,prenom=:prenom ,age=:age,dateNaissance=:dateNaissance,
                    email=:email,telephone=:telephone,promotion=:promotion,anneeCerf=:anneeCerf WHERE email =:email;");
                    
                    $query->bindParam(':nom',$nom);
                    $query->bindParam(':prenom',$prenom);
                    $query->bindParam(':age',$age);
                    $query->bindParam(':dateNaissance',$dateNaissance);
                    $query->bindParam(':email',$email);
                    $query->bindParam(':telephone',$telephone);
                    $query->bindParam(':promotion',$promotion);
                    $query->bindParam(':anneeCerf',$anneeCerf);
                    $query->execute();
                    $query = $conn->prepare("SELECT * FROM apprenant WHERE email = :email");
                    $query->execute(['email'=>$email]);
                    $apprenant = $query->fetchAll();
                    $response = array(
                        "message"=>"succes",
                        "apprenant"=> $apprenant,
                    );
                    $conn = null;
                    echo json_encode($response);


                }else{
                    $response = array(
                        "message"=>"notExist",
                    );
                    $conn = null;
                    echo json_encode($response);
                    die();
                }

            }catch(PDOException $e){
                $response = array(
                    "message"=>"Connection failed: " . $e->getMessage(),
                );
                echo json_encode($response);
                die();
            }

        }
        
    }
    else{
        $response = array(
            "message"=>"error",
        );
        echo json_encode($response);
    }
    
?>