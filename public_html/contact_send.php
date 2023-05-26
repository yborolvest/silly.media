<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sending message...</title>
</head>
<body>
    <p>...</p>
<?php

define("RECAPTCHA_V3_SECRET_KEY", '6LdCwTwmAAAAAG0lI620dGAncSBxc8RwnCFEl5aK');

if (isset($_POST['email']) && $_POST['email']) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
} else {
    // set error message and redirect back to form...

    header('location: https://yborolvest.nl/');

    exit;

}

$token = $_POST['g-recaptcha-response'];
$action = $_POST['action'];

// call curl to POST request

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => RECAPTCHA_V3_SECRET_KEY, 'response' => $token)));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

curl_close($ch);

$arrResponse = json_decode($response, true);

// verify the response

if($arrResponse["success"] == '1' && $arrResponse["action"] == $action && $arrResponse["score"] >= 0.5) {

    // valid submission

    $errors = '';
    $myemail = 'ybo@yborolvest.nl';
    if(empty($_POST['name'])  || 
    empty($_POST['email']) || 
    empty($_POST['message']))
    {
        $errors .= "\n Error: all fields are required";
    }

    $name = $_POST['name']; 
    $email_address = $_POST['email']; 
    $message = $_POST['message']; 

    if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address))
    {
        $errors .= "\n Error: Invalid email address";
    }

    if( empty($errors))
    {
    $to = $myemail;
    $email_subject = "Contact form submission: $name";
    $email_body = "You have received a new message. ".
    " Here are the details:\n Name: $name \n ".
    "Email: $email_address\n Message \n $message";

    $headers = "From: $myemail\n";
    $headers .= "Reply-To: $email_address";
    mail($to,$email_subject,$email_body,$headers);


    header('Location: https://yborolvest.nl/?email=succes');

}

} else {

    // spam submission

    header('Location: https://yborolvest.nl/?email=fail');

} ?>
    
</body>
</html>
