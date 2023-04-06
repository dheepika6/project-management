const { projects, clients } = require("../sampleData");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//CLient type
const clientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const projectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    // clientId: {},
    client: {
      type: clientType,
      resolve(parent, args) {
        return clients.find((client) => client.id === parent.clientId);
      },
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: () => ({
    clients: {
      type: new GraphQLList(clientType),
      resolve(parent, args) {
        return clients;
      },
    },
    client: {
      type: clientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        // return data
        return clients.find((client) => client.id === args.id);
      },
    },
    projects: {
      type: GraphQLList(projectType),
      resolve(parent, args) {
        return projects;
      },
    },
    project: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query: RootQuery });
