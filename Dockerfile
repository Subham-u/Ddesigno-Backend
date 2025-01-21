FROM node:20
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY . .

# Install npm production packages 
RUN npm install 



ENV PORT 3000
ENV MONGODB_URI mongodb://mongodb:27017
ENV CORS_ORIGIN *
ENV ACCESS_TOKEN_SECRET vjsnbnbsnvsobnfbfijbfijbfbfiobiofbnkobnfkbnfkbnfkbnfioiobiob
ENV ACCESS_TOKEN_EXPIRY 1d
ENV REFRESH_TOKEN_SECRET gerbefbehetrtehrtj4herhrjhtntyjthrtryhrhtnthmygnrmtw
ENV REFRESH_TOKEN_EXPIRY 10d


ENV CLOUDINARY_CLOUD_NAME drc3jpkia
ENV CLOUDINARY_API_KEY 733946356527224
ENV CLOUDINARY_API_SECRET oiQwYRzms-zlScaLpCIG_m-o-VQ

ENV NODEMAILER_EMAIL spearkshashi@gmail.com


ENV CLIENT_URL http://localhost:5174
ENV ADMIN_URL http://localhost:5173
ENV JWT_SECRET HELLOWORLD

EXPOSE 3000

CMD ["npm", "start"]