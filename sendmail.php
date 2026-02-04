<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $to = "your-email@gmail.com";   // 🔴 CHANGE THIS TO YOUR EMAIL
    $subject = "New Contact Form Enquiry - Urban Real Estate";

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message: $message\n";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Message failed to send!'); window.location.href='contact.html';</script>";
    }
}
?>
