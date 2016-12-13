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
//echo json_encode($request);DELETE FROM `cart` WHERE `userId`like "106" and `productId` like and `month`


$sql = "UPDATE `userslist` SET `productQuantity`='".$quantity."' WHERE `userId` like '".$userId."' and `productId` like '".$item->productId."' and `month` like '".date("Y/m")."' ";

echo $sql;

if ($connection->query($sql) === TRUE) {
    echo " successfully edited";
} else {
    echo "Error: " . $sql . "<br>" . $connection->error;
}
//mail



$sql1 ="UPDATE `cart` SET `productQuantity`='".$quantity."' WHERE `userId` like '".$userId."' and `productId` like '".$item->productId."' and `month` like '".date("Y/m")."' ";

								echo $sql;
//echo $sql;

if ($connection->query($sql1) === TRUE) {
    echo " successfully deleted";
} else {
    echo "Error: " . $sql1 . "<br>" . $connection->error;
}
//mail

							
						//test
					
echo json_encode($validator);

?>