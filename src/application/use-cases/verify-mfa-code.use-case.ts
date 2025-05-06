import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';
import { IUserRepository } from './../../domain/repositories/user.repository';
import { env } from '../../infrastructure/config/envs';

interface IVerifyMfaInput {
  mfaToken: string;
  code  : string
}

export class VerifyMfaCodeUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ code, mfaToken }: IVerifyMfaInput) {
    let payload: { email: string };
    
    try {
      console.log({ code, mfaToken })
      payload = jwt.verify(mfaToken, env.MFA_SECRET) as { email: string };
      console.log({ payload })
    } catch {
      throw new Error('invalid MFA token')
    }
    
    const user = await this.userRepository.findByEmail(payload.email);

    if(!user || !user.mfaSecret) {
      throw new Error('MFA not configured')
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    console.log({ verified })
    if(!verified) throw new Error('Invalid MFA code')

      const token = jwt.sign({ sub: user.userId }, env.JWT_SECRET, {
        expiresIn: '1h'
      })
      console.log({ token })
      return token;
  }
}