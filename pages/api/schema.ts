import { makeSchema, objectType, stringArg, asNexusMethod, intArg } from 'nexus';
import { GraphQLDate } from 'graphql-iso-date';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import _ from "lodash";

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

const prisma = new PrismaClient();

const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.string('id')
    t.string('caption')
    t.string('file')
  },
});

const User = objectType({
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
    t.field('selectUser', {
      type: 'User',
      args: { id: intArg({ required: true }) },
      resolve: async (_parent, { id }, ctx) => {
        const user = await prisma.user.findOne({
          where: { id }
        });
        return user;
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
          console.log('user', JSON.stringify(user));
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
              expiresIn: "1h"
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

export const schema = makeSchema({
  types: [Query, Mutation, Objects, GQLDate],
  outputs: {
    // typegen: path.join(__dirname, 'nexus-typegen.ts'),
    // schema: path.join(__dirname, 'schema.graphql')
  },
})