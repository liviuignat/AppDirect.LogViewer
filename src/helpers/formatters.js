import config from 'config';
import moment from 'moment';

export function formatUrl(url) {
  return `${config.app.baseApiUrl}${url}`;
}

export function formatDate(date, format = 'dddd, Do MMMM YYYY') {
  const dt = getDate(date);
  const momentDate = moment(dt);
  return momentDate.format(format);
}

export function formatDateFromNow(date) {
  const dt = getDate(date);
  const momentDate = moment(dt);
  return momentDate.fromNow();
}

function getDate(date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    return date;
  }
  return new Date(date);
}
