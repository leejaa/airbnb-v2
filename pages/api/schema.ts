import { makeSchema, objectType, stringArg, asNexusMethod, intArg, fieldAuthorizePlugin, plugin } from 'nexus';
import { GraphQLDate } from 'graphql-iso-date';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import _ from "lodash";
import q from 'q';
import { testData, testPhotos, testWords } from './testdata';

const SELECT_USER = 'selectUser';
const SELECT_USER2 = 'selectUser2';
const SELECT_PHOTO = 'selectPhoto';
export const AUTH_LIST = [
  SELECT_USER,
];

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

export const prisma = new PrismaClient();

const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.string('id')
    t.string('caption')
    t.string('file')
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.string('password')
  }
});

const LoginResult = objectType({
  name: 'LoginResult',
  definition(t) {
    t.boolean('success')
    t.string('accessToken')
    t.string('refreshToken')
    t.field('user', { type: 'User' })
  }
});

const createUserResult = objectType({
  name: 'createUserResult',
  definition(t) {
    t.boolean('success')
    t.field('user', { type: 'User' })
  }
});

const Objects = [Photo, User, LoginResult, createUserResult];

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('photo', {
      type: 'Photo',
      resolve: (_parent, _args, ctx) => {
        return prisma.photo.findMany({
          first: 1,
          skip: 1
        })
      },
    })
    t.field(SELECT_USER, {
      type: 'User',
      args: { id: intArg({ required: true }) },
      resolve: async (_parent, { id }, ctx) => {
        const user = await prisma.user.findOne({
          where: { id }
        });
        return user;
      },
    })
    t.field(SELECT_USER2, {
      type: 'User',
      args: { email: stringArg({ default: '' }) },
      resolve: async (_parent, { email }, ctx) => {
        const user = await prisma.user.findMany({
          where: { email }
        });
        return user[0];
      },
    })
    t.list.field(SELECT_PHOTO, {
      type: 'Photo',
      args: {},
      resolve: async (_parent, { }, ctx) => {
        const photos = await prisma.photo.findMany();
        return photos;
      },
    })
    t.boolean("createTestPhoto", {
      args: {},
      resolve: async (_parent, { }, ctx) => {
        try {
          const arrays = _.fill(Array(1000), 1);
          let cnt = 0;
          for (const array of arrays) {
            console.log('cnt', cnt++);
            const file = testPhotos[Math.floor(Math.random() * testPhotos.length)];
            let caption = '';
            _.forEach(_.fill(Array(1000), 1), item => {
              caption += testWords[Math.floor(Math.random() * testWords.length)];
            });
            await prisma.photo.create({
              data: {
                file,
                caption,
              }
            });
          }
          return true;
        } catch (error) {
          console.log('error', error);
          return false;
        }
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'createUserResult',
      args: {
        email: stringArg({ nullable: false }),
        name: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { email, name, password }, ctx) => {
        const hashedPassword = await hash(password, 12);
        try {
          const user = await prisma.user.create({
            data: {
              email,
              name,
              password: hashedPassword
            },
          });
          return {
            success: true,
            user
          };
        } catch (error) {
          return {
            success: false,
            error
          };
        }
      },
    })
    t.field('login', {
      type: 'LoginResult',
      args: { email: stringArg({ required: true }), password: stringArg() },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await prisma.user.findMany({
          where: { email }
        });
        if (_.isEmpty(user)) {
          return {
            success: false,
            error: '유저를 찾을수 없습니다.'
          };
        }
        const valid = await compare(password, user[0].password);
        if (valid) {
          return {
            success: true,
            accessToken: sign({ userId: user[0].id }, process.env.ACCESS_TOKEN_SECRET!, {
              expiresIn: "1s"
            }),
            refreshToken: sign({ userId: user[0].id }, process.env.REFRESH_TOKEN_SECRET!, {
              expiresIn: "30d"
            }),
            user: user[0]
          };
        } else {
          return {
            success: false,
            error: '비밀번호가 일치하지 않습니다.'
          };
        }
      },
    })
  },
})

export const checkAuth = ({ req }) => {
  const authorization = req?.headers?.authorization ?? '';
  // const token = authorization?.split(" ")[1] ?? '';
  const token = 'asdsdfdsf';
  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return {
      isAuth: true,
      payload,
    };
  } catch (error) {
    return {
      isAuth: false,
      error
    };
  }
};

const authorizePlugin = plugin({
  name: "authorizePlugin",
  onCreateFieldResolver(config) {
    return async (root, args, ctx, info, next) => {
      const value = await next(root, args, ctx, info);
      return value;
    };
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, Objects, GQLDate],
  plugins: [
    authorizePlugin,
  ],
  outputs: {
    // typegen: path.join(__dirname, 'nexus-typegen.ts'),
    // schema: path.join(__dirname, 'schema.graphql')
  },
})