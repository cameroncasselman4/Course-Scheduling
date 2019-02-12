<?php

$host = 'w2k12-compscidb.academia.sjfc.edu';
$user = 'jre02797';
$password = 'jre02797';
$database = 'jre02797';

try {
    $dbh = new PDO("mysql:host=$host;dbname=$database", $user, $password);
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


// For some reason this one wasn’t working so I had to find a different one
/*
//$HostName = "w2k12-compscidb.academia.sjfc.edu";
//    $HostUser = "jre02797";
//    $HostPass = "jre02797";
//    $DatabaseName = "jre02797";
//    $conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
//    
//    if ($conn->connect_error) {
//        die("Connection failed: " . $conn->connect_error);
//    }
//    
//    $query = "select * from courses2;";
//    $result = $conn->query($query);
//    
//    if ($result->num_rows > 0) {
//        // output data of each row
//        while($row = $result->fetch_assoc()) {
//            echo "ins: " . $row["instructor"]. "<br>";
//        }
//    } else {
//        echo "0 results";
//    }
//    $conn->close();
*/