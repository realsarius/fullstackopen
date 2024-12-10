const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Person = require('./models/person');
const User = require('./models/user');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
    Mutation: {
        addPerson: async (root, args, context) => {
            const person = new Person({ ...args });
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            try {
                await person.save();
                currentUser.friends = currentUser.friends.concat(person);
                await currentUser.save();
            } catch (error) {
                throw new GraphQLError('Saving user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }

            pubsub.publish('PERSON_ADDED', { personAdded: person });

            return person;
        },
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
        },
    },
};

module.exports = resolvers;