import mongoose from 'mongoose';

import { Password } from '../services/password';

// an  interface that describe the properties
//  that are required to create a user
interface UserAttributes {
  email: string;
  password: string;
}

// an  interface that describe the properties
// that a user Model has

interface userModel extends mongoose.Model<userDoc> {
  build(attrs: UserAttributes): userDoc;
}

// / an  interface that describe the properties
// that user document has

interface userDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
