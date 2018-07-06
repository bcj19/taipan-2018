var objName = 'tpan';
window[objName] = {
  wallet: 100000,
  bank: 100000,
  hold: 50,
  warehouse: {
    max: 10000,
  },
  ownedProducts: {},
  guns: 0,

  /**
   * TRAVEL TO...
   * 1. Hong King
   * 2. Shanghai
   * 3. Nagasaki
   * 4. Saigan
   * 5. Manila
   * 6. Singapore
   * 7. Batavia
   */
  destinations: [
    { city: 'Hong Kong', hasBank: true, hasWarehouse: true, hasCharity: true }, 
    { city: 'Shanghai', hasBank: false, hasWarehouse: false, hasCharity: false },
    { city: 'Nagasaki', hasBank: false, hasWarehouse: false, hasCharity: false },
    { city: 'Saigan', hasBank: false, hasWarehouse: false, hasCharity: false },
    { city: 'Manila', hasBank: false, hasWarehouse: false, hasCharity: false },
    { city: 'Singapore', hasBank: false, hasWarehouse: false, hasCharity: false },
    { city: 'Batavia', hasBank: false, hasWarehouse: false, hasCharity: false },
  ],

  getAvailableDestinations: function(destId) {
    if(destId) {
      return this.destinations[destId];
    } else {
      return this.destinations;
    }
  },

  getActiveDestination: function(destId) {
    return this.destinations[destId];
  },

  /** PRODUCTS...
   * 1. Opium
   * 2. Silk
   * 3. Arms
   * 4. General
   */
  products: [
    { name: 'Opium', high: 400000, low: 1500 },
    { name: 'Silk', high: 200000, low: 150 },
    { name: 'Arms', high: 3500, low: 10 },
    { name: 'General', high: 500, low: 2 }
  ],
  
  updatePrice: function(payload) {
    var high = payload.high,
        low = payload.low;

    return Math.floor(Math.random() * (high - low + 1)) + low;
  },
  
  getAvailableProducts: function(payload) {
    var prodId = (payload && payload.prodId) ? payload.prodId : '';

    if(prodId) {
      var returnProduct = this.products[prodId];
      returnProduct.id = prodId;
      return returnProduct;
    } else {
      var action = (payload && payload.action) ? payload.action : '';

      if(action === 'updatePrice') {
        for(var i = 0, max = this.products.length; i < max; i++) {
          this.products[i].current = this.updatePrice(this.products[i]);
        }
      }
      
      return this.products;
    }
  },

  getOwnedProducts: function(prodId) {
    return this.ownedProducts;
  },

  buildWarehouse: function(products) {
    
  },

  getWarehousedProducts: function() {
    return this.warehouse;
  },

  /** 
   * TRAVEL SCENARIOS...
   * 1. Safe passage
   * 2. Attacked by pirates
   *    a. Fight
   *    b. Run
   *    c. Throw cargo
   *    d. Li Yuen runs them off
   */
  travel: function(destId) {
    this.arrive(destId);
  },

  /**
   * ARRIVAL SCENARIOS...
   * 1. In Hong Kong
   *    a. Business with Elder Brother Wu (y/n)
   *    b. Donate to Li Yuen / Sea Goddess (varying amounts, y/n)
   * 2. ALL Locations
   *    a. Buy a new ship (y/n, occasional, varying price)
   *    b. Buy a ship's gun (y/n, occasional, varying price)
   * 3. All locations EXCEPT Hong Kong
   *    a. Li Yuen wants you in Hong Kong post haste (msg only)
   */
  arrive: function(destId) {
    this.getAvailableProducts({ action: 'updatePrice' });
    console.table(this.products);

    this.getOwnedProducts();
    console.table(this.ownedProducts);

    this.getWarehousedProducts();
    console.table(this.getWarehousedProducts);

    console.log(this.getActiveDestination(destId));
    console.table(this.getAvailableDestinations());
  }

  /** ACTIONS...
   * 1. Buy
   * 2. Sell
   * 3. Quit Trading
   * 4. Transfer Cargo (Warehouse, Hong Kong only)
   *    a. Transfer {{product}} to warehouse
   *    b. Transfer {{product}} from warehouse
   * 5. Visit Bank
   *    a. Deposit
   *    b. Withdraw
   */
}

tpan.travel('0');
