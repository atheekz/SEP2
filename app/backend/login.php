<?php 
require("../dbConnection.php");
require ("./sendMail/PHPMailerAutoload.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$password = sha1($request->password);
//echo json_encode($request);

$validator = 'success' ;
$sql = "SELECT * FROM `users` WHERE `email` LIKE '".$email."' AND `password` LIKE '".$password."'";

//echo $sql;
$returndata = array(
						  	'id' => '',
					        'email' => '',
					        'name' => '',
					        'token' => '',
					        'validator' => ''
					    );

$result = $connection->query($sql);

if ($result->num_rows == 1) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      if($row["email"] != $email || $row["password"] != $password){
                        $validator = 'failMailPass' ;
                }
       
                if($row["verified"] != "true" ){
                    $validator = 'verificationCodeFail' ;
                }
                else{
                		if($row["loginCount"] == '1'){
			                $sql2=   "UPDATE `users` SET `status` = 'logged_in' ,`loginCount` = '1010' WHERE `email` like  '".$email."' AND `password` LIKE '".$password."'";
			                //echo $sql2;
			                //$result2 = $connection->query($sql2);
			                
			                if (mysqli_query($connection,$sql2)) {
			                    $validator = 'Firstsuccess' ;
			                }
			                else{
			                    $validator = 'fail' ;
			                }
			            }
			            else{			               
			             $sql2=   "UPDATE `users` SET `status` = 'logged_in'  WHERE `email` like  '".$email."' AND `password` LIKE '".$password."'";
			                //echo $sql2;
			                //$result2 = $connection->query($sql2);
			                
			                if (mysqli_query($connection,$sql2)) {
			                    $validator = 'success' ;
			                }
			                else{
			                    $validator = 'fail' ;
			                }

			            }
            }
            
	$returndata = array(
						  	'id' => $row['userId'],
					        'email' => $row['email'],
					        'name' => $row['name'],
					        'token' => $row['token'],
					        'validator' => $validator
					    );
        }


} else {
   $validator = "fail" ;
   $returndata = array(
						  	'id' => '',
					        'email' => '',
    					    'name' => '',
					        'token' => '',
					        'validator' => $validator
					    );
}

					
echo json_encode($returndata);



?>