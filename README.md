# MittoFE

- Configure API url in src\environments\environment.prod.ts

Steps to spin docker container:

- Navigate to root folder
- npm i
- ng build --prod
- docker image build -t mittofe .
- docker run -p 3000:80 --rm mittofe

Docker image runs angular app hosted on the nginx.

