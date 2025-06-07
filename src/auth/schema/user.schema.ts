import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export enum UserRole {
    ADMIN = 'admin',
    USER =  'user',
}

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  //  so that when they select a user, the password is not returned in the response.
  @Prop({ select: false })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;
}


export const UserSchema = SchemaFactory.createForClass(User);
