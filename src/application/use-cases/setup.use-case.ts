import speakeasy from 'speakeasy';

interface Input {
  email: string;
  appName: string;
}

interface Output {
  secret: string;
  otpAuthUrl: string;
}

export class SetupUseCase {
 
  async execute({ appName, email }: Input): Promise<Output> {
    const secret = speakeasy.generateSecret({
      name: `${appName} (${email})`
    });

    return {
      secret: secret.base32,
      otpAuthUrl: secret.otpauth_url ?? ''
    }
  }
}