import { UsersEntity } from 'src/modules/users/entity/users.entity';

export class LoginPayloadDto {
  id: string;
  username: string;

  constructor(usersEntity: UsersEntity) {
    this.id = usersEntity.id;
    this.username = usersEntity.username;
  }
}
