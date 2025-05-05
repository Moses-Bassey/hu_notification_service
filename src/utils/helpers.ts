/**
 * Passwords will contain at least 1 upper case letter
 * Passwords will contain at least 1 lower case letter
 * Passwords will contain at least 1 number or special character
 * There is no length validation (min, max) in this regex!
 * @returns RegExp
 */

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

export const get_duration_in_milliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export const string_to_boolean = (string_value) => {
  switch(string_value?.toLowerCase()?.trim()){
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
    case undefined:
      return false;
    default:
      return JSON.parse(string_value);
  }
}

export const format_email_subject = (subject: string) => {
  return subject.replace(/_/g, ' ');
};
