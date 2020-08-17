import { View } from 'okta';
import hbs from 'handlebars-inline-precompile';
import AuthenticatorVerifyFooter from '../../components/AuthenticatorVerifyFooter';
import BaseAuthenticatorEmailView from './BaseAuthenticatorEmailView';

const BaseAuthenticatorEmailForm = BaseAuthenticatorEmailView.prototype.Body;

// Courage doesn't support HTML, hence creating a subtitle here.
const CheckYourEmailTitle = View.extend({
  className: 'okta-form-subtitle',
  attributes: {
    'data-se': 'o-form-explain',
  },
  template: hbs`
    {{i18n code="oie.email.verify.sentText" bundle="login"}}&nbsp;
    <span class="strong">{{email}}.</span>
    &nbsp;{{i18n code="email.mfa.email.sent.description.emailCodeText" bundle="login"}}
  `,

  getTemplateData () {
    const { email } = this.options;
    return {
      email,
    };
  },
});

const Body = BaseAuthenticatorEmailForm.extend(Object.assign({

  resendEmailAction: 'currentAuthenticatorEnrollment-resend',

  initialize () {
    BaseAuthenticatorEmailForm.prototype.initialize.apply(this, arguments);

    const { email } = this.options.currentViewState.relatesTo?.value?.profile;

    this.add(CheckYourEmailTitle, {
      prepend: true,
      selector: '.o-form-error-container',
      options: {
        email,
      }
    });
  },
}));

export default BaseAuthenticatorEmailView.extend({
  Body,
  Footer: AuthenticatorVerifyFooter,
});
