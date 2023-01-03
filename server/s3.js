const { PutObjectCommand, GetObjectCommand, ListObjectsV2Command, S3Client } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4 } = require('uuid');

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET
  }
});
const BUCKET = process.env.BUCKET;

exports.uploadToS3 = async ({file, post_id}) => {
  const key = `${post_id}/${v4()}`
  
  const command = new PutObjectCommand({
    Bucket: BUCKET, 
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  })

  try {
    const response = await s3.send(command);
    return { key };
  } catch (error) {
    return { error };
  }
}

const getImageKeysByPost = async(post_id) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: post_id
  });
  const { Contents = [] } = await s3.send(command);
  return Contents.map(image => image.Key);
}

exports.getPostPresignedUrls = async (post_id) => {
  try {
    const imageKeys = await getImageKeysByPost(post_id);

    const presignedUrls = await Promise.all(
      imageKeys.map(key => {
        const command = new GetObjectCommand({
          Bucket: BUCKET, 
          Key: key,
        })
        return getSignedUrl(s3, command, { expiresIn:900 });
      })
    );

    const urlObjs = [];
    for (let i = 0; i < imageKeys.length; i++) {
      urlObjs.push({
        key: imageKeys[i],
        url: presignedUrls[i]
      })
    } 

    return { urlObjs };

  } catch (error) {
    console.log(error);
    return { error };
  }
}