<?php
// conexao.php
$host = 'localhost';
$user = 'usuario';
$pass = 'senha';
$db = 'banco_dados';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>