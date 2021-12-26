const axios = require("axios");
const cheerio = require("cheerio");
const { text } = require("express");

const scrapper = async (url) => {
  // site(url);
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip",
      DNT: "1",
      Connection: "close",
    },
  });

  // Loading Site data
  const amazonStoreSelector = (html) => {
    let price = html(".a-offscreen").text().trim();
    let dealPrice = html("#priceblock_dealprice").text().trim();
    let bookPrice = html(".price3P").text().trim();
    let kindlePrice = html("#kindle-price").text().trim();
    let tag = [price, dealPrice, bookPrice, kindlePrice];
    for (let i = 0; i < tag.length; i++) {
      if (tag[i].length !== 0) {
        return tag[i];
      }
    }
    return null;
  };

  try {
    const html = await cheerio.load(response.data);

    // Flipkart scraper
    if (url.includes("flipkart")) {
      let price = html("._16Jk6d").text().split("₹")[1];
      let title = html(".B_NuCI").text();

      if (price !== undefined) {
        price = price.replace(/\,/g, "");
        return Promise.resolve(["Flipkart", title, Number(price)]);
      }

      //  Amazon scraper
    } else if (url.includes("amazon")) {
      let title = html("#productTitle").text().trim();
      let selectedTag = amazonStoreSelector(html);
      if (!selectedTag) {
        return Promise.resolve(["Amazon", title, 0]);
      } else {
        if (selectedTag.includes("₹")) {
          let splitArray = selectedTag.split("₹");
          // If Price is not given in range
          if (splitArray.length <= 2) {
            let newPrice = splitArray[1].trim();
            if (newPrice !== undefined) {
              newPrice = newPrice.replace(/\,/g, "");
              return Promise.resolve(["Amazon", title, Number(newPrice)]);
            }
          } else {
            //  if price is given in range

            let newPrice = splitArray[2].trim();
            if (newPrice !== undefined) {
              newPrice = newPrice.replace(/\,/g, "");
              return Promise.resolve(["Amazon", title, Number(newPrice)]);
            }
          }
        } else {
          let newPrice = selectedTag.trim();
          newPrice = newPrice.replace(/\,/g, "");
          return Promise.resolve(["Amazon", title, Number(newPrice)]);
        }
      }
    }
    // Nykaa scraper
    else if (url.includes("nykaa")) {
      let price = html(".post-card__content-price-offer").text().split(" ");
      let title = html(".product-title").text();
      if (price !== undefined) {
        let newPrice = price[0].split("₹")[1];
        newPrice = newPrice.replace(/\,/g, "");
        return Promise.resolve(["Nykaa", title, Number(newPrice)]);
      }
      // Snaldeal scrapper
    } else if (url.includes("snapdeal")) {
      let price = html(".payBlkBig").text();
      let title = html(".pdp-e-i-head").text().trim();
      if (price !== undefined) {
        price = price.trim().replace(/\,/g, "");
        return Promise.resolve(["Snapdeal", title, Number(price)]);
      }
      // Paytm Mall
    } else if (url.includes("paytmmall")) {
      let title = html(".NZJI").text().trim();
      let price = html("._1V3w").text().trim();
      if (price !== undefined) {
        price = price.replace(/\,/g, "");
        return Promise.resolve(["Paytm", title, Number(price)]);
      }
    }
    // lime road
    else if (url.includes("limeroad")) {
      let title = html(".ftwN").text().trim().split("\n");
      let newTitle = title[0].trim();
      let price = html(".sell").text();
      if (price !== undefined) {
        price = price.trim();
        price = price.replace(/\,/g, "");
        return Promise.resolve(["Lime Road", newTitle, Number(price)]);
      }
    }
    // Reliance Digital
    else if (url.includes("reliancedigital")) {
      let title = html(".pdp__title").text().trim();
      let price = html(".pdp__offerPrice").text();
      if (price !== undefined || price.length !== 0) {
        price = price.split("₹")[1].trim();
        price = price.replace(/\,/g, "");
        return Promise.resolve(["Reliance Digital", title, Number(price)]);
      }
    } else {
      Promise.resolve(["error", "Site not found", 0]);
    }
  } catch (error) {
    // console.log(error);
    Promise.reject(error);
  }
};

module.exports = scrapper;
