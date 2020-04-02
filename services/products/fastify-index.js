const Fastify = require('fastify')
const GQL = require('fastify-gql')

const app = Fastify()

const typeDefs = `
  extend type Query {
    topProducts(first: Int = 5): [Product]
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
    weight: Int
  }
`;

const resolvers = {
  Product: {
    __resolveReference: (object) => {
      return products.find(product => product.upc === object.upc);
    }
  },
  Query: {
    topProducts: (_, args) => {
      return products.slice(0, args.first);
    }
  }
};

app.register(GQL, {
  schema: typeDefs,
  resolvers,
  federationMetadata: true,
  graphiql: true
})

app.listen(4003)

const products = [
  {
    upc: "1",
    name: "Table",
    price: 899,
    weight: 100
  },
  {
    upc: "2",
    name: "Couch",
    price: 1299,
    weight: 1000
  },
  {
    upc: "3",
    name: "Chair",
    price: 54,
    weight: 50
  }
];
