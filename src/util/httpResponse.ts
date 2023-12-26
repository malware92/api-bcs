export class ApiResponse {
    code: number;
    message: string;
    data: any;
  
    constructor(code: number, message: string, data: any = null) {
      this.code = code;
      this.message = message;
      this.data = data;
    }
  }
  