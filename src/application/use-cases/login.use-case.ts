import { LoginDto } from './../../interfaces/http/dto/login.dto';
import { IUserRepository } from "../../domain/repositories/user.repository"
import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../infrastructure/config/envs';

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: LoginDto) {
    const existUser = await this.userRepository.findByEmail(email);

    if(!existUser) {
      throw new Error('user - invalid')
    }

    const isValidPassword = compareSync(password, existUser.password);

    if(!isValidPassword) throw new Error('invalid credentials')

    if (existUser.mfaEnabled) {
      const mfaToken = jwt.sign({ email: existUser.email }, env.MFA_SECRET, {
        expiresIn: '5m'
      });

      return {
        mfaRequired: true,
        mfaToken,
      }
    }

      const token = jwt.sign({ sub: existUser.userId }, env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return { token };

  }
}