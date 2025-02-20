export class ChatMessage {
    adId!: string;
    userId!: string;
    userEmail!: string;
    message!: string;
    timestamp!: Date;

    constructor(adId: string, userId: string, userEmail:string, message: string, timestamp: Date) {
        this.adId = adId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.message = message;
        this.timestamp = timestamp;
    }
  
  }