

export interface ChatMessage{
    chatId?: string,
    message : string,
    createdOn: Date,
    recevierId : string,
    recevierName : string,
    senderId : string,
    senderName : string
}