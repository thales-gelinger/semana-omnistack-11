import knex from "knex"
import configuration from "../../knexfile"

const config = process.env.NODE_ENV === 'test' ? 'test' : 'development'

const connection = knex(configuration[config])

export default connection