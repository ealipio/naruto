const fs = require('fs');
const http = require('https');

const folderName = './S';

const createFolder = async () => {
  for (let i = 1; i < 18; i++) {
    const name = `${folderName}${i}`;
    console.log(name);
    if (!fs.existsSync(name)) {
      fs.mkdirSync(name);
    }
  }
};

const createFile = () => {
  for (let i = 1; i < 16; i++) {
    fs.createWriteStream(`season${i}.json`);
  }
};
const downLoadImage = (
  imageSource = 'https://www.crunchyroll.com/imgsrv/display/thumbnail/1920x1080/catalog/crunchyroll/25f073e84ebff61d77b015cf0493d689.jpe',
  target = `./assets/season2/25f073e84ebff61d77b015cf0493d689.jpe`
) => {
  http
    .get(imageSource, (res) => {
      const imageFile = fs.createWriteStream(target);
      res.pipe(imageFile);
      imageFile.on('finish', () => {
        imageFile.close();
        console.log('success.');
      });
    })
    .on('error', (err) => {
      fs.unlink(target);
      console.error(err);
    });
};

const readJSON = () => {
  for (let i = 16; i < 17; i++) {
    fs.readFile(`season${i}.json`, 'utf8', (err, data) => {
      if (err) throw err;
      const jsonContent = JSON.parse(data);
      const episodes = jsonContent.data.length;

      for (let episode = 0; episode < episodes; episode++) {
        const [thumbnail] = jsonContent.data[episode].images.thumbnail;
        const [lastImage] = thumbnail.slice(-1);

        const imageName = lastImage.source.split('/').slice(-1);
        console.log(lastImage.source, imageName);
        // https://www.crunchyroll.com/imgsrv/display/thumbnail/1920x1080/catalog/crunchyroll/dd3e1b12263aa8f26bdecb7f623ab19f.jpe
        downLoadImage(lastImage.source, `./assets/season${i}/${imageName}`);
      }
    });
  }
};

//createFolder();
//createFile();
readJSON();
//downLoadImage();
