<?php 
require("../dbConnection.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$userId = $request['userId'] ;
$returndata = array();

$validator = 'success' ;

	
	//testSELECT * FROM `cart` WHERE `userId` like "106" and `month` like "2016/08"
$sql1 = "SELECT * FROM `cart` WHERE `userId` like '".$userId."' and  `month`= '".date("Y/m")."'";

		//echo $sql1;

		$result2 = $connection->query($sql1);

		if ($result2->num_rows > 0) {
		    // output data of each row
		    			
				     while($row = $result2->fetch_assoc()) {
				     	$validator = 'success' ;
		    			$returndata[] = array(
					      	'userId' => $row['userId'],
					      	'userEmail' => $row['userEmail'],
					         'productId' => $row['productId'],
					        'productName' => $row['productName'],
					        'productQuantity' => $row['productQuantity'],
					        'productDescription' => $row['productDescription'],
					        'unitCostPrice' => $row['unitCostPrice'],
					        'productCatergory' => $row['productCatergory'],
					        'month' => $row['month'],
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