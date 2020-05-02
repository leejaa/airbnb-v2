import { makeSchema, objectType, stringArg, asNexusMethod, intArg } from 'nexus';
import { GraphQLDate } from 'graphql-iso-date';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from "bcryptjs";

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

const Objects = [ Photo, User ];

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
    t.list.field('selectUser', {
      type: 'User',
      args: { id: intArg({ required: true }) },
      resolve: async(_parent, { id }, ctx) => {
        const user = await prisma.user.findMany({
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
      type: 'User',
      args: {
        email: stringArg({ nullable: false }),
        name: stringArg(),
        password: stringArg(),
      },
      resolve: async(_, { email, name, password }, ctx) => {
        const hashedPassword = await hash(password, 12);
        return prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword
          },
        })
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