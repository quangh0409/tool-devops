import axios from "axios";

export async function sendMail({
    email,
    code,
    service_name,
    action_by,
    info,
}: {
    email?: string[];
    code: string;
    service_name: string;
    action_by: string;
    info: {
        IDTicket?: string;
        RequesterName?: string;
        Subject?: string;
        TicketLink?: string;
        GroupName?: string;
        Assignee?: string;
        Tech?: string;
    };
}): Promise<void> {
    return await axios.post(`http://127.0.0.1:6803/api/v1/in/mail/send`, {
        email: email,
        code: code,
        service_name: service_name,
        action_by: action_by,
        info: info,
    });
}
