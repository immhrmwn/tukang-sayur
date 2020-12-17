function currency(price) {
  return `Rp. ${price.toLocaleString(['ban', 'id']).replace(',','.')},00`
}

module.exports = currency