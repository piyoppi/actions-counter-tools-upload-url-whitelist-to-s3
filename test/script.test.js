jest.mock('@aws-sdk/client-s3')

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { run } from '../src/script.js'

describe('run', () => {
  test('Should call PutObjectCommand', async () => {
    const baseDir = __dirname
    const expectedUrlList = [
      'https://localhost/posts/1',
      'https://localhost/posts/2',
      'https://localhost/posts/3',
      'https://localhost/posts/4'
    ]
    await run(`${baseDir}/files/sitemap.xml`, 'https://localhost/sitemap/', `${baseDir}/files/`, 'bucket-name', 'urllist')

    expect(PutObjectCommand).toHaveBeenCalledWith({Bucket: 'bucket-name', Key: 'urllist', Body: JSON.stringify(expectedUrlList)})
  })
})
