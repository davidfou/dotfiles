#!/usr/bin/fish

if not test -d ~/Workspace/uz/server
  cd ~/Workspace/uz
  git clone git@gitlab.com:urbantz-logistics/server.git
  cd server
  asdf install nodejs 12.18.2
  asdf local nodejs 12.18.2
  npm install
  echo > .env.local '{
  "EXTERNAL_CARRIERS": [
    {
      "KEY": "maf-carrier-integration-key",
      "NAME": "maf-carrier",
      "PLATFORM": "P_vbZ8i7hd1dvVzdsfvGnS00D0eCkOT2km"
    }
  ],
  "URBANTZ": {
    "WEB": "http://localhost:8900",
    "BACKEND": {
      "URL": "http://localhost:5000",
      "PORT": 5000
    },
    "PUBLIC_API": {
      "URL": "http://localhost:5001",
      "PORT": 5001
    },
    "WORKER": {
      "CLIENT": "AMQP",
      "URL": "http://localhost:5002",
      "PORT": 5002
    }
  }
}'
end

if not test -d ~/Workspace/uz/web
  cd ~/Workspace/uz
  git clone git@gitlab.com:urbantz-logistics/web.git
  cd web
  asdf install nodejs 12.18.2
  asdf local nodejs 12.18.2
  npm install
end

if not test -d ~/Workspace/uz/app
  cd ~/Workspace/uz
  git clone git@gitlab.com:urbantz-logistics/app.git
  cd app
  asdf install nodejs 8.17.0
  asdf shell nodejs 8.17.0
  echo > ~/.npmrc 'registry=https://registry.npmjs.org/
//npm.togetair.com:5000/:_authToken="7y4aXDrR3IXCsJQFmgDBSS4mkpLtZ0uDkrd94qrE1fc="
@togetair:registry=http://npm.togetair.com:5000/
@togetair-client:registry=http://npm.togetair.com:5000/
@togetair-server:registry=http://npm.togetair.com:5000/
'
  npm install -g @togetair/cli
  npm install
end
