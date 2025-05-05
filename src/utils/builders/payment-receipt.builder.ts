import { PaymentReceiptProcessor } from 'src/types/types';

export const payment_receipt_template = (
  template: PaymentReceiptProcessor,
): string => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Receipt</title>
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
      .tb-div {
        margin-top: 10px;
        /* padding-left: 10px; */

        padding-bottom: 10px;
      }
      .tb-div2 {
        margin-top: 10px;
        padding-left: 10px;

        padding-bottom: 10px;
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
              <h2>Payment Successful!</h2>
            </div>
            <!-- <div class="padlock-img-div">
              <img
                src="https://syncventory-aws.s3.us-east-2.amazonaws.com/template/email/password-reset.png"
              />
            </div> -->
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
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
                <td style="padding-left: 20px">
                  <div style="width: 60%">
                    <p>Dear ${template.customer.customer_name}</p>
                    <p style="margin-top: 6px; color: #667085">
                      We are happy to let you know that your payment for order
                      ${template.order_id} has been verified
                    </p>
                  </div>
                </td>

                <td
                  style="
                    text-align: start;
                    vertical-align: middle;
                    padding-right: 20px;
                  "
                >
                  <div>
                    <p>Merchant</p>
                    <p style="margin-top: 6px; color: #667085">
                      ${template.business.business_name}
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding-left: 20px; padding-right: 20px">
          <div style="margin-top: 30px">
            <p>Here is your receipt details:</p>
          </div>
        </td>
      </tr>
      <!-- First Table -->
      <tr>
        <td style="padding-left: 20px; padding-right: 20px">
          <div
            style="
              background-color: #f0f3f6;

              padding-left: 10px;
              padding-top: 10px;
              padding-bottom: 10px;
            "
          >
            <p style="width: 100%">Receipt Information</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div style="padding-left: 20px">
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
                <td>
                  <div>
                    <p>Receipt Number</p>
                    <p style="margin-top: 6px; color: #667085">${
                      template.receipt_number
                    }</p>
                  </div>
                </td>

                <td
                  style="
                    text-align: start;
                    vertical-align: middle;
                    padding-right: 20px;
                  "
                >
                  <div>
                    <p>Date Issued</p>
                    <p style="margin-top: 6px; color: #667085">${
                      template.date_issued
                    }</p>
                  </div>
                </td>
                <td
                  style="
                    text-align: start;
                    vertical-align: middle;
                    padding-right: 20px;
                  "
                >
                  <div>
                    <p>Payment Status</p>
                    <p style="margin-top: 6px; color: #667085">${
                      template.payment_status
                    }</p>
                  </div>
                </td>
              </tr>
              <br />
              <tr>
                <td>
                  <div class="tb-div">
                    <p>Payment method</p>
                    <p style="margin-top: 6px; color: #667085">${
                      template.payment_method
                    }</p>
                  </div>
                </td>

                <td
                  style="
                    text-align: start;
                    vertical-align: middle;
                    padding-right: 20px;
                  "
                >
                  <div class="tb-div">
                    <p>Cashier</p>
                    <p style="margin-top: 6px; color: #667085">
                      ${template.cashier_name}
                    </p>
                  </div>
                </td>
                <td
                  style="
                    text-align: start;
                    vertical-align: middle;
                    padding-right: 20px;
                  "
                >
                  <div class="tb-div">
                    <p>Date Issued</p>
                    <p style="margin-top: 6px; color: #667085">${
                      template.date_issued
                    }</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <!-- End of First Table -->

      <!-- Second Table -->
      <tr>
        <td style="padding-left: 20px; padding-right: 20px">
          <div
            style="
              background-color: #f0f3f6;
              margin-top: 50px;
              padding-left: 10px;
              padding-top: 10px;
              padding-bottom: 10px;
            "
          >
            <p style="width: 100%">Customer Information</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div style="padding-left: 20px">
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
                <td>
                  <div>
                    <p>Customer Name</p>
                    <p style="margin-top: 6px; color: #667085">
                      ${template.customer.customer_name}
                    </p>
                  </div>
                </td>

                <td
                  style="
                    text-align: start;
                    vertical-align: middle;
                    padding-right: 20px;
                  "
                >
                  <div>
                    <p>Customer Address</p>
                    <p style="margin-top: 6px; color: #667085">
                      ${template.customer.address}
                    </p>
                  </div>
                </td>
              </tr>
              <br />
              <tr>
                <td>
                  <div class="tb-div">
                    <p>Email</p>
                    <p style="margin-top: 6px; color: #667085">
                      ${template.customer.email_address}
                    </p>
                  </div>
                </td>

                <td
                  style="
                    text-align: start;
                    vertical-align: middle;
                    padding-right: 20px;
                  "
                >
                  <div class="tb-div">
                    <p>Phone Number</p>
                    <p style="margin-top: 6px; color: #667085">
                      ${template.customer.phone_number}
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <!-- End of Second Tabel -->

      <!-- Order Table -->

      <tr>
        <td style="padding-left: 20px; padding-right: 20px"></td>
      </tr>
      <tr>
        <td style="padding-left: 20px; padding-right: 20px; padding-top: 20px">
          <div
            style="
              padding: 20px;
              border: 2px solid #efeff4;
              margin-top: 30px;
              border-radius: 10px;
            "
          >
            <div
              style="
                padding-left: 10px;
                padding-top: 10px;
                padding-bottom: 10px;
              "
            >
              <p style="width: 100%">Order Details</p>
            </div>
            <div style="">
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
                  <td>
                    <div
                      style="
                        background-color: #fbfbfd;
                        padding-left: 10px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <p style="font-weight: 600; color: #8d98af">
                        Product Name
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      style="
                        background-color: #fbfbfd;
                        padding-left: 10px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <p style="font-weight: 600; color: #8d98af">Quantity</p>
                    </div>
                  </td>
                  <td>
                    <div
                      style="
                        background-color: #fbfbfd;
                        padding-left: 10px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <p style="font-weight: 600; color: #8d98af">Unit Price</p>
                    </div>
                  </td>
                  <td>
                    <div
                      style="
                        background-color: #fbfbfd;
                        padding-left: 10px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <p style="font-weight: 600; color: #8d98af">Total</p>
                    </div>
                  </td>
                </tr>
                <br />
                <!-- <hr style="color: #efeff4; width: 94%" /> -->
           ${template.products.map((product) => {
             return `<tr>
                  <td style="border-bottom: 1px solid #efeff4">
                    <div class="tb-div2">
                      <p>${product.product_name}</p>
                      <p style="margin-top: 6px; color: #667085">167359tj</p>
                    </div>
                  </td>
                  <td style="border-bottom: 1px solid #efeff4">
                    <div class="tb-div2">
                      <p>${product.quantity}</p>
                    </div>
                  </td>
                  <td style="border-bottom: 1px solid #efeff4">
                    <div class="tb-div2">
                      <p>${product.price}</p>
                    </div>
                  </td>
                  <td style="border-bottom: 1px solid #efeff4">
                    <div class="tb-div2">
                      <p>${product.total_price}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>`;
           })}   
            <div style="margin-top: 20px">
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
                  <td>
                    <p style="font-weight: 600; font-size: 20px">Order total</p>
                  </td>
                  <td
                    style="
                      text-align: right;
                      vertical-align: middle;
                      padding-right: 20px;
                    "
                  >
                    <p style="font-weight: 600; font-size: 20px">${
                      template.order_total
                    }</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
      <!-- End Of Order Table -->

      <!-- Note -->

      <tr>
        <td>
          <div class="white-area">
            <hr style="margin-top: 30px; color: #efeff4; width: 100%" />
            <!-- <h2>Dear Diana,</h2> -->

            <p style="margin-top: 30px; color: #000000">Note</p>
            <p style="margin-top: 5px; color: #667085">
             ${template.note}
            </p>
          </div>
        </td>
      </tr>

      <!-- Semi Footer -->
      <tr>
        <td>
          <div class="white-area">
            <hr style="margin-top: 30px; color: #efeff4; width: 100%" />

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
</html>
`;
};
