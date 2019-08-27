

export async function bindPolicyRequest(quoteNumber, idToken, endpointURL) {
  return new Promise(function (resolve, reject) {
    var data = JSON.stringify({
      "exchangeName": "harmony",
      "routingKey": "harmony.policy.bindPolicy",
      "data": {
        quoteId: quoteNumber,
        "force": true
      }
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", endpointURL, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", "bearer " + idToken);

    xhr.onload = function () {
      var status = xhr.status;
      if (status === 200) {
          resolve(status);
      } else {
          reject(status);
      }
    };

    xhr.send(data);
});
 
}
