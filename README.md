# [Dropbox-Clone-App](https://dropbox-clone-git-main-rajmachawals-projects.vercel.app/)

## Clone Dropbox App with backend deployed on keyopb and AWS S3 access

- [Clone-app-ui](https://dropbox-clone-git-main-rajmachawals-projects.vercel.app/)
- [backend-app](https://glad-corrina-qpiai-7bb99841.koyeb.app/)


### Description
- A very simple app that mimics Dropbox functionality to files with limited size( free-tire cloud service).You upload any file and dwonload anytime anywhere. 
- App is running with UI and backend on ccloud service with CORS handled and need functionality. 
- Used SSR to make api calls and using presigned URLs to deploy to S3.

## stack used
- AWS S3, NEXT.js, FASTAPI, Docker, Git, Mino(local development), Keyob, boto3, AWS policy, Vercel.
- Used provided ingress.

- can locally run with commands

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### env file needed
- .env file format 

```
S3_BUCKET=
S3_ENDPOINT=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=
NEXT_PUBLIC_BASE_URL=
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Front-end Deployed on Vercel

- [Clone-app](https://dropbox-clone-git-main-rajmachawals-projects.vercel.app/)
- handled CORS with server
- upload any file to the bucket (AWS S3)
- Has a limit to file Size (as using free-tier)

## backend deployed on Koyeb

- [backend-app](https://glad-corrina-qpiai-7bb99841.koyeb.app/)
- [Git-repo](https://github.com/hal01001k/dropbox-server)

### env file used in server

```
S3_BUCKET=
S3_ENDPOINT=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=
```

### Simple FastAPI app with acces to AWS S3
- used DockerFile to genrate docker
- requires acces to AWS S3
