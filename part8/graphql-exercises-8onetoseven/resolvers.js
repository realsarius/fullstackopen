const Book = require('./model/book');
const Author = require('./model/author');
const { GraphQLError } = require('graphql/error');
const jwt = require('jsonwebtoken');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
    Query: {
        dummy: () => 0,
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args, context) => {
            const { genre } = args;
            let filter = {};

            if (genre) {
                filter = { genres: { $in: [genre] } };
            }

            return Book.find(filter);
        },

        allAuthors: async (root, args) => {
            return Author.find({});
        },
        me: (root, args, context) => {
            console.log('me resolver context:', context.currentUser);
            return context.currentUser;
        },
    },
    Author: {
        bookCount: async (root) => {
            return Book.countDocuments({ author: root._id });
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            let author;


            if (args.author.match(/^[0-9a-fA-F]{24}$/)) {

                author = await Author.findById(args.author);
            } else {
                author = await Author.findOne({ name: args.author });
            }

            if (!author) {
                throw new GraphQLError('Author not found', {
                    extensions: { code: 'BAD_USER_INPUT' },
                });
            }

            const book = new Book({
                title: args.title,
                published: args.published,
                author: author._id,
                genres: args.genres,
            });

            await book.save();
            await book.populate('author');

            pubsub.publish('BOOK_ADDED', { bookAdded: book });

            return book.populate('author');
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name });
            if (!author) {
                return null;
            }

            author.born = args.setBornTo;
            author.username = args.setUsername;

            try {
                await author.save();
                return author;
            } catch (error) {
                throw new GraphQLError('Failed to edit author', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
        },
        addAuthor: async (root, args) => {
            const existingAuthor = await Author.findOne({ username: args.username });
            if (existingAuthor) {
                throw new GraphQLError('Author already exists', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    },
                });
            }

            const author = new Author({
                name: args.name,
                username: args.username,
                born: args.born || null,
            });

            try {
                await author.save();
                return author;
            } catch (error) {
                throw new GraphQLError('Failed to add author', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
        },
        login: async (root, args) => {
            const author = await Author.findOne({ username: args.username });

            if (!author || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const userForToken = {
                username: author.username,
                id: author._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
        },
    },
};

module.exports = resolvers;