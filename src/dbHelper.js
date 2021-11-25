export default class dbHelper {
  constructor() {
    this.DB = undefined
    this.DB_NAME = 'POC'
    this.DB_VERSION = '1'
    this.STORE_NAME = 'SYNC_INPUTS'
  }
  async getDb() {
    return new Promise((resolve, reject) => {
      if (this.DB) {
        return resolve(this.DB)
      }

      let request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION)

      request.onerror = (e) => {
        reject('Error')
      }

      request.onsuccess = (e) => {
        this.DB = e.target.result
        resolve(this.DB)
      }
      request.onupgradeneeded = (e) => {
        let db = e.target.result

        db.createObjectStore(this.STORE_NAME, {
          keyPath: ['value', 'type']
        })
      }
    })
  }
  async saveInput(input) {
    let db = await this.getDb()

    return new Promise((resolve) => {
      try {
        let trans = db.transaction([[this.STORE_NAME]], 'readwrite')

        let store = trans.objectStore([this.STORE_NAME])
        const resp = store.put(input)
        //const resp = store.add(input);

        resp.onsuccess = (event) => {
          //console.log("success");
          resolve({ status: true, data: event.target.result })
        }
        resp.onerror = (event) => {
         //console.log('error')
          resolve({ status: false, data: event.target.error })
        }
      } catch (e) {
        console.error('IDB EXCEPTION @ saveInput', e.name)
        resolve({ status: false, exception: e.name })
      }
    })
  }

  async saveArrayOfInputs(arrayOfInputs) {
    let db = await this.getDb()

    return new Promise((resolve) => {
      try {
        let trans = db.transaction([[this.STORE_NAME]], 'readwrite')

        let store = trans.objectStore([this.STORE_NAME])

        for (var i = 0; i < arrayOfInputs.length; i++) {
          store.put(arrayOfInputs[i])
        }
        trans.oncomplete = () => {
          resolve({ status: true })
        }
        return trans.complete

        /*   const resp = store.put(input);
        //const resp = store.add(input);

        resp.onsuccess = (event) => {
          //console.log("success");
          resolve({ status: true, data: event.target.result });
        };
        resp.onerror = (event) => {
         //console.log("error");
          resolve({ status: false, data: event.target.error });
        }; */
      } catch (e) {
        console.error('IDB EXCEPTION @ saveInput', e.name)
        resolve({ status: false, exception: e.name })
      }
    })
  }

  async getSavedInputs() {
    let db = await this.getDb()

    return new Promise((resolve) => {
      try {
        let trans = db.transaction([this.STORE_NAME], 'readonly')

        let store = trans.objectStore([this.STORE_NAME])

        const resp = store.getAll()

        resp.onsuccess = (event) => {
          //console.log("success");
          resolve({ status: true, data: event.target.result })
        }
        resp.onerror = (event) => {
         //console.log('error')
          resolve({ status: false, data: event.target.error })
        }
      } catch (e) {
        console.error('IDB EXCEPTION @ getSavedInputs', e.name)
        resolve({ status: false, exception: e.name })
      }
    })
  }

  async clearIdb() {
    let db = await this.getDb()

    return new Promise((resolve) => {
      try {
        let trans = db.transaction([this.STORE_NAME], 'readwrite')

        let store = trans.objectStore([this.STORE_NAME])

        const resp = store.clear()

        resp.onsuccess = (event) => {
          //console.log("success");
          resolve({ status: true, data: event.target.result })
        }
        resp.onerror = (event) => {
         //console.log('error')
          resolve({ status: false, data: event.target.error })
        }
      } catch (e) {
        console.error('IDB EXCEPTION @ clearIdb', e.name)
        resolve({ status: false, exception: e.name })
      }
    })
  }

  async clearSynced(arrayToDelete) {
    let db = await this.getDb()

    return new Promise((resolve) => {
      try {
        let trans = db.transaction([[this.STORE_NAME]], 'readwrite')

        let store = trans.objectStore([this.STORE_NAME])

        for (var i = 0; i < arrayToDelete.length; i++) {
          store.delete([arrayToDelete[i]['value'], arrayToDelete[i]['type']])
        }
        trans.oncomplete = () => {
          resolve({ status: true })
        }
        return trans.complete

        /*   const resp = store.put(input);
        //const resp = store.add(input);

        resp.onsuccess = (event) => {
          //console.log("success");
          resolve({ status: true, data: event.target.result });
        };
        resp.onerror = (event) => {
         //console.log("error");
          resolve({ status: false, data: event.target.error });
        }; */
      } catch (e) {
        console.error('IDB EXCEPTION @ saveInput', e.name)
        resolve({ status: false, exception: e.name })
      }
    })
  }
}
