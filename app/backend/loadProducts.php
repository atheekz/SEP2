<?php 
require("../dbConnection.php");
require ("./sendMail/PHPMailerAutoload.php");
$postdata = file_get_contents("php://input");

//echo json_encode($request);

$validator = 'success' ;
$sql = "SELECT * FROM `products` ";

//echo $sql;
$returndata = array();

$result = $connection->query($sql);

if ($result->num_rows > 1) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
  
            
	$returndata[] = array(
					      
					         'id' => $row['id'],
					        'name' => $row['name'],
					        'description' => $row['description'],
					        'category' => $row['category'],
					        'unitSellingPrice' => $row['unitSellingPrice'],
					        'unitCostPrice' => $row['unitCostPrice'],
					        'validator' => $validator
					    );
        }


} else {
   $validator = "fail" ;
   $returndata = array(
					        'email' => '',
					        'token' => '',
					        'validator' => $validator
					    );
}

					
echo json_encode($returndata);



?>