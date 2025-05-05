import { EmailProcessor } from 'src/types/types';

export const password_reset_template = (template: EmailProcessor): string => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap" rel="stylesheet">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap');

        body {
            font-family: 'Urbanist', sans-serif;
            color: #000;
        }

        .header {
            font-size: 22px;
            font-weight: 500;
            text-align: center;
        }

        .content-1 {
            font-size: 20px;
            font-weight: 500;
        }

        .content-2 {
            font-size: 16px;
        }


        .footer-content {
            font-size: 12px;
            text-align: center;
        }

        a {
            text-decoration: none;
            color: #3C55DA;
        }

        .button {
            display: inline-block;
            background-color: #3C55DA;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            padding: 12px 100px;
        }

        .links{
            color: #3C55DA;
        }

        /* Media Queries */
        @media only screen and (max-width: 600px) {
            .header {
                font-size: 20px;
            }

            .content-1 {
                font-size: 18px;
            }

            .content-2 {
                font-size: 15px;
            }

            .button {
                padding: 12px 60px;
            }

            .footer-content {
                font-size: 11px;
            }
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #ffffff;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
            <td valign="top"
                style="padding: 20px; background-image: url('https://firebasestorage.googleapis.com/v0/b/pros-finder.appspot.com/o/Email%20Background.png?alt=media&token=011169cb-face-4c7f-899f-cb5aaf7a8f91'); background-position: center; background-size: cover; height: 330px; margin-bottom: 20px;">
                <!-- Logo -->
                <img src="https://firebasestorage.googleapis.com/v0/b/pros-finder.appspot.com/o/Syncventory%20logo%20mini.png?alt=media&token=419aaabf-496c-4699-86f1-76808bc180df"
                    alt="Logo"
                    style="display: block; max-width: 100px; height: auto; margin-bottom: 20px; margin-left: 0;">

                <!-- Content goes here -->
                <img src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/responsive/password-reset-sm.png"
                    alt="Lock Image" style="display: block; max-width: 250px; height: auto; margin: 0 auto;">
                <p class="header">Password Reset Request</p>
            </td>
        </tr>

    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
            <td valign="top" style="padding: 20px;">
                <!-- Additional content goes here -->
                <p class="content-1">Hi ${template.name},</p>
                <p class="content-2">A request to reset your account password has been received.</p>
                <p class="content-2">To proceed with the password reset, please click the button below to reset your
                    password.</p>
                <p style="text-align: center;">
                    <a id="reset-button" class="button" target="_blank" href=${template.link}>Reset Password</a>
                </p>
                <p class="content-2">Please note that the password reset link will expire after 30 minutes. If you fail to reset your password within this time frame, the link will become invalid, and you will need to initiate another password reset request. </p>
                <p class="content-2">For enhanced security, we recommend changing your password or enabling two-factor authentication (2FA) if you did not initiate a password reset. This will protect your account from unauthorized access.</p>
                <p class="content-2">For further assistance or if you have any questions, please contact our <span class="links">Support Team</span></p>
                <p class="content-2">Best Regards,<br>Syncventory Team</p>
            </td>
        </tr>
    </table>
    <br />
    <br />
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
        style="max-width: 600px;background-color: #E4EFF1;">
        <tr>
            <td valign="top" style="padding: 20px;">
                <p class="footer-content">This email was sent to you as a registered user on Syncventory. To update your
                    email subscription preferences or unsubscribe <a href="#">click here.</a></p>
                <p class="footer-content">Use of the service and website is subject to our <a href="#">Terms of Use</a>
                    and <a href="#">Privacy Statement.</a></p>
                <p class="footer-content">© <span id="current-year"></span> Syncventory. All rights reserved</a></p>
            </td>
        </tr>
    </table>
    <script>
        // Get the current year
        var currentYear = new Date().getFullYear();
        // Set the current year in the HTML
        document.getElementById('current-year').textContent = currentYear;
    </script>
</body>
</html>`;
};
