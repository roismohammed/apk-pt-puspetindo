import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'karyawans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // table.integer('departemen_id').unsigned().references('departemen.d').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('nama').unique()
      table.string('jabatan')
      table.string('status')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}