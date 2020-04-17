import { makeSchema, objectType, stringArg, asNexusMethod } from 'nexus'
import { GraphQLDate } from 'graphql-iso-date';
import { PrismaClient } from '@prisma/client';

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

const prisma = new PrismaClient();

const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.string('id')
    t.string('caption')
    t.string('file')
  },
})

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
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    // t.field('createDraft', {
    //   type: 'Post',
    //   args: {
    //     title: stringArg({ nullable: false }),
    //     content: stringArg(),
    //     authorEmail: stringArg(),
    //   },
    //   resolve: (_, { title, content, authorEmail }, ctx) => {
    //     return prisma.post.create({
    //       data: {
    //         title,
    //         content,
    //         published: false,
    //         author: {
    //           connect: { email: authorEmail },
    //         },
    //       },
    //     })
    //   },
    // })
  },
})

export const schema = makeSchema({
  types: [Query, Photo, GQLDate],
  outputs: {
    // typegen: path.join(__dirname, 'nexus-typegen.ts'),
    // schema: path.join(__dirname, 'schema.graphql')
  },
})