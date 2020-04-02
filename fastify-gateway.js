const Fastify = require('fastify')
const GQL = require('fastify-gql')

gateway.register(GQL, {
  gateway: {
    services: [{
      name: "accounts",
      url: "http://localhost:4001/graphql"
    }, {
      name: "reviews",
      url: "http://localhost:4002/graphql"
    }, {
      name: "products",
      url: "http://localhost:4003/graphql"
    }, {
      name: "inventory",
      url: "http://localhost:4004/graphql"
    }]
  }
})

gateway.listen(4000)