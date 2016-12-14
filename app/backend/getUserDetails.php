<?php 
require("../dbConnection.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$userId = $request['userId'] ;
$returndata = array();

$validator = 'success' ;

	
	//test
$sql1 = "SELECT * FROM `users` WHERE `userId` = '".$userId."' ";

		//echo $sql1;

		$result2 = $connection->query($sql1);

		if ($result2->num_rows > 0) {
		    // output data of each row
		    			
				     while($row = $result2->fetch_assoc()) {
				     	$validator = 'success' ;
		    			$returndata[] = array(
					      
					         'userId' => $row['userId'],
					        'phoneNumber' => $row['phoneNumber'],
					        'email' => $row['email'],
					        'city' => $row['city'],
					        'address' => $row['address'],
					        
					        'validator' => $validator
					    );

		    			}
     }
     else{

$validator = 'fail' ;
$returndata = array(
					      
					         
					        'validator' => $validator
					    );


     }


     echo json_encode($returndata);



?>