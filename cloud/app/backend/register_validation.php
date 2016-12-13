<?php 
require("../dbConnection.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$phone = $request->phone;
$email = $request->email;

//$pass = $request->password;

//echo json_encode($request);

$validator = 'success' ;
$sql = "SELECT phoneNumber,email FROM `users`";

//echo $sql;

$result = $connection->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    			if($row["phoneNumber"] == $phone){
    					$validator = 'phoneNumberfalse' ;
    			}
    			if($row["email"] == $email){
    					$validator = 'emailfalse' ;
    			}
    			

    }
} else {
   $validator = 'success' ;
}

echo json_encode($validator);
?>