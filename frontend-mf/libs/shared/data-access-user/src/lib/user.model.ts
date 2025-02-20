export class User {
    id!: string;
    email!: string;
    password!: string;
    token_api?: string;

    constructor(
      id: string,
      email: string,
      password: string,
      token_api?: string,

    ) {
      this.id = id;
      this.email = email;
      this.password = password;
      if (token_api) {
        this.token_api = token_api;
      }
    }
  
  }
  