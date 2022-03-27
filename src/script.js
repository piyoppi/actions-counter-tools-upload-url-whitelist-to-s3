import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { SitemapToUrlList, LocalSitemapRequestor } from '@piyoppi/counter-tools-url-whitelist-sitemap'

export const run = async (filename, sitemapBaseUrl, sitemapBasePath, bucket, key) => {
  const sitemapEntryUrl = filename.replace(sitemapBasePath, sitemapBaseUrl)
  const sitemapToUrlList = new SitemapToUrlList(sitemapEntryUrl, new LocalSitemapRequestor(sitemapBaseUrl, sitemapBasePath))
  await sitemapToUrlList.fetch(sitemapEntryUrl)

  await new S3Client().send(
    new PutObjectCommand({Bucket: bucket, Key: key, Body: JSON.stringify(sitemapToUrlList.urls)})
  )
}
