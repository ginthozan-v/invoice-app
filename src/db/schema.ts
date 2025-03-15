import { pgTable , serial, timestamp, integer, text, pgEnum } from 'drizzle-orm/pg-core'

export const statusEnum = pgEnum('status', ['open', 'paid', 'void', 'uncollectible'])

export const Invoices = pgTable('invoices', {
    id: serial('id').primaryKey().notNull(),
    createTs: timestamp('createTs').notNull().defaultNow(),
    value: integer('value').notNull(),
    description: text('description').notNull(),
    userId: text('userID'),
    status: statusEnum('status').notNull(),
})