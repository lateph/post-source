export class FormError extends Error {
    code = 400;
    message = this.message || {}
  }