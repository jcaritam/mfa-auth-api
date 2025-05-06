import { prisma } from '../prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';

export class UserRepository implements IUserRepository {

  async findAll(): Promise<UserEntity[]> {
    return (await prisma.user.findMany()).map(user => new UserEntity({
      ...user,
    }));
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { userId }
    });

    if (!user) return null;

    return new UserEntity({
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: user.password,
      mfaEnabled: user.mfaEnabled,
      mfaSecret: user.mfaSecret,
      createAt: user.createAt,
      updateAt: user.updateAt,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;

    return new UserEntity({
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: user.password,
      mfaEnabled: user.mfaEnabled,
      mfaSecret: user.mfaSecret,
      createAt: user.createAt,
      updateAt: user.updateAt,
    });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userCreated = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        mfaEnabled: true,
      }
    })

    return new UserEntity({
      ...userCreated
    });
  }

  async update(user: UserEntity): Promise<void> {
    // const user = await this.findById(user.userId);


  }

  delete(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}