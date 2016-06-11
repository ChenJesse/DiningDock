## DiningDock ##
#### diningAppV2 is a web-app that will use scrapy to create a crawler that periodically goes through Cornell’s dining hall menu in order to provide the information in a more accessible manner. ####

<img src="/screenshots/screenshot2.png”>
<img src="/screenshots/screenshot.png”>


Installation: 

1) Create your own sqlite database, with the command 
sqlite3 test.db “”

2) You must migrate the database

3) In order to create the dining halls, run:
python manage.py setup_halls


In order to setup crontab for automated data scraping, first navigate to menuFinder/cron.py, change the variable path_environ to your $PATH (echo $PATH). Then, use the command

python manage.py crontab add

To remove the crontab, 
python manage.py crontab remove

To show the running cronjobs, 
python manage.py crontab show

Make sure to install requirements.txt

Make sure to navigate to static directory, and run:

1) npm install
2) npm install jquery
3) npm run js
4) npm run build
