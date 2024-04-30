import {prefixBaseApiPath} from "./path";


export function getFa(
  succFunc?: (_res: any) => any,
  failFunc?: (_res: any, _err: any) => any
) {
  fetch(prefixBaseApiPath("/selfservice/resolve"), {
    method: "POST",
  })
  .then((res) => {
    if (res.ok) {
      res
        .json()
        .then((resJson) => {
          if (succFunc) {
            succFunc(resJson);
          }
        })
        .catch((err) => {
          if (failFunc) {
            failFunc(null, err);
          }
        });
    } else {
      if (failFunc) {
        failFunc(null, null);
      }
    }
  })
  .catch((err) => {
    if (failFunc) {
      failFunc(null, err);
    }
  });
}
