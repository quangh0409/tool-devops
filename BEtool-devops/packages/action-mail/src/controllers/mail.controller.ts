import { IEdge, ITicket, IWorkflowDetail } from "entities";
import { sendMail } from "../services/mail.service";
import "dotenv/config";
export async function actionSendMail(
    ticket: ITicket,
    sourceId: string,
    targetId: string,
    service_name: string,
    action_by: string,
    link: string
): Promise<void> {
    const workflow: IWorkflowDetail = ticket.workflow;
    const egdes: IEdge[] = workflow.edges;
    // if (ticket.technician) {
    //     const infoTech = {
    //         IDTicket: ticket.number,
    //         Subject: ticket.name,
    //         TicketLink: `${link}/${ticket.id}`,
    //     };
    //     sendMail({
    //         email: ticket.technician.email as unknown as string[],
    //         code: "T003",
    //         service_name: "request",
    //         action_by,
    //         info: infoTech as object,
    //     });
    // }
    if (ticket.group) {
        const infoGroup = {
            IDTicket: ticket.number,
            Subject: ticket.name,
            GroupName: ticket.group.name,
            TicketLink: `${link}/${ticket.id}`,
            Tech: ticket?.technician?.email,
            group: ticket.group.id,
        };
        sendMail({
            code: "T004",
            service_name: "request",
            action_by,
            info: infoGroup as object,
        });
    }
    for (const edge of egdes) {
        if (edge.source === sourceId && edge.target === targetId) {
            if (edge?.actions) {
                edge.actions.forEach((e) => {
                    const email_template = e.email_template;

                    if (e.type == "SendMail") {
                        const projectDetail: { [key: string]: unknown } = {
                            _id: 0,
                            id: "$id",
                        };
                        for (const p of e.params) {
                            if (p.type === "field") {
                                projectDetail[p.name] = p.value[0];
                            } else if (p.type === "concat") {
                                projectDetail[p.name] = { $concat: p.value };
                            }
                        }

                        const info = {
                            IDTicket: ticket.number,
                            RequesterName: ticket?.requester?.fullname,
                            Subject: ticket?.name,
                            TicketLink: `${link}/${ticket.id}`,
                            GroupName: ticket?.group?.name,
                            Assignee: ticket?.technician?.fullname,
                            Solution: ticket?.resolution?.solution?.content,
                        };
                        sendMail({
                            email: ticket.requester
                                ?.email as unknown as string[],
                            code: email_template,
                            service_name,
                            action_by,
                            info: info as object,
                        });
                    }

                    if (e.type == "SendMail" && e.email_template == "T006") {
                        const projectDetail: { [key: string]: unknown } = {
                            _id: 0,
                            id: "$id",
                        };
                        for (const p of e.params) {
                            if (p.type === "field") {
                                projectDetail[p.name] = p.value[0];
                            } else if (p.type === "concat") {
                                projectDetail[p.name] = { $concat: p.value };
                            }
                        }

                        const info_T006 = {
                            IDTicket: ticket.number,
                            RequesterName: ticket.requester?.fullname,
                            Subject: ticket?.name,
                            TicketLink: `${link}/${ticket.id}`,
                            GroupName: ticket?.group?.name,
                            Assignee: ticket?.technician?.fullname,
                            Solution: ticket?.resolution?.solution?.content,
                            group: ticket?.group?.id,
                        };
                        sendMail({
                            email: ticket.requester
                                ?.email as unknown as string[],
                            code: email_template,
                            service_name,
                            action_by,
                            info: info_T006 as object,
                        });
                    }
                });
            }
        }
    }
}
