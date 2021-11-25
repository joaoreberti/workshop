import img from "./287.jpeg";
export default class MockApi {
  constructor() {}

  syncData(inputArray) {
    //console.log({ inputArray });

    if (Math.floor(Math.random() * 10) < 2) {
      //console.log("errro na api");
      //workBox service worker implementation
      return {
        statusCode: 500,
        message: "Não foi possível sincronizar"
      };
    } else {
      //e.log("api success");
      return {
        statusCode: 200,
        message: "sincronizado com sucesso",
        data: inputArray.map((element) => {
          if (Math.floor(Math.random() * 10) < 5) {
            element.status = -1;
            return element;
          }
          element.status = 1;
          //console.log(encodeImageFileAsURL(img));
          /*  element.url = ""; */
          return element;
        })
      };
    }
  }
}
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    console.log("RESULT", reader.result);
  };
  reader.readAsDataURL(file);
}
