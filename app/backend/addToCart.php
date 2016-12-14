<?php 
require("../dbConnection.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$userId = $request->userId;
$userEmail = $request->userEmail;
$item = $request->item;
$quantity = $request->quantity;

//$pass = $request->password;
$validator = "success" ;
//echo json_encode($request);


$sql = "INSERT INTO `cart`(`userId`, `userEmail`, `productId`, `productName`, `productCatergory`, `productDescription`, `unitCostPrice`, `productQuantity`, `unitSellingPrice`, `date`, `month`) VALUES ('".$userId."','".$userEmail."','".$item->id."','".$item->name."','".$item->category."','".$item->description."','".$item->unitCostPrice."','".$quantity."','".$item->unitSellingPrice."','".date("d")."','".date("Y/m")."')";

//echo $sql;

if ($connection->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $connection->error;
}
//mail



$sql1 = "SELECT * FROM `userslist` WHERE `userId` = '".$userId."' and `productId`= '".$item->id."'  and `month`= '".date("Y/m")."'";

								//echo $sql;

								$result2 = $connection->query($sql1);

								if ($result2->num_rows != 1) {
								    // output data of each row
								    			
								       $sql = "INSERT INTO `userslist`(`userId`, `userEmail`, `productId`, `productName`,`productCatergory`,`productQuantity`,`statusAddedToCart`,`date`,`month`) VALUES ('".$userId."','".$userEmail."','".$item->id."','".$item->name."','".$item->category."','".$quantity."','true','".date("Y/m/d")."','".date("Y/m")."')";
								//echo $sql;
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
								    $sql = "UPDATE `userslist` SET `productQuantity` = '".$quantity."' ,`statusAddedToCart`= 'true' WHERE `userId` = '".$userId."' and
								     `productId`= '".$item->id."' and `month` ='".date("Y/m")."' ";
								//echo $sql;
											if ($connection->query($sql) === TRUE) {
											    echo "New record created successfully";
											     $validator = "success" ;
											} else {
											    echo "Error: " . $sql . "<br>" . $connection->error;
											     $validator = "fail" ;
											}
								}
						//test
					
echo json_encode($returndata);

?>