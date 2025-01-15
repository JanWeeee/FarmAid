export class Feedback {
    feedbackId: number;
    feedbackText: string;
    date: Date;
    user: {
      userId: number;
      username: string;
      email: string;
    };
  }
  