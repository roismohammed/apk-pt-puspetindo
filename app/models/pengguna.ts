import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pengguna extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
 
  @column()
  declare name: string | null

  @column()
  declare departemen: string

  @column()
  declare jabatan: string

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}