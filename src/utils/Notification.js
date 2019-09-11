import EventEmitter from 'events';
import sendEmail from './mailer';
import transporter from './transporter';
import Helper from './Helper';
import UserService from '../services/UserService';

const { constructNewRequestEmail } = Helper;
class Notifications extends EventEmitter {
  constructor() {
    super();
    this.on('notification', this.handleNotification);
    this.on('Error', this.notificationErrorHandler);
  }

  handleNotification({ type, payload }) {
    if (type in this) this[type](payload);
  }

  notificationErrorHandler(){
    console.log('an error occured on a notification');
  }

  addNotification(type, handler = () => {}) {
    if (!(type in this)) {
      this[type] = handler;
      return true
    }
    return false
  }

  newRequest({ emailDetails }) {
    const emailOptions = constructNewRequestEmail(emailDetails).bind(this);
    sendEmail(transporter, emailOptions);
    return this.emit('inAppNotification', {});
  }

  approvedRequest(payload = {}) {
    const emailOptions = constructNewApprovalEmail(payload.email).bind(this);
    sendEmail(transporter, emailOptions);
    this.emit('inAppNotifications', {});
  }

  requestComment(payload = {}) {
    const emailOptions = Helper.constructRequestCommentEmail(payload.email);
    sendEmail(transporter, emailOptions);
    this.emit('inAppNotifications', {});
  }

  closedRequest(payload = {}) {
    const emailOptions = Helper.constructClosedRequestEmail(payload.email);
    sendEmail(transporter, emailOptions);
    this.emit('inAppNotifications', {});
  }

  sendNotification (id, { requestId, type }, notificationType) {
    UserService.findUser(id)
        .then(user => {
          const managerEmail = user.get('lineManager');
          const userEmail = user.get('email');
          const fullname = `${user.get('firstName')} ${user.get('lastName')}`;
          this.emit('notification', {
            type: notificationType,
            payload: {
              emailDetails: {
                managerEmail,
                userEmail,
                fullname,
                requestId,
                type
              }
            }
          });
        });
  }
}

export default new Notifications();
