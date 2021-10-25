import express, { Application } from 'express'
import userRoutes from '../usuario/usuario.routes'
import cors from 'cors'
import db from '../db/connection'

class Server {
    private app:Application;
    private port :string;
    private apiPaths={
      usuarios: '/api/usuarios'
    };

    constructor () {
      this.app = express()
      this.port = process.env.PORT || '8000'

      this.dbConnection()
      this.middlewares()
      //   Definir mis rutas
      this.routes()
    }

    async dbConnection () {
      try {
        await db.authenticate()
        console.log('database online')
      } catch (error) {
        throw new Error(`${error}`)
      }
    }

    // TODO conectar a la bd
    middlewares () {
      // Cors
      this.app.use(cors())
      // Lectura del body
      this.app.use(express.json())
      // carpeta publica
      this.app.use(express.static('public'))
    }

    routes () {
      this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen () {
      this.app.listen(this.port, () => {
        console.log('Servidor en puerto ' + this.port)
      })
    }
}

export default Server
