export class ErrorInvalidCredentials {
  constructor(msg){
    this.error = msg || 'Invalid email or password';
  }
}

export class ErrorDuplicateUser {
  constructor(msg){
    this.error = msg || 'User already exists';
  }
}