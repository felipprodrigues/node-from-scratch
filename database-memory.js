import {randomUUID} from 'node:crypto'

export class DatabaseMemory {
  #videos = new Map()

  // Set como se fosse um array e não aceita duplicidade
  // Map como se fosse um objeto e tem uma api própria


  list(search) {
    return Array.from(this.#videos.entries())
    .map((videoArray) => {
      const id = videoArray[0]
      const data = videoArray[1]

      return {id, ...data}
    })
    .filter(video => {
      if(search) {
        return video.title.includes(search)
      }

      return true
    })
  }

  create(video) {
    // Gera um id aleatorio como chave e atribui o valor video para ele
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}
