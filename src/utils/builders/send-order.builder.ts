import { OrderDetailsProcessor } from 'src/types/types';

export const send_order_template = (
  template: OrderDetailsProcessor,
): string => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Sales</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet"
      />
      <style>
        /* Add your CSS styles here */
        * {
          margin: 0;
  
          /* line-height: 1.5; */
          font-family: "Red Hat Display", sans-serif;
          font-optical-sizing: auto;
  
          font-style: normal;
        }
  
        body {
          width: 100% !important;
          height: 100% !important;
          margin: 0;
          padding: 20px !important;
          -webkit-text-size-adjust: none;
          background-color: #f1f1f1;
        }
  
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
  
        table.container {
          max-width: 800px;
          padding: 20px;
          margin: 0 auto;
          background-color: #ffffff;
        }
  
        .logo-div img {
          /* display: block;
          margin: 100px auto; */
          width: 150px;
        }
  
        .title {
          text-align: center;
          font-size: 34px;
          margin-bottom: 20px;
        }
  
        .header {
          text-align: center;
          font-size: 48px;
          font-weight: 600;
          margin-bottom: 30px;
        }
  
        .contour-area {
          padding: 20px;
        }
  
        .highlighted-p {
          padding: 15px;
          background: rgba(255, 255, 255, 0.35);
          width: 65%;
          margin: 0 auto;
        }
  
        .white-area {
          padding: 20px;
          font-size: 17px;
          font-weight: 400;
        }
  
        .white-area h2 {
          font-size: 32px;
          font-weight: 400;
          margin-top: 20px;
        }
  
        .white-area button {
          color: white;
          font-size: 20px;
          font-weight: 600;
          width: 70%;
          display: block;
          margin: 30px auto;
          height: 60px;
          border-radius: 8px;
          border: none;
          outline: none;
          background-color: #3c55da;
          font-family: "Red Hat Display", sans-serif;
        }
  
        footer {
          background: #edf1ff;
          padding: 20px;
          /* border-top: 2px solid rgba(0, 0, 0, 0.2); */
          font-size: 16px;
          text-align: start;
        }
  
        footer a {
          text-decoration: none;
          color: #0046ff;
        }
  
        .welcome-text-area {
          display: flex;
          flex-direction: column;
          align-items: start;
        }
        .welcome-text-area h2 {
          font-size: 20px;
          font-weight: 600;
          margin-top: 1rem;
        }
        .padlock-img-div img {
          width: 100%;
          max-width: 300px;
          display: block;
          margin: 30px auto;
        }
        .verification-link {
          color: #0046ff;
          text-decoration: none;
          background-color: #f0f3f6;
          padding: 10px 10px;
          border-radius: 5px;
          width: fit-content;
        }
        .all-right-reserved {
          background: #edf1ff;
          /* padding: 20px; */
          /* border-top: 2px solid rgba(0, 0, 0, 0.2); */
          font-size: 16px;
          text-align: start;
          /* display: inline-flex; */
          overflow: hidden;
  
          width: 100%;
        }
        .social-links {
          float: right;
        }
      </style>
    </head>
    <body>
      <table class="container" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <div class="contour-area">
              <div class="logo-div">
                <img
                  src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/big-logo.png"
                />
              </div>
              <div class="welcome-text-area">
                <h2>New Sale Order</h2>
              </div>
              <div class="padlock-img-div">
                <img
                  src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/responsive/order-notification-sm.png"
                />
              </div>
            </div>
          </td>
        </tr>
  
        <tr>
          <td>
            <div class="white-area">
              <h2>Dear ${template.name},</h2>
              <br />
  
              <p style="color: #667085">
                Congratulations! You have just made a new sale. 
              </p>
              <h1 style="font-size: 18px; font-weight: 600; margin-top: 20px">
                Here are the details of the sale; 
              </h1>
            </div>
          </td>
        </tr>
  
        <tr class="white-area" style="background-color: #fbfbfd">
          <td class="white-area">
            <table style="width: 100%" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="">
                    <p style="color: #667085">Order Number:</p>
                  </td>
                  <td>
                    <p>${template.order_id}</p>
                  </td>
                </tr>
                <tr style="border-bottom: 2px solid #efeff4">
                  <td>
                    <div style="margin-top: 12px; margin-bottom: 12px">
                      <p>Product Details</p>
                    </div>
                  </td>
                </tr>
                ${template.products.map((product) => {
                  return `
                <tr style="border-bottom: 2px solid #efeff4">
                  <td style="width: 25%; padding: 10px 10px 10px 0">
                    <div
                      style="
                        width: 100%;
                        height: 100px;
                        /* border: 1px solid; */
                        border-radius: 5px;
                      "
                    >
                  <img src="${product.image_link}" alt="${product.product_description}">
                  </div>
                  </td>
                  <td style="width: 25%; padding: 10px 10px 10px 0">
                    <div>
                      <h4>${product.product_name}</h4>
                      <div
                        style="
                          width: 49px;
                          height: 21px;
                          border: 2px solid #efeff4;
                          border-radius: 5px;
                          text-align: center;
                          padding: 5px;
                          display: inline-block;
                        "
                      >
                        <p>${product.variant_name}</p>
                      </div>
                      <div
                        style="
                          width: 49px;
                          height: 21px;
                          border: 2px solid #efeff4;
                          border-radius: 5px;
                          text-align: center;
                          padding: 5px;
                          display: inline-block;
                          margin-top: 8px;
                        "
                      >
                        <p>${product.quantity} x $${product.price}</p>
                      </div>
                    </div>
                  </td>
                  <td style="width: 50%">
                    <div
                      style="
                        position: relative;
                        bottom: 0;
                        height: 100px;
                        width: 100%;
                      "
                    >
                      <p
                        style="
                          position: absolute;
                          bottom: 0;
                          right: 0;
                          font-size: 20px;
                        "
                      >
                        ${product.total_price}
                      </p>
                    </div>
                  </td>
                </tr>
                `;
                })}
                <tr>
                  <td style="width: 50%">
                    <p style="margin-top: 10px; color: #667085">Sub Total</p>
                  </td>
                  <td style="width: 50%">
                    <p style="text-align: right; margin-top: 10px">$${template.total_order_price}</p>
                  </td>
                </tr>

                
                <tr>
                  <td style="width: 50%">
                    <p style="margin-top: 10px; color: #667085">Vat</p>
                  </td>
                  <td style="width: 50%">
                    <p style="text-align: right; margin-top: 10px">$${template.vat}</p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 50%">
                    <p style="margin-top: 10px; color: #667085">Shipping</p>
                  </td>
                  <td style="width: 50%">
                    <p style="text-align: right; margin-top: 10px">$${template.shipping_fee}</p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 50%">
                    <p style="margin-top: 10px; color: #667085">Grand Total</p>
                  </td>
                  <td style="width: 50%">
                    <p style="text-align: right; margin-top: 10px">$${template.total_order_price}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
                
        <tr>
          <td>
            <div class="white-area">
              <hr style="margin-top: 30px; color: #efeff4; width: 100%" />
              <p style="margin: 10px 0; font-weight: 400; font-size: 16px">
                Please review the order details and fulfill the order promptly. 
              </p>
              <p style="font-weight: 400; font-size: 16px">
                If you were not involved in this transaction, please contact our
                support team. 
              </p>
              <p style="font-weight: 400; font-size: 16px; margin-top: 5px">
                If you need assistance regarding this sale or any aspect of your
                selling experience on Syncventory, please do not hesitate to
                contact our support team.
              </p>
              <p style="margin: 30px 0; color: #000000">
                Thank you for choosing Syncventory. 
              </p>
              <p style="margin: 30px 0">Best Regards, <br />Syncventory Team</p>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <footer>
              <p style="text-align: start; font-size: inherit; color: #8d98af">
                We hope you find our emails useful and informative. If you would
                like to stop receiving emails from us, you can unsubscribe at any
                time by
                <a href="" style="text-decoration: none">Clicking here</a>
              </p>
  
              <!-- <p style="text-align: start; margin-top: 20px; font-size: inherit">
                Use of the service and website is subject to our
                <a href="" style="text-decoration: none">Terms of Use</a> and
                <a href="" style="text-decoration: none">Privacy Statement</a>
              </p> -->
            </footer>
          </td>
        </tr>
        <tr>
          <td>
            <div class="all-right-reserved">
              <table
                role="presentation"
                style="
                  width: 100%;
                  border-spacing: 0;
                  border-collapse: collapse;
                  padding: 20px;
                "
              >
                <tr>
                  <td
                    style="
                      text-align: left;
                      vertical-align: middle;
                      padding-left: 20px;
                    "
                  >
                    <p style="margin: 0; font-size: inherit; color: #004ef1">
                      © 2023 Syncventory.
                    </p>
                  </td>
  
                  <td
                    style="
                      text-align: right;
                      vertical-align: middle;
                      padding-right: 20px;
                    "
                  >
                    <a href="" style="text-decoration: none">
                      <img
                        style="width: 30px; height: 30px; margin: 0 3px"
                        src="https://mycrossriverapp.s3.us-east-2.amazonaws.com/social/facebook.png"
                        alt="Facebook"
                      />
                    </a>
                    <a href="" style="text-decoration: none">
                      <img
                        style="width: 30px; height: 30px; margin: 0 3px"
                        src="https://mycrossriverapp.s3.us-east-2.amazonaws.com/social/linkedin.png"
                        alt="LinkedIn"
                      />
                    </a>
                    <a href="" style="text-decoration: none">
                      <img
                        style="width: 30px; height: 30px; margin: 0 3px"
                        src="https://mycrossriverapp.s3.us-east-2.amazonaws.com/social/twitter.png"
                        alt="Twitter"
                      />
                    </a>
                    <a href="" style="text-decoration: none">
                      <img
                        style="width: 30px; height: 30px; margin: 0 3px"
                        src="https://mycrossriverapp.s3.us-east-2.amazonaws.com/social/instagram.png"
                        alt="Instagram"
                      />
                    </a>
                    <a href="" style="text-decoration: none">
                      <img
                        style="width: 30px; height: 30px; margin: 0 3px"
                        src="https://mycrossriverapp.s3.us-east-2.amazonaws.com/social/youtube.png"
                        alt="YouTube"
                      />
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};
