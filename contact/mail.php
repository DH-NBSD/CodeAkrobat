<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Daten aus dem Formular abgreifen
    // WICHTIG: "name" muss mit dem "name"-Attribut im HTML übereinstimmen
    $name = strip_tags(trim($_POST["name"])); 
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"])); // Zusätzlicher Schutz

    // 2. Empfänger-Konfiguration
    $recipient = "info@codeakrobat.de"; 
    $subject = "Neue Anfrage von CodeAkrobat: $name";

    // 3. E-Mail Inhalt
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Nachricht:\n$message\n";

    // 4. E-Mail Header (Professionelles Format)
    $email_headers = "From: " . $name . " <" . $email . ">\r\n";
    $email_headers .= "Reply-To: " . $email . "\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Senden
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Erfolg
        header("Location: ../index.html?status=success#contact");
    } else {
        // Fehler
        header("Location: ../index.html?status=error#contact");
    }
} else {
    // Direkter Aufruf der Datei ohne Formular
    header("Location: ../index.html");
}
?>
