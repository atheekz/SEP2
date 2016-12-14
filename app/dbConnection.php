<?php


@mysql_connect('localhost','root','') or die('Couldn\'t connect to the Database!');
@mysql_select_db('sliit_canteen') or die('Couldn\'t connect to the Database!');
@$connection = mysqli_connect('localhost', 'root', '', 'sliit_canteen');
												?>