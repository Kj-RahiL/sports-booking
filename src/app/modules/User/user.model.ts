
import { model, Schema } from "mongoose";
import { TUser} from "./user.interface";
import { USER_Role } from "./user.constant";
import bcrypt from 'bcrypt'
import config from "../../config";


const userSchema = new Schema<TUser>({
    name: {type:String,  required: [true, "name is required"],},
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },


    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      unique:true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: Object.keys(USER_Role),
        default: USER_Role.user
      },
    address: {
      type: String,
      required: [true, "Address is required"],

    }
  });


  userSchema.pre('save', async function (next) {
    const user = this

    // hashing password
    user.password =await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next()
  })

  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

  export const User = model<TUser> ("User", userSchema)
  