import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

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
    name: "Régis",
    email: "regis1@example.com",
    age: 25,
  },
];

const resolvers = {
  Query: {
    hello: () => "Bienvenue sur SocialGraph API !",

    user: (_parent: unknown, args: { id: string }) => {
      return usersData.find((user) => user.id === args.id) ?? null;
    },

    users: () => usersData,
    usersByName: (_parent: unknown, args: { name: string }) => {
      return usersData.filter((user) => user.name === args.name);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 SocialGraph API disponible sur ${url}`);
