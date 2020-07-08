import { makeSchema, objectType, stringArg, asNexusMethod, intArg, fieldAuthorizePlugin, plugin } from 'nexus';
import { GraphQLDate } from 'graphql-iso-date';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import _ from "lodash";
import q, { async } from 'q';
import { testPhotos, testWords, testAvatars } from './testdata';

const SELECT_USER = 'selectUser';
const SELECT_USER2 = 'selectUser2';
const SELECT_PHOTO = 'selectPhoto';
const SELECT_ROOMS = 'selectRooms';
const SELECT_ROOM = 'selectRoom';
const SELECT_LIKES = 'selectLikes';
const SELECT_REVIEWS = 'selectReviews';
const UPDATE_PHOTOS = 'updatePhotos';
const UPDATE_LIKE = 'updateLike';
export const AUTH_LIST = [
  SELECT_USER,
];

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

export const prisma = new PrismaClient();

const Review = objectType({
  name: 'Review',
  definition(t) {
    t.string('id')
    t.string('review'),
    t.string('createdAt')
    t.int('roomId')
    t.int('userId')
    t.field('user', { type: 'User', nullable: true })
    t.field('room', { type: 'Room', nullable: true })
  },
});
const Like = objectType({
  name: 'Like',
  definition(t) {
    t.string('id')
    t.string('roomId')
    t.string('userId')
    t.field('user', { type: 'User', nullable: true })
  },
});
const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.string('id')
    t.string('caption')
    t.string('file')
    t.string('roomId')
  },
});
export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name', { nullable: true })
    t.string('email')
    t.string('password')
    t.string('avatar', { nullable: true })
    t.string('gender', { nullable: true })

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

const UpdateResult = objectType({
  name: 'UpdateResult',
  definition(t) {
    t.boolean('success')
  }
});

const Room = objectType({
  name: 'Room',
  definition(t) {
    t.string('id')
    t.string('address')
    t.string('country')
    t.string('description')
    t.string('name')
    t.float('lat')
    t.float('lng')
    t.int('price')
    t.int('score')
    t.int('userId')
    t.field('user', { type: 'User' })
    t.list.field('photo', { type: 'Photo' })
    t.list.field('like', { type: 'Like', nullable: true })
    t.list.field('review', { type: 'Review', nullable: true })
  },
});

const createUserResult = objectType({
  name: 'createUserResult',
  definition(t) {
    t.boolean('success')
    t.field('user', { type: 'User' })
  }
});

