const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['livreurMiddleware'] = require('..\\middleware\\livreurMiddleware.js')
middleware['livreurMiddleware'] = middleware['livreurMiddleware'].default || middleware['livreurMiddleware']

middleware['restaurateurMiddleware'] = require('..\\middleware\\restaurateurMiddleware.js')
middleware['restaurateurMiddleware'] = middleware['restaurateurMiddleware'].default || middleware['restaurateurMiddleware']

export default middleware
