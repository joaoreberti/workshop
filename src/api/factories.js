import { imageBase64 } from './base64'
import dbHelper from '../dbHelper'
const dbHelperInstance = new dbHelper()

export default class Factories {
  constructor() {}
  async insert_N_Records(N) {
    let arrayToSave = []
    for (let i = 0; i < N; i++) {
      arrayToSave.push({
        value: Math.floor(Math.random() * 10000),
        type: Math.floor(Math.random() * 2) > 1 ? 'ean' : 'sku',
        status: 0,
        url: imageBase64
      })
    }

    return await dbHelperInstance.saveArrayOfInputs(arrayToSave)
  }
}


