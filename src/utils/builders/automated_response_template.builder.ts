import { AutomatedResponse} from "src/types/types";

export const automated_response_template = (template: AutomatedResponse): string => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <title>Message Received - Syncventory</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      /* Reset styles for email clients */
      body, p, h1, h2, h3, h4, h5, h6, table, td {
        margin: 0;
        padding: 0;
        font-family: 'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      
      body {
        width: 100% !important;
        height: 100% !important;
        margin: 0;
        padding: 0 !important;
        -webkit-text-size-adjust: none;
        background-color: #f5f7fa;
        color: #333;
      }
      
      /* Base styles */
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      
      .header {
        background-image: url('https://firebasestorage.googleapis.com/v0/b/pros-finder.appspot.com/o/Email%20Background.png?alt=media&token=011169cb-face-4c7f-899f-cb5aaf7a8f91');
        background-position: center;
        background-size: cover;
        padding: 40px 20px;
        text-align: center;
      }
      
      .logo {
        width: 100px;
        height: auto;
        margin-bottom: 20px;
      }
      
      .header-title {
        color: #ffffff;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      
      .header-subtitle {
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        font-weight: 400;
        max-width: 80%;
        margin: 0 auto;
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .greeting {
        font-size: 24px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 20px;
      }
      
      .message {
        font-size: 16px;
        line-height: 1.6;
        color: #4a5568;
        margin-bottom: 25px;
      }
      
      .footer {
        background-color: #f8fafc;
        padding: 30px;
        text-align: center;
      }
      
      .footer-text {
        font-size: 14px;
        color: #718096;
        margin-bottom: 15px;
      }
      
      .footer-link {
        color: #3c55da;
        text-decoration: none;
      }
      
      .social-links {
        margin-top: 20px;
      }
      
      .social-icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin: 0 5px;
      }
      
      .copyright {
        font-size: 12px;
        color: #a0aec0;
        margin-top: 20px;
      }
      
      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          border-radius: 0;
        }
        
        .header {
          padding: 30px 15px;
        }
        
        .header-title {
          font-size: 24px;
        }
        
        .header-subtitle {
          font-size: 14px;
          max-width: 90%;
        }
        
        .content {
          padding: 30px 20px;
        }
        
        .greeting {
          font-size: 22px;
        }
        
        .message {
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <table class="container" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td>
          <!-- Header Section -->
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td class="header">
                <img 
                  src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/big-logo.png" 
                  alt="Syncventory Logo" 
                  class="logo"
                />
                <h1 class="header-title">Automated Response</h1>
                <p class="header-subtitle">We've received your message and will get back to you soon</p>
              </td>
            </tr>
          </table>
          
          <!-- Content Section -->
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td class="content">
                <h2 class="greeting">Hi ${template.user.customer_name},</h2>
                
                <p class="message">
                  Thank you for reaching out. We've received your message, and our team is currently reviewing it.
                </p>
                
                <p class="message">
                  We'll get back to you as soon as possible. In the meantime, you might find quick answers in our FAQs.
                </p>
                
                <p class="message">
                  We appreciate your patience and look forward to assisting you.
                </p>
                
                <p class="message">
                  Warm regards,<br />
                  <strong>Syncventory Support Team</strong>
                </p>
                
           
                <p class="message">
                  For more information, please visit: <a href="${template.link}" class="footer-link">${template.link}</a>
                </p>
            
              </td>
            </tr>
          </table>
          
          <!-- Footer Section -->
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td class="footer">
                <p class="footer-text">
                  This email was sent to you as a registered user on Syncventory. To update your email preferences or unsubscribe, 
                  <a href="#" class="footer-link">click here</a>.
                </p>
                
                <div class="social-links">
                  <a href="#" target="_blank">
                    <img 
                      src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/social/twitter.png" 
                      alt="Twitter" 
                      class="social-icon"
                    />
                  </a>
                  <a href="#" target="_blank">
                    <img 
                      src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/social/linkedin.png" 
                      alt="LinkedIn" 
                      class="social-icon"
                    />
                  </a>
                  <a href="#" target="_blank">
                    <img 
                      src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/social/facebook.png" 
                      alt="Facebook" 
                      class="social-icon"
                    />
                  </a>
                </div>
                
                <p class="copyright">
                  © <script>document.write(new Date().getFullYear())</script> Syncventory. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}