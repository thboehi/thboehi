<?php
header('Content-type: text/html; charset=utf-8');

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Récupérer les données du formulaire
    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $entreprise = isset($_POST["entreprise"]) ? $_POST["entreprise"] : 'Non spécifié';
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Mettez votre adresse email ici (destinataire principal)
    $to = "thoma@thbo.ch";

    // Adresse email pour la copie (CC)
    $cc = $email;

    // Sujet de l'email
    $subject = "Nouveau formulaire de contact";

    // Corps de l'email
    $email_body = "Vous avez reçu un nouveau formulaire de contact:\n\n";
    $email_body .= "Nom: " . $name . "\n";
    $email_body .= "Prénom: " . $surname . "\n";
    $email_body .= "Entreprise: " . $entreprise . "\n";
    $email_body .= "Téléphone: " . $phone . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Message: " . $message . "\n";

    // Entêtes de l'email
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Cc: " . $cc . "\r\n";
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

    // Envoyer l'email
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Votre message a été envoyé avec succès.";
    } else {
        echo "Une erreur est survenue lors de l'envoi de l'email.";
    }

} else {
    // Le formulaire n'a pas été soumis, vous pouvez rediriger l'utilisateur ou afficher un message d'erreur.
    echo "Le formulaire n'a pas été soumis.";
}
?>
