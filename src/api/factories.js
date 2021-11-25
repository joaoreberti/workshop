import dbHelper from '../dbHelper'
const dbHelperInstance = new dbHelper()

export default class Factories {
  constructor() {}
  async insert_N_Records(N) {
    let arrayToSave = []
    for (let i = 0; i < N; i++) {
      arrayToSave.push({
        value: i,
        type: Math.floor(Math.random() * 2) > 1 ? 'ean' : 'sku',
        status: 0,
        url: {
          id: 6407842,
          order_nr: '1180108054',
          order_id: 6407842,
          status_oms: 1,
          shipment_id: 913023,
          source: 2,
          start_date: '2021-11-25 13:08:03',
          status: 1,
          timing: '2021-11-25 13:23:03',
          type: 4,
          updated_at: '2021-11-25 15:30:11',
          1: {
            id: 6407842,
            order_nr: '1180108054',
            order_id: 6407842,
            status_oms: 1,
            shipment_id: 913023,
            source: 2,
            start_date: '2021-11-25 13:08:03',
            status: 1,
            timing: '2021-11-25 13:23:03',
            type: 4,
            updated_at: '2021-11-25 15:30:11',
            2: {
              id: 6407842,
              order_nr: '1180108054',
              order_id: 6407842,
              status_oms: 1,
              shipment_id: 913023,
              source: 2,
              start_date: '2021-11-25 13:08:03',
              status: 1,
              timing: '2021-11-25 13:23:03',
              type: 4,
              updated_at: '2021-11-25 15:30:11'
            }
          }
        }
      })
    }

    return await dbHelperInstance.saveArrayOfInputs(arrayToSave)
  }
}
