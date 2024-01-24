## Database Docker
docker-compose up -d 
docker-compose down -d

## Create Nest
nest new new_project
nest g module ...
nest g controller ... --no-spec
nest g service ...    --no-spec

## Install Tech
npm i 
prisma 


## Prisma init
-> support migration database 
npx prisma init
npx prisma --help
npx prisma studio

link: https://hasura.io/blog/top-psql-commands-and-flags-you-need-to-know-postgresql/

psql -U <username> 
\l  : list databases;
\c  : another database ( use <database> )
\dt : show data in database
