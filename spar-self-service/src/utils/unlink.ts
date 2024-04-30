
import {prefixBaseApiPath} from "./path";


export function unlinkFa(

) {

  

  fetch(prefixBaseApiPath("/selfservice/unlink"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
}