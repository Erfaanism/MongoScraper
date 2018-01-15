# MongoScraper

Deployed on Heroku:
[TopGear Mongo Scraper](https://tgscraper.herokuapp.com)
## Overview

This web application scrapes unformation from the `News` section of [TopGear's Official Website](https://topgear.com) and stores the related information of each article into database.

The first time a user visits the page, a mandatory modal will be displayed that contains disclaimer information. User can choose to save their choice using Browser Cookies, for convenience.

By default when visiting the home page, you will see the latest pulled version from database, but by clicking the `Green Refresh` button on the top right corner, the database will be emptied and the latest articles will be downloaded and stored in the database.

Users can also leave comment on each post and view the existing comments on each post. Deleting comments is another feature that is available to users, using the delete button in front of each comment.

## Technologies used

### npm packages

- [moment](http://npmjs.com/package/moment)
- [express](http://npmjs.com/package/express)
- [express-handlebars](http://npmjs.com/package/express-handlebars)
- [mongoose](http://npmjs.com/package/mongoose)
- [body-parser](http://npmjs.com/package/body-parser)
- [cheerio](http://npmjs.com/package/cheerio)
- [request](http://npmjs.com/package/request)

### CSS Libraries

- [Materialize](http://materializecss.com/getting-started.html)
- [Material Icons](https://material.io/icons/)

### JS Libraries

- [jQuery](http://jquery.com/)
- [Materialize](http://materializecss.com/getting-started.html)
- [Moment.js](http://momentjs.com/)
- [JavaScript Cookie](https://github.com/js-cookie/js-cookie)

#### Disclaimer

This is an educational project and all of the information, content and media included in this project are obtained from TopGear's website, solely for educational purposes.
Please visit [TopGear's Official Website](https://topgear.com) website to check the latest news of the automobile industry.