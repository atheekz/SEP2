<?php 
require("../dbConnection.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
/*$userId = "1";
$userEmail = "asdsad";*/

$req =$request['itemsselected'];
$userId = $request['userId'] ;
$email = $request['userEmail'];

/*
*
*check whather the product is already in the list 
*
*/

$validator = 'success' ;


/*echo $req;
echo $userId;
echo $email;*/
   foreach($req as $item) {
      					
   						//test
								$sql1 = "SELECT * FROM `userslist` WHERE `userId` = '".$userId."' and `productId`= '".$item['id']."'  and `month`= '".date("Y/m")."'";

								//echo $sql;

								$result2 = $connection->query($sql1);

								if ($result2->num_rows != 1) {
								    // output data of each row
								    			
								       $sql = "INSERT INTO `userslist`(`userId`, `userEmail`, `productId`, `productName`,`productCatergory`,`date`,`month`) VALUES ('".$userId."','".$email."','".$item['id']."','".$item['name']."','".$item['category']."','".date("Y/m/d")."','".date("Y/m")."')";
								/*echo $sql;*/ 
											if ($connection->query($sql) === TRUE) {
											    echo "New record created successfully";
											     $validator = "success" ;
											} else {
											    echo "Error: " . $sql . "<br>" . $connection->error;
											     $validator = "fail" ;
											}

								    }
								else {
								   $validator = 'alreadyAdded' ;
								}
						//test



     }


     echo json_encode($validator);
//$pass = $request->password;

//echo json_encode($request);


/*$sql = "INSERT INTO `users`(`name`, `phoneNumber`, `email`, `password`, `city`, `address`, `token`) VALUES ('".$name."','".$phone."','".$email."','".$password."','".$state."','".$address."','".$token."')";

//echo $sql;

if ($connection->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $connection->error;
}
//mail

*/


?>