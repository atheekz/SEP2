<?php 
require("../dbConnection.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = $request->email;
$verificationCode = $request->verificationCode;
//echo json_encode($request);

$validator = 'success' ;
$sql = "SELECT * FROM `users` WHERE `email` LIKE '".$email."' AND `token` LIKE '".$verificationCode."'";

//echo $sql;

$result = $connection->query($sql);

if ($result->num_rows == 1) {
    // output data of each row
    /*  if($row["email"] != $email || $row["password"] != $password){
                        $validator = 'failMailPass' ;
                }
                if($row["token"] != $verificationCode ){
                    $validator = 'verificationCodeFail' ;
                }
                else{

                     $validator = 'success' ;
                }   */
 /*   while($row = $result->fetch_assoc()) {
    		
                $validator = 'success' ;

    }*/
                $sql2=   "UPDATE `users` SET `verified` = 'true' WHERE `email` like  '".$email."' AND `token` LIKE '".$verificationCode."'";
                //echo $sql2;
                //$result2 = $connection->query($sql2);
                
                if (mysqli_query($connection,$sql2)) {
                    $validator = 'success' ;
                }
                else{
                    $validator = 'success' ;
                }

} else {
   $validator = 'fail' ;
}

echo json_encode($validator);
?>