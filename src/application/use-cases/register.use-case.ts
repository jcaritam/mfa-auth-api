import { hashSync } from "bcryptjs";
import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { CreateUserDto } from "../../interfaces/http/dto/create-user.dto";

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new Error('user already exist')
    }

    const passwordHash = hashSync(createUserDto.password, 10);

    const userToSave = new UserEntity({
      ...createUserDto,
      password: passwordHash,
    });

    return await this.userRepository.save(userToSave);
  }
}