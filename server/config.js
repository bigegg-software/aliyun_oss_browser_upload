const env = process.env;
module.exports = {
    AccessKeyId: env.ALI_SDK_STS_ID,
    AccessKeySecret: env.ALI_SDK_STS_SECRET,
    RoleArn: env.ALI_SDK_STS_ROLE,
    EndPoint: env.ALI_OSS_ENDPOINT,
    Bucket: env.ALI_OSS_BUCKET,
    // 建议 Token 失效时间为 1 小时
    TokenExpireTime: '3600',
    PolicyFile: 'policy/all_policy.txt'
};
