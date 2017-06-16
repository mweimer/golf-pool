module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'globals': {
        'angular': false,
        '_': false,
        '$': false
    },
    'extends': 'eslint:recommended',
    'plugins': [
        'angular'
    ],
    'parserOptions': {
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};