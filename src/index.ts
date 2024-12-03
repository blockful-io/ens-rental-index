import { ponder } from "@/generated";
import * as schema from "../ponder.schema";

ponder.on("ENSRent:DomainListed", async ({ event, context }) => {
  await context.db.insert(schema.listing).values({
    id: event.transaction.hash,
    tokenId: event.args.tokenId,
    name: event.args.name,
    lender: event.args.lender,
    price: event.args.minPricePerSecond,
    node: event.args.nameNode,
    rentalEnd: event.args.maxEndTimestamp,
    createdAt: event.block.timestamp,
    isWrapped: Boolean(event.args.tokenId && event.args.tokenId > 0n),
  });
});

ponder.on("ENSRent:DomainRented", async ({ event, context }) => {
  const listing = await context.db.find(schema.listing, { tokenId: event.args.tokenId })

  if (!listing) {
    throw new Error(`Listing not found for tokenId: ${event.args.tokenId}`)
  }

  await context.db.insert(schema.rental).values({
    id: event.transaction.hash,
    tokenId: event.args.tokenId,
    borrower: event.args.borrower,
    startTime: event.block.timestamp,
    endTime: event.args.rentalEnd,
    price: event.args.pricePerSecond,
    listingId: listing.id
  });
});

ponder.on("ENSRent:DomainReclaimed", async ({ event, context }) => {
  await context.db
    .update(schema.listing, { tokenId: event.args.tokenId })
    .set({
      rentalEnd: event.block.timestamp,
    })
});