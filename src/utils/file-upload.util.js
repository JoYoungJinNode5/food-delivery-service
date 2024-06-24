import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { AWS_BUCKET_NAME, AWS_REGION, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY } from '../constants/file.constant.js';
import { isEmpty } from './common.util.js';

export const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
  },
});

/**
 * getS3Key - s3 url에서 s3 key(폴더/파일.확장자) 추출
 * @param {string} s3Url
 */
const getS3Key = (s3Url) => {
  const url = new URL(s3Url);

  const host = url.hostname;
  const path = url.pathname;

  /*
    가상호스팅 방식
    ex) https://[bucket name].s3-[aws-region].amazonaws.com/[s3key]

    경로 방식 
    ex) https://s3.[aws-region].amazonaws.com/[bucket name]/[s3key]
  */
  let s3Key;
  if (host.startsWith('s3')) {
    //경로 방식 URL
    s3Key = path.split('/').slice(2).join('/');
  } else {
    //가상호스팅 방식
    s3Key = path.substring(1);
  }

  return s3Key;
};

/**
 * deleteS3Objects - s3 객체 삭제
 * @param {Array} imageUrls 삭제할 이미지 주소 배열
 */
export const deleteS3Objects = async (imageUrls) => {
  if (isEmpty(imageUrls)) return;

  imageUrls = imageUrls.map((image) => {
    const key = getS3Key(image.imageUrl);
    return { Key: key };
  });

  const command = new DeleteObjectsCommand({
    Bucket: AWS_BUCKET_NAME,
    Delete: {
      Objects: imageUrls,
    },
  });

  try {
    const { Deleted } = await s3Client.send(command);
    console.log(`Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`);
  } catch (err) {
    console.error(err);
  }
};
