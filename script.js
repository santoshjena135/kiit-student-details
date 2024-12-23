async function fetchStudentInfo(appnos) {
    const results = [];
    const fetchInfo = async (appno) => {
      try {
        const response = await fetch("https://form.kiit.ac.in/payment/", {
          headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            priority: "u=0, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "upgrade-insecure-requests": "1"
          },
          referrer: "https://form.kiit.ac.in/payment/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `appno=${appno}`,
          method: "POST",
          mode: "cors",
          credentials: "include"
        });
  
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const nameCell = doc.querySelector("tr:nth-child(1) td:nth-child(3) strong");
  
        if (nameCell) {
          results.push({
            id: appno,
            name: nameCell.textContent.trim()
          });
        } else {
          results.push({
            id: appno,
            name: "Name not found"
          });
        }
      } catch (error) {
        console.error(`Error fetching for appno ${appno}:`, error);
        results.push({
          id: appno,
          name: "Error"
        });
      }
    };
  
    for (let appno of appnos) {
      await fetchInfo(appno);
    }
  
    console.log("JSON : ", JSON.stringify(results, null, 2));
  }
  
  const appnos = [];
  
  //enter rollnumber range
  for (let appno = 1628093; appno <= 1628145; appno++) {
    appnos.push(appno);
  }
  
  fetchStudentInfo(appnos);