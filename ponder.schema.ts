import { index, onchainTable, relations } from "@ponder/core";

export const listing = onchainTable("listing", (t) => ({
  tokenId: t.bigint().primaryKey(), // Domain's ERC721 token ID
  id: t.text().notNull(), // Tx hash of listing
  name: t.text().notNull(), // ENS name (e.g., "crypto.eth")
  lender: t.text().notNull(), // Owner's address
  price: t.bigint().notNull(), // Price for rentals
  node: t.text().notNull(), // Domain's namehash
  isWrapped: t.boolean().notNull(), // Whether domain is wrapped (ERC1155) or unwrapped (ERC721)
  rentalEnd: t.bigint().notNull(),
  createdAt: t.bigint().notNull(),
}),
  (table) => ({
    idIdx: index().on(table.id),
    tokenIdIdx: index().on(table.tokenId),
    lenderIdx: index().on(table.lender),
  }));

export const listingRelations = relations(listing, ({ many }) => ({
  rentals: many(rental),
}));

export const rental = onchainTable("rental", (t) => ({
  tokenId: t.bigint().primaryKey(), // Domain's ERC721 token ID
  id: t.text().notNull(), // Tx hash of rental
  borrower: t.text().notNull(), // Renter's address
  startTime: t.bigint().notNull(), // Rental start timestamp
  endTime: t.bigint().notNull(), // Rental end timestamp
  price: t.bigint().notNull(), // Rate paid
  listingId: t.text().notNull(), // ID of the listing
}),
  (table) => ({
    idIdx: index().on(table.id),
    tokenIdIdx: index().on(table.tokenId),
    borrowerIdx: index().on(table.borrower),
  }));

export const rentalRelations = relations(rental, ({ one }) => ({
  listing: one(listing, { fields: [rental.listingId], references: [listing.id] }),
}));
