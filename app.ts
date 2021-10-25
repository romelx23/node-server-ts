import dotenv from 'dotenv'
import Server from './src/server/server'
dotenv.config({ path: './src/envs/.env' })

const server = new Server()

server.listen()
