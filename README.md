# Overview

This project standardizes requests for new AWS virtual machines being requested within a company. 

# Usage

Please note that installation instructions were done on a machine running Ubuntu 17.04. Installation instructions may vary depending on your OS.

1. Clone into the repository
2. Install Docker using the following commands:

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -` <br />
`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"` <br />
`sudo apt-get update` <br />
`apt-cache policy docker-ce` <br />
`sudo apt-get install -y docker-ce` <br />
`sudo systemctl enable docker` <br />


3. Install Docker-Compose using the following commands: 

`sudo apt-get -y install python-pip` <br />
`sudo pip install docker-compose` <br />

4. Within the AWS-VM-Form directory, run the following command to build the application using docker-compose:

`sudo docker-compose build &`

5. Start the application using the following command:

`sudo docker-compose up &`

Please note that this application needs ports 8080 open for the application and 27018 open for MongoDB.

6. Access the application by entering localhost:8080/ in your web browser.

