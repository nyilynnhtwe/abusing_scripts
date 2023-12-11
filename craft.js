const fs = require("fs").promises;

const heroDataPath = "raw_data.json";
const imageUrlDataPath = "image_urls.json";

fs.readFile(heroDataPath, "utf8").then((result) => {
  heros = JSON.parse(result);
  fs.readFile(imageUrlDataPath, "utf8").then((result) => {
    imageUrls = JSON.parse(result);
    for (let index = 0; index < imageUrls.length; index++) {
      const imageUrl = imageUrls[index].url;
      const imageName = imageUrl.split("/")[imageUrl.split("/").length-1];
      // console.log(imageName);
      for (let jindex = 0; jindex < heros.length; jindex++) {
        const hero = heros[jindex];
        const heroName = hero["localized_name"];
        const formattedHeroName = heroName.includes(" ")?heroName.split(" ").join("_"): heroName;
        if(imageName.includes(formattedHeroName))
        {
          heros[jindex]["imageUrl"] = `https://liquipedia.net/${imageUrl}`;
        }
      }
    }
    fs.writeFile('data.json',JSON.stringify(heros), function (err) {
      if (err) throw err;
      console.log('Replaced!');
    });
  });
});
