# MittoFE

steps to spin docker container:

- npm i
- ng build --prod
- docker image build -t mittofe .
- docker run -p 3000:80 --rm mittofe

Docker image runs angular app hosted on the nginx.
