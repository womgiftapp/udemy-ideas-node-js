if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI:
            'mongodb://margarita:margo1984@ds255970.mlab.com:55970/ideas'
    }
} else {
    module.exports = {
        mongoURI:
            'mongodb://localhost/example-dev'
    }
}