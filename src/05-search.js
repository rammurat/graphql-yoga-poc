import {GraphQLServer} from 'graphql-yoga'

const allUsers = [{
    id: 1,
    name: 'Ram',
    email: 'rammurat@gmail.com',
    age: 32
}, {
    id: 2,
    name: 'Deepak',
    email: 'deepak@gmail.com',
    age: 29
}]

const allPosts = [{
    id: 11,
    title: 'Post 1',
    body: 'First post',
    published: true
}, {
    id: 12,
    title: 'Post 2',
    body: 'Second post',
    published: true
},{
    id: 13,
    title: 'Post 3',
    body: 'Third post',
    published: false
}, {
    id: 14,
    title: 'Post 4',
    body: 'Forth post',
    published: false
}]

// type defination
const typeDefs = `
    type Query {
        posts(query: String): [Post!]!
        users(query: String): [User!]!
        allUsers: [User!]!
        allPosts: [Post!]!
    }

    type Post {
        id: ID!,
        title: String!,
        body: String!,
        published: Boolean!
    }

    type User {
        id: ID!,
        name: String!,
        email: String!,
        age: Int!
    }
`

// resolvers
const resolvers = {
    Query: {
        allPosts() {
            return allPosts
        },
        allUsers() {
            return allUsers
        },
        posts(parent, args) {
            if(!args.query) {
                return allPosts
            }

            return allPosts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        users(parent, args) {
            if(!args.query) {
               return allUsers
            }

            return allUsers.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server running")
})