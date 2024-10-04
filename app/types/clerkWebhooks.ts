export interface ClerkWebhookEvent {
    type: string; // e.g., "user.created", "user.updated", "user.deleted"
    data: {
      id: string;
      email_addresses: { email_address: string }[];
      first_name: string;
      last_name: string;
      image_url:string
    };
  }