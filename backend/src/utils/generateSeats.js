export const generateSeats = (eventId, seatConfig) => {
  const seats = [];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let rowIndex = 0; rowIndex < seatConfig.rows; rowIndex++) {
    const rowLetter = alphabet[rowIndex];

    const tier = seatConfig.tiers.find((tier) => tier.rows.includes(rowLetter));

    if (!tier) {
      throw new Error(`No tier configured for row ${rowLetter}`);
    }

    for (let seatNo = 1; seatNo <= seatConfig.columns; seatNo++) {
      seats.push({
        eventId,

        row: rowLetter,

        number: seatNo,

        seatCode: `${rowLetter}${seatNo}`,

        tier: tier.name,

        price: tier.price,

        status: "AVAILABLE",
      });
    }
  }

  return seats;
};
