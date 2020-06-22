# Get started

```bash
npm install -g cnpm
cnpm install -g cross-env
cnpm install

cross-env \
ALI_SDK_STS_ID={your sts accessKeyId} \
ALI_SDK_STS_SECRET={your sts accessKeySecret} \
ALI_SDK_STS_ROLE={your rolearn} \
ALI_OSS_ENDPOINT={your region}.aliyuncs.com \
ALI_OSS_BUCKET={your bucket} \
node server/server.js
```