const Objects = [Photo, User, Room, Like, LoginResult, createUserResult, Review];

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field(SELECT_REVIEWS, {
      type: 'Review',
      resolve: async (_parent, _args, ctx) => {
        const reviews = await prisma.review.findMany({
          include: {
            room: {
              select: {
                id: true
              }
            },
            user: {
              select: {
                id: true,
                avatar: true,
                email: true,
                name: true
              }
            }
          }
        });
        return reviews;
      },
    })
    t.list.field('photo', {
      type: 'Photo',
      resolve: (_parent, _args, ctx) => {
        return prisma.photo.findMany({
          first: 1,
          skip: 3
        })
      },
    })
    t.list.field(SELECT_LIKES, {
      type: 'Like',
      args: {},
      resolve: async (_parent, { }, ctx) => {
        const likes = prisma.like.findMany({
        });
        return likes;
      },
    })
    t.field(SELECT_ROOM, {
      type: 'Room',
      args: { id: intArg({ required: true }) },
      resolve: async (_parent, { id }, ctx) => {
        try {
          const room = await prisma.room.findOne({
            where: { id },
            include: {
              photo: {
                select: {
                  id: true,
                  file: true,
                  caption: true,
                }
              },
              like: {
                select: {
                  id: true,
                  user: true,
                }
              },
              user: {
                select: {
                  id: true,
                  avatar: true,
                  email: true,
                  gender: true,
                  name: true,
                }
              },
              review: {
                select: {
                  id: true,
                  review: true,
                  createdAt: true,
                  user: true
                }
              }
            },
          });
          return room;
        } catch (error) {
          console.log('error', error);
          return null;
        } finally {
          await prisma.disconnect();
        }
      },
    })
    t.list.field(SELECT_ROOMS, {
      type: 'Room',
      args: { first: intArg(), skip: intArg() },
      resolve: async (_parent, { first = 10, skip = 0 }, ctx) => {
        const rooms = await prisma.room.findMany({
          include: {
            photo: {
              select: {
                id: true,
                file: true,
                caption: true,
              }
            },
            like: {
              select: {
                id: true,
                user: true,
              }
            },
            user: {
              select: {
                id: true,
                avatar: true,
                email: true,
                gender: true,
                name: true,
              }
            }
          },
          first,
          skip,
          orderBy: {
            id: 'desc'
          }
        });
        await prisma.disconnect();
        return rooms;
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
    t.list.field("selectAllUsers", {
      type: 'User',
      args: { email: stringArg({ default: '' }) },
      resolve: async (_parent, { email }, ctx) => {
        const users = await prisma.user.findMany({
        });
        return users;
      },
    })
    t.list.field(SELECT_PHOTO, {
      type: 'Photo',
      args: { first: intArg(), skip: intArg() },
      resolve: async (_parent, { first = 10, skip = 0 }, ctx) => {
        const photos = await prisma.photo.findMany({
          first,
          skip,
        });
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
    t.field(UPDATE_PHOTOS, {
      type: UpdateResult,
      args: {
      },
      resolve: async (d, { }, ctx) => {
        try {
          const users = await prisma.user.findMany({
          });
          let pictureIndex = 0;
          let cnt = 0;
          for (const user of users) {
            await prisma.user.update({
              data: {
                avatar: testAvatars[pictureIndex]
              },
              where: {
                id: user.id
              }
            });
            console.log('cnt', cnt);
            cnt ++;
            pictureIndex ++;
            if (_.gte(pictureIndex, _.size(testAvatars))) {
              pictureIndex = 0;
            }
          }
          return {
            success: true,
          };
        } catch (error) {
          console.log('error', error);
          return {
            success: false,
          };
        }
      },
    })
    t.field(UPDATE_LIKE, {
      type: UpdateResult,
      args: { roomId: intArg() },
      resolve: async (_parent, { roomId }, ctx) => {
        if (_.isUndefined(ctx?.userId ?? undefined)) {
          throw "ERROR-001";
        }
        try {
          const result = await prisma.like.findMany({
            where: {
              AND: [
                {
                  roomId
                },
                {
                  userId: ctx?.userId ?? ''
                }
              ]
            }
          });
          if (_.isEmpty(result)) {
            await prisma.like.create({
              data: {
                room: {
                  connect: {
                    id: roomId
                  }
                },
                user: {
                  connect: {
                    id: ctx.userId
                  }
                }
              }
            });
          } else {
            await prisma.like.deleteMany({
              where: {
                id: {
                  in: _.map(result, item => item.id)
                }
              }
            });
          }
          return {
            success: true,
          };
        } catch (error) {
          console.log('error', error);
          return {
            success: false,
            message: error,
          };
        }
      },
    })
    t.field('login', {
      type: 'LoginResult',
      args: { email: stringArg({ required: true }), password: stringArg(), loginType: stringArg() },
      resolve: async (_parent, { email, password, loginType = '' }, ctx) => {
        const user = await prisma.user.findMany({
          where: { email }
        });
        if (_.isEmpty(user)) {
          if (_.includes(["facebook", "google"], loginType)) {
            const newUser = await prisma.user.create({
              data: {
                email,
                password: 'temp'
              }
            });
            return {
              success: true,
              accessToken: sign({ userId: newUser[0].id }, process.env.ACCESS_TOKEN_SECRET!, {
                expiresIn: "300d"
              }),
              refreshToken: sign({ userId: newUser[0].id }, process.env.REFRESH_TOKEN_SECRET!, {
                expiresIn: "300d"
              }),
              user: user[0]
            };
          }
          return {
            success: false,
            error: '유저를 찾을수 없습니다.'
          };
        }
        if (_.includes(["facebook", "google"], loginType)) {
          return {
            success: true,
            accessToken: sign({ userId: user[0].id }, process.env.ACCESS_TOKEN_SECRET!, {
              expiresIn: "300d"
            }),
            refreshToken: sign({ userId: user[0].id }, process.env.REFRESH_TOKEN_SECRET!, {
              expiresIn: "300d"
            }),
            user: user[0]
          };
        }
        const valid = await compare(password, user[0].password);
        if (valid) {
          return {
            success: true,
            accessToken: sign({ userId: user[0].id }, process.env.ACCESS_TOKEN_SECRET!, {
              expiresIn: "300d"
            }),
            refreshToken: sign({ userId: user[0].id }, process.env.REFRESH_TOKEN_SECRET!, {
              expiresIn: "300d"
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
  const token = authorization?.split(" ")[1] ?? '';
  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return {
      isAuth: true,
      payload,
    };
  } catch (error) {
    console.log('error', error);
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