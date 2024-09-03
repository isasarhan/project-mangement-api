import 'reflect-metadata';
import http from 'http'
import app, { startApolloServer } from '../app.js'
import { connectToMongoose } from '../config/connectToMongoose.js'

const httpServer = http.createServer(app)
startApolloServer(httpServer)

const port  = process.env.PORT || 4000

connectToMongoose(process.env.db).then(()=>{
    httpServer.listen(port).on('listening', ()=>{
        console.log(`listening to port ${port}...`);
        
    })
})