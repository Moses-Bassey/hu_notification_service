import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailData, EmailSubject, NotificationTypes } from 'src/types/types';
import { NotificationService } from 'src/services/notification.service';
import { format_email_subject } from 'src/utils/helpers';
import { NotificationDataRequestDto } from 'src/dto/request/notification.data.request.dto';
import { password_reset_template } from 'src/utils/builders/password-reset.builder';
import { send_order_template } from 'src/utils/builders/send-order.builder';
import { send_order_invoice_template } from 'src/utils/builders/send-order-invoice.builder';
import { purchase_order_template } from 'src/utils/builders/purchase-order.builder';
import { payment_receipt_template } from 'src/utils/builders/payment-receipt.builder';
import { send_feedback_template } from 'src/utils/builders/send-feedback.builder';
import { sign_up_template } from 'src/utils/builders/sign-up.builder';
import { password_reset_successfully_template } from 'src/utils/builders/password-reset-success.builder';
import { complete_onboarding_template } from 'src/utils/builders/complete-onboarding.builder';
import { secure_two_fa_template } from 'src/utils/builders/secure-two-fa.builder';
import { complete_two_fa_template } from 'src/utils/builders/complete-two-fa.builder';
import { initiate_stock_transfer_template } from 'src/utils/builders/initiate-stock-transfer.builder';
import { complete_stock_transfer_template } from 'src/utils/builders/complete-stock-transfer.builder';
import { settings_changed_template } from 'src/utils/builders/settings-changed.builder';
import { notification_preference_template } from 'src/utils/builders/notification-preference-updated.builder';
import { subscription_confirmation_template } from 'src/utils/builders/subscription-confirmation.builder';
import { upcoming_plan_expiry_template } from 'src/utils/builders/upcoming-plan-expiry.builder';
import { payment_failure_template } from 'src/utils/builders/payment-failure.builder';
import { subscription_invoice_template } from 'src/utils/builders/subscription-invoice.builder';
import { subscription_plan_change_template } from 'src/utils/builders/subscription-plan-change.builder';
import { system_maintenance_template } from 'src/utils/builders/system-maintenance.builder';
import { feature_update_template } from 'src/utils/builders/features-update.builder';
import { security_alert_template } from 'src/utils/builders/security-alert.builder';
import { account_activation_template } from 'src/utils/builders/account-activation.builder';
import { automated_response_template } from 'src/utils/builders/automated_response_template.builder';
import { contact_form_template } from 'src/utils/builders/contact-form.builder';
import { mandate_activation_template } from 'src/utils/builders/mandate-authorization-link.builder';
import { get_mail_no_reply, get_mail_normal } from 'src/config/nodemailer.config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly notificationService: NotificationService,
  ) {}

  async test_email_service(receiving_email: string) {
    console.log('sending this email out...');
    try {
      return await this.mailerService.sendMail({
        to: receiving_email,
        subject: 'Testing Nest MailerModule ✔',
        text: 'welcome',
        html: '<b>welcome</b>',
      });
    } catch (e) {
      console.log(e);
    }
  }

  async email_processor(mail_data: EmailData) {
    let content = mail_data.text ?? mail_data.html;
    const email_content = this.buildHtmlEmailContent(mail_data);
    // console.log('email_content', email_content);
    if (email_content.content) {
      content = email_content.content;
    }
    // console.log('content', content);
    const is_html = email_content.is_html;
    if (is_html) {
      mail_data.html = content;
      mail_data.text = null;
    }
    if (!is_html) {
      mail_data.html = null;
      mail_data.text = content;
    }

    // console.log('mail_data_processor', mail_data);

    await this.process_email(
      mail_data,
      email_content.text_content,
      email_content.should_save,
    );
  }

  async process_email(
    mail_data: EmailData,
    content: string,
    should_save: boolean,
  ) {
    await this.sendEmail(mail_data);

    if (should_save) {
      try {
        // const content = this.buildHtmlEmailContent(mail_data);
        await this.saveOrCreateEmailNotification(mail_data, content);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async sendEmail(mail_data: EmailData) {
    console.log('sendEmail', mail_data);
    const mail_options = this.buildMailOption(mail_data);
    delete mail_options.key;
    
    // Set default sender based on email type
    if (mail_data.from) {
      switch (mail_data.key) {
        case EmailSubject.ACCOUNT_ACTIVATION:
        case EmailSubject.REQUEST_PASSWORD_RESET:
        case EmailSubject.PASSWORD_RESET_SUCCESS:
        case EmailSubject.COMPLETE_ONBOARDING:
        case EmailSubject.SECURE_TWO_FA:
        case EmailSubject.COMPLETE_TWO_FA:
        case EmailSubject.STOCK_TRANSFER_INITIATED:
        case EmailSubject.STOCK_TRANSFER_COMPLETED:
        case EmailSubject.SETTINGS_CHANGED:
        case EmailSubject.NOTIFICATION_PREFERENCE_UPDATED:
        case EmailSubject.SUBSCRIPTION_CONFIRMATION:
        case EmailSubject.UPCOMING_PLAN_EXPIRY:
        case EmailSubject.PAYMENT_FAILURE:
        case EmailSubject.SUBSCRIPTION_INVOICE:
        case EmailSubject.SUBSCRIPTION_PLAN_CHANGE:
        case EmailSubject.SYSTEM_MAINTENANCE:
        case EmailSubject.FEATURES_UPDATE:
        case EmailSubject.SECURITY_ALRET:
        case EmailSubject.MESSAGE_RECEIVED:
          mail_options.from = get_mail_no_reply();
          // Update transport for no-reply emails
          const noReplyConfig = {
            ...(this.mailerService as any).transporter.options,
            auth: {
              user: process.env.MAIL_NO_REPLY_USERNAME,
              pass: process.env.MAIL_NO_REPLY_PASSWORD,
            },
          };
          // console.log('Switching to no-reply transport config:', {
          //   ...noReplyConfig,
          //   auth: {
          //     user: noReplyConfig.auth.user,
          //     pass: noReplyConfig.auth.pass
          //   }
          // });
          // Create a new transporter with the updated config
          (this.mailerService as any).transporter = nodemailer.createTransport(noReplyConfig);
          break;
        default:
          mail_options.from = get_mail_normal();
          // Reset to normal transport
          const normalConfig = {
            ...(this.mailerService as any).transporter.options,
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
            },
          };
          // console.log('Switching to normal transport config:', {
          //   ...normalConfig,
          //   auth: {
          //     user: normalConfig.auth.user,
          //     pass: normalConfig.auth.pass
          //   }
          // });
          // Create a new transporter with the updated config
          (this.mailerService as any).transporter = nodemailer.createTransport(normalConfig);
      }
    }

    try {
      await this.mailerService.sendMail(mail_options);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Unable to send email at this time');
    }
  }

  buildMailOption(mail_data: EmailData): EmailData {
    return {
      ...mail_data,
      key: '',
      to: mail_data.to,
      from: mail_data.from,
      subject: format_email_subject(mail_data.subject),
    };
  }

  async saveOrCreateEmailNotification(
    mail_data: EmailData,
    content: string,
  ): Promise<void> {
    const notification_data: NotificationDataRequestDto = {
      user_id: mail_data.user_id ?? null,
      title: format_email_subject(mail_data.subject),
      content: content,
      is_read: false,
      type: NotificationTypes.ACCOUNTS,
      preview_content: null,
      business_id: mail_data?.business_id ?? null,
    };
    switch (mail_data.key) {
      case EmailSubject.ACCOUNT_DISABLED:
        notification_data['preview_content'] = 'Your account has been disabled';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.ACCOUNT_ACTIVATION:
        notification_data[
          'preview_content'
        ] = `Your account is waiting to be activated. Complete activation to access all features!`;
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.PASSWORD_RESET_SUCCESS:
        notification_data['preview_content'] =
          'Your account has been reset successfully';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.COMPLETE_ONBOARDING:
        notification_data['preview_content'] =
          'You have incomplete onboarding steps. Get started to unlock Syncventory\'s full potential!';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.SECURE_TWO_FA:
        notification_data['preview_content'] =
          'Secure your account by enabling Two-Factor Authentication (2FA) today.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.MANDATE_AUTHORIZATION_LINK:
        notification_data['preview_content'] =
          'Authorize your mandate';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.COMPLETE_TWO_FA:
        notification_data['preview_content'] =
          'Your 2FA setup is complete. Your account is now more secure!';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.STOCK_TRANSFER_INITIATED:
        notification_data['preview_content'] =
          'Stock transfer has been initiated. View details';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.STOCK_TRANSFER_COMPLETED:
        notification_data['preview_content'] =
          'Stock transfer has been completed. View details';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.SETTINGS_CHANGED:
        notification_data['preview_content'] =
          'Your settings were updated successfully';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.NOTIFICATION_PREFERENCE_UPDATED:
        notification_data['preview_content'] =
          'Your notification preferences have been updated.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.SUBSCRIPTION_CONFIRMATION:
        notification_data['preview_content'] =
          'Your subscription has been confirmed. View plan details.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.UPCOMING_PLAN_EXPIRY:
        notification_data['preview_content'] =
          'Your subscription will expire soon. Renew now to continue uninterrupted service.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.PAYMENT_FAILURE:
        notification_data['preview_content'] =
          'Payment failed. Update your payment method to avoid service interruption.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.SUBSCRIPTION_INVOICE:
        notification_data['preview_content'] =
          'Your payment was successful. Invoice available in your account.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.SUBSCRIPTION_PLAN_CHANGE:
        notification_data['preview_content'] =
          'Your subscription plan has been updated';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.SYSTEM_MAINTENANCE:
        notification_data['preview_content'] =
          'Scheduled maintenance. Syncventory may be unavailable temporarily';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.FEATURES_UPDATE:
        notification_data['preview_content'] =
          'New features are available! Discover what is new in Syncventory.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.SECURITY_ALRET:
        notification_data['preview_content'] =
          'Unusual login detected. Review your account activity.';
        notification_data['type'] = NotificationTypes.DISABLED_ACCOUNT;
        break;
      case EmailSubject.EMAIL_VERIFICATION:
        notification_data['preview_content'] =
          'Your email has been verified successfully';
        break;
      case EmailSubject.NEW_ACCOUNT_CREATED:
        notification_data['preview_content'] =
          'Your account has been created successfully';
        break;
      case EmailSubject.LOGIN_SUCCESS:
        notification_data['preview_content'] = 'Your login was successful';
        break;
      case EmailSubject.NEW_USER_BUSINESS_DATA:
        notification_data['preview_content'] =
          'Your business was created successfully';
        break;
      case EmailSubject.REQUEST_PASSWORD_RESET:
        notification_data['preview_content'] =
          'Your request for password reset is successful and the rest link has been sent to your mail';
        break;
      case EmailSubject.CUSTOMER_FEEDBACK:
        notification_data['preview_content'] =
          'Your feedback was sent successfully';
        notification_data['type'] = NotificationTypes.FEEDBACK;
        break;
      case EmailSubject.CUSTOMER_COMPLAINTS:
        notification_data['preview_content'] =
          'Your questions/complaints was sent successfully';
        notification_data['type'] = NotificationTypes.FEEDBACK;
        break;
      case EmailSubject.MESSAGE_RECEIVED:
        notification_data['preview_content'] =
          'You have recieved an automated response';
        notification_data['type'] = NotificationTypes.FEEDBACK;
        break;
      case EmailSubject.ORDER_INVOICE_DETAILS:
        notification_data['preview_content'] =
          'Your invoice has been sent successfully to your mail';
        notification_data['type'] = NotificationTypes.INVOICE;
        break;
      case EmailSubject.SALES_ORDER_DETAILS:
        notification_data['preview_content'] =
          'Your sales order has been sent successfully to your mail';
        notification_data['type'] = NotificationTypes.ORDER;
        break;
      case EmailSubject.PURCHASE_ORDER_DETAILS:
        notification_data['preview_content'] =
          'Your purchase order has been sent successfully to your mail';
        notification_data['type'] = NotificationTypes.ORDER;
        break;
      case EmailSubject.PAYMENT_RECEIPT:
        notification_data['preview_content'] =
          'Your payment receipt has been sent successfully to your mail';
        notification_data['type'] = NotificationTypes.RECEIPT;
        break;
      default:
        break;
    }

    if (notification_data.preview_content) {
      await this.notificationService.create_notification({
        ...notification_data,
      });
    }
  }

  buildHtmlEmailContentV1(mail_data: EmailData) {
    const mail_options = this.buildMailOption(mail_data);
    let content = '';
    if (mail_data.html) {
      mail_options.html = mail_data.html;
      content = mail_data.html;
    }
    if (mail_data.text) {
      mail_options.text = mail_data.text;
      content = mail_data.text;
      mail_options.html = mail_data.text;
    }
    return content;
  }

  buildHtmlEmailContent(mail_data: EmailData) {
    const meta = mail_data.meta ? JSON.parse(mail_data.meta) : null;
    let content = null;
    let text_content = '';
    let should_save = false;
    let is_html = false;
    switch (mail_data.key) {
      case EmailSubject.NEW_ACCOUNT_CREATED:
        console.log('Creating New Account .........');
        content = sign_up_template({
          name: meta?.name,
          link: meta?.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Welcome to Syncventory! Start exploring the features to streamline your operations today.`;
        should_save = true;
        break;
      case EmailSubject.MANDATE_AUTHORIZATION_LINK:
        console.log('mandate authorization link .........');
        content = mandate_activation_template({
          name: meta?.name,
          link: meta?.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,We've retrieved your mandate authorization link`;
        break;
      case EmailSubject.ACCOUNT_ACTIVATION:
        content = account_activation_template({
          name: meta?.name,
          link: meta?.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Your account is waiting to be activated. Complete activation to access all features!`;
        should_save = true;
        break;
      case EmailSubject.REQUEST_PASSWORD_RESET:
        content = password_reset_template({
          name: meta.name,
          link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, You requested a password reset`;
        break;
      case EmailSubject.PASSWORD_RESET_SUCCESS:
        content = password_reset_successfully_template({
          name: meta.name,
          link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Your account has been reset successfully`;
        should_save = true;
        break;
      case EmailSubject.COMPLETE_ONBOARDING:
        content = complete_onboarding_template({
          name: meta.name,
          link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, you have incomplete onboarding steps. Get started to unlock Syncventory\'s full potential!`;
        should_save = true;
        break;
      case EmailSubject.SECURE_TWO_FA:
        content = secure_two_fa_template({
          name: meta.name,
          link: meta?.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Secure your account by enabling Two-Factor Authentication (2FA) today.`;
        should_save = true;
        break;
      case EmailSubject.COMPLETE_TWO_FA:
        content = complete_two_fa_template({
          name: meta.name,
          // link: meta?.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Your 2FA setup is complete. Your account is now more secure!`;
        should_save = true;
        break;
      case EmailSubject.STOCK_TRANSFER_INITIATED:
        content = initiate_stock_transfer_template({
          name: meta.name,
          // link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Stock transfer ${meta.transfer_id} has been initiated. View details.`;
        should_save = true;
        break;
      case EmailSubject.STOCK_TRANSFER_COMPLETED:
        content = complete_stock_transfer_template({
          name: meta.name,
          // link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Stock transfer ${meta.transfer_id} has been completed. View details`;
        should_save = true;
        break;
      case EmailSubject.SETTINGS_CHANGED:
        content = settings_changed_template({
          name: meta.name,
          // link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Your settings were updated successfully`;
        should_save = true;
        break;
      case EmailSubject.NOTIFICATION_PREFERENCE_UPDATED:
        content = notification_preference_template({
          name: meta.name,
          // link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Your notification preferences have been updated.`;
        should_save = true;
        break;
      case EmailSubject.SUBSCRIPTION_CONFIRMATION:
        content = subscription_confirmation_template({
          name: meta.name,
          link: meta.link,
          plan_name: meta.plan_name,
          renewal_date: meta.renewal_date,
          start_date: meta.start_date,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Your subscription has been confirmed. View plan details.`;
        should_save = true;
        break;
      case EmailSubject.UPCOMING_PLAN_EXPIRY:
        content = upcoming_plan_expiry_template({
          name: meta.name,
          link: meta.link,
          renewal_date: meta.renewal_date,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Your subscription will expire soon. Renew now to continue uninterrupted service.`;
        should_save = true;
        break;
      case EmailSubject.PAYMENT_FAILURE:
        content = payment_failure_template({
          name: meta.name,
          link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Payment failed. Update your payment method to avoid service interruption.`;
        should_save = true;
        break;
      case EmailSubject.SUBSCRIPTION_INVOICE:
        content = subscription_invoice_template({
          name: meta.name,
          link: meta.link,
          plan_name: meta.plan_name,
          renewal_date: meta.renewal_date,
          start_date: meta.start_date,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Your payment was successful. Invoice available in your account.`;
        should_save = true;
        break;
      case EmailSubject.SUBSCRIPTION_PLAN_CHANGE:
        content = subscription_plan_change_template({
          name: meta.name,
          link: meta.link,
          plan_name: meta.plan_name,
          graded_state: meta.graded_state
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Your subscription plan has been updated to ${meta.plan_name}.`;
        should_save = true;
        break;
      case EmailSubject.SYSTEM_MAINTENANCE:
        content = system_maintenance_template({
          name: meta.name,
          link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!,Scheduled maintenance on ${meta.date}. Syncventory may be unavailable temporarily.`;
        should_save = true;
        break;
      case EmailSubject.FEATURES_UPDATE:
        content = feature_update_template({
          name: meta.name,
          link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, New features are available! Discover what is new in Syncventory.`;
        should_save = true;
        break;
      case EmailSubject.SECURITY_ALRET:
        content = security_alert_template({
          name: meta.name,
          link: meta.link,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, Unusual login detected. Review your account activity.`;
        should_save = true;
        break;
      case EmailSubject.SALES_ORDER_DETAILS:
        content = send_order_template({
          name: meta.name,
          link: meta.link ?? '',
          products: meta.products,
          delivery_status: meta.delivery_status,
          tax: meta.tax ?? 0,
          discount: meta.discount ?? 0,
          promo: meta.promo ?? 'No promo',
          total_order_quantity: meta.total_order_quantity,
          total_order_price: meta.total_order_price,
          business: meta.business,
          customer: meta.customer,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, We have sent your order details.`;
        should_save = true;
        break;
      case EmailSubject.ORDER_INVOICE_DETAILS:
        content = send_order_invoice_template({
          name: meta.name,
          link: meta.link ?? '',
          products: meta.products,
          business: meta.business,
          customer: meta.customer,
          invoice_number: meta.invoice_number,
          payment_status: meta.payment_status,
          issued_on: meta.issued_on,
          due_on: meta.due_on,
          shipping_fee: meta.shipping_fee,
          vat: meta.vat,
          amount_due: meta.amount_due,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, We have sent your order invoice details.`;
        should_save = true;
        break;
      case EmailSubject.PURCHASE_ORDER_DETAILS:
        content = purchase_order_template({
          name: meta.name,
          link: meta.link ?? '',
          products: meta.products,
          business: meta.business,
          outlet: meta.outlet,
          supplier: meta.supplier,
          invoice_number: meta.invoice_number,
          purchase_number: meta.purchase_number,
          amount_due: meta.amount_due,
          delivery_date: meta.delivery_date,
          proposed_arrival_date: meta.proposed_arrival_date,
          total_order_price: meta.total_order_price,
          total_order_quantity: meta.total_order_quantity,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, We have sent your purchase order details.`;
        should_save = true;
        break;
      case EmailSubject.PAYMENT_RECEIPT:
        content = payment_receipt_template({
          link: meta.link ?? '',
          products: meta.products,
          business: meta.business,
          customer: meta.customer,
          order_id: meta.order_id,
          receipt_number: meta.receipt_number,
          date_issued: meta.date_issued,
          payment_status: meta.payment_status,
          payment_method: meta.payment_method,
          order_total: meta.order_total,
          total_quantity: meta.total_quantity,
          cashier_name: meta.cashier_name,
          note: meta.note,
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, We have sent your payment receipt details.`;
        should_save = true;
        break;
      case EmailSubject.CUSTOMER_FEEDBACK:
        content = send_feedback_template({
          name: meta?.name ?? '',
          link: meta?.link ?? '',
          recommendation: meta?.recommendation ?? '',
          user: meta?.user ?? '',
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, We have sent out the customer feedback.`;
        break;
      case EmailSubject.MESSAGE_RECEIVED:
        content = automated_response_template({
          name: meta?.name ?? '',
          link: meta?.link ?? '',
          user: meta?.user ?? '',
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, We have sent out the automated response.`;
        break;
      case EmailSubject.CUSTOMER_COMPLAINTS:
        content = contact_form_template({
          name: meta?.name ?? '',
          link: meta.link ?? '',
          question: meta?.question ?? '',
          user: meta?.user ?? '',
        });
        is_html = true;
        text_content = `Hi ${meta?.name}!, We have sent out the customer question/complaint.`;
        break;
      default:
        is_html = true;
        break;
    }
    return { content, is_html, text_content, should_save };
  }
}
