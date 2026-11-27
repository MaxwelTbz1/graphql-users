import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { BaseContext } from "@apollo/server";

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String
    age: Int
  }

type Query {
  hello: String!
  user(id: ID!): User
  users: [User!]!
  usersByName(name: String!): [User!]!
  me: User
}
`;

const usersData = [
  {
    id: "1",
    name: "Régis",
    email: "regis@example.com",
    age: 25,
  },
  {
    id: "2",
    name: "Alex",
    email: "alex@example.com",
    age: 28,
  },
  {
    id: "3",
    name: "ALEX",
    email: "allex@example.com",
    age: 25,
  },
];

interface ContextValue extends BaseContext {
  user: {
    id: string;
    role: string;
  } | null;
}

const resolvers = {
  Query: {
    hello: () => "Bienvenue sur SocialGraph API !",

    user: (_parent: unknown, args: { id: string }) => {
      return usersData.find((user) => user.id === args.id) ?? null;
    },

    users: () => usersData,
    usersByName: (_parent: unknown, args: { name: string }) => {
      return usersData.filter((user) =>
        user.name.toLowerCase().includes(args.name.toLowerCase()),
      );
    },

    me: (
      _parent: unknown,
      _args: Record<string, never>,
      context: ContextValue,
    ) => {
      if (!context.user) {
        return null;
      }

      return usersData.find((user) => user.id === context.user?.id) ?? null;
    },
  },
};

const server = new ApolloServer<ContextValue>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  context: async () => ({
    user: {
      id: "1",
      role: "USER",
    },
  }),
  listen: { port: 4000 },
});

console.log(`🚀 SocialGraph API disponible sur ${url}`);
