import { SetupUseCase } from './../../../application/use-cases/setup.use-case';
import { VerifyMfaCodeUseCase } from './../../../application/use-cases/verify-mfa-code.use-case';
import { LoginUseCase } from './../../../application/use-cases/login.use-case';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterUseCase } from './../../../application/use-cases/register.use-case';
import { UserRepository } from './../../../infrastructure/repositories/user-impl.repository';
import { Request, RequestHandler, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as CreateUserDto;
  try {
    const repository = new UserRepository();
    const useCase = new RegisterUseCase(repository);

    const user = await useCase.execute({ name, email, password });

    res.status(201).json({
      message: 'UserCreated',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const loginUser: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginDto;
  try {
    const repository = new UserRepository();
    const useCase = new LoginUseCase(repository);
    const { mfaRequired, mfaToken, token } = await useCase.execute({ email, password });

    if (mfaRequired) {
      res.status(200).json({
        message: 'Login successfully',
        data: { mfaToken }
      });
      return;
    }

    res.status(200).json({
      message: 'Login successfully',
      data: { token }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const verifyMfaCode= async (req: Request, res: Response) => {
  const { mfaToken, code } = req.body;

  try {
    const useCase = new VerifyMfaCodeUseCase(new UserRepository());

    const token = await useCase.execute({ code, mfaToken });

    res.status(200).json({
      message: 'MFA verified',
      data: { token }
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const setupMfa = async (req: Request, res: Response) => {
  const { email }= req.body;
  try {
    const useCase = new SetupUseCase();
    const { secret, otpAuthUrl } = await useCase.execute({ email, appName: 'App Demo'})

    res.status(200).json({
      message: 'MFA setup info generated',
      data: {
        secret,
        otpAuthUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}