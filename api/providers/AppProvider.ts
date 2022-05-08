import Application from '@ioc:Adonis/Core/Application'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

class Picture {
  id: string
  filename: string
  uploader: string
  uploadedAt: Date
  favorites: number
  comments: string[]
}

var loki = require('lokijs')
var db: any = null;

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
  if (db === null) return;
  var entries = db.getCollection("pictures");
  if (entries === null) {
    entries = db.addCollection("pictures");
  } else {
    console.log('initialized picture db with ' + entries.count() + ' entries')
  }
}

export default class AppProvider {
  constructor(protected app: ApplicationContract) {
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    db = new loki('quickstart.db', {
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: true,
      autosaveInterval: 4000
    });

    const { default: Route } = await import('@ioc:Adonis/Core/Route')
    const { nanoid } = await import('nanoid')

    Route.post('upload', async ({ request }) => {
      const uploader = request.body()['uploader']
      const uploadedAt = new Date()
      const images = request.files('images')
      for (let image of images) {
        const p = new Picture()
        p.uploadedAt = uploadedAt
        p.uploader = uploader
        p.id = nanoid(16)
        await image.move(Application.publicPath(`images/${uploader}/${p.id}/`))
        db.getCollection('pictures').insert(p)
      }
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
