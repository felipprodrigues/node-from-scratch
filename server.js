import { DatabasePostgres } from './database-postgres.js'

import {fastify} from 'fastify'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Request body (POST/PUT)
// Enviamos um corpo da requisição. Enviamos os dados para o banco

server.post('/videos', async (request, reply) => {
  const {title, description, duration} = request.body

  await database.create({
    title,
    description,
    duration
  })

  return reply.status(201).send()
})

server.get('/videos', async (request) => {
  const search = request.query.search


  const videos = await database.list(search)

  return videos
})

// Route parameter :id
// PUT http://localhost:3333/videos/:id
server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  const {title, description, duration} = request.body

  await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})

// DELETE http://localhost:3333/videos/:id
server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3333
})
