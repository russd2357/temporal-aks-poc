
interface NotifyResponse {
    message: string
};

export default class NotificationController {
    public async notifyPatient(contact: string) : Promise<NotifyResponse> {
        const method = (contact.indexOf('@') > 0) ? 'email' : 'phone/text'
        await new Promise( f => setTimeout(f, 5000));
        return { message: `Patient notified by ${method}`};
    }
}