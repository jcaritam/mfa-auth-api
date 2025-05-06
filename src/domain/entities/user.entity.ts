import { v4 as uuid } from 'uuid';


interface UserProps {
  userId?: string;
  name: string;
  email: string;
  password: string;
  mfaEnabled?: boolean;
  mfaSecret?: string | null;
  createAt?: Date;
  updateAt?:Date;
}

export class UserEntity {
  public readonly userId: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly mfaEnabled: boolean;
  public readonly mfaSecret: string | null;
  public readonly createAt: Date;
  public readonly updateAt: Date;

  constructor(props: UserProps) {
    this.userId = props.userId ?? uuid()
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.mfaEnabled = props.mfaEnabled ?? false;
    this.mfaSecret = props.mfaSecret ?? null;
    this.createAt = props.createAt ?? new Date()
    this.updateAt = props.updateAt ?? new Date()
  }

}