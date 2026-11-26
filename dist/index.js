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
];
const resolvers = {
    Query: {
        hello: () => "Bienvenue sur SocialGraph API !",
        user: (_parent, args) => {
            return usersData.find((user) => user.id === args.id) ?? null;
        },
        users: () => usersData,
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
//# sourceMappingURL=index.js.map