# actions-upload-url-whitelist-to-s3

For [@piyoppi/counter-tools](https://github.com/piyoppi/counter-tools), generate a list of allowed URLs from the sitemap and upload it to S3.

## Inputs

| name | details |
| --- | --- |
| sitemap_filename | Sitemap entry filename (ex: /path/to/public/sitemap/sitemap-index.xml) |
| sitemap_basepath | The basepath of sitemap (ex: /path/to/public/sitemap/) |
| sitemap_baseurl | The baseurl of sitemap (ex: https://example.com/sitemap/) |
| s3_bucket_name | Target S3 bucket |
| output_urllist_filename | Output object name (default: urllist) |

## Examples

AWS credentials must be set using [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials).

```yml
name: Update counter urls

on:
  push:
    branches:
      - master

jobs:
  update-counter-urls:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: actions/setup-node@v3
        with:
          node-version: '16.x'

      - uses: actions/cache@v2
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

      - name: Install dependencies
        run: npm install

      - name: Build pages and sitemaps
        run: npm run build

      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-1

      - uses: piyoppi/actions-counter-tools-upload-url-whitelist-to-s3@main
        with:
          sitemap_filename: ${{ github.workspace }}/public/sitemap/sitemap-index.xml
          sitemap_baseurl: https://example.com/sitemap/
          sitemap_basepath: ${{ github.workspace }}/public/sitemap/
          s3_bucket_name: ${{ secrets.S3_BUCKET_NAME }}
```

## License

The scripts in the /src directory and documents of this project are released under the MIT License.

The artifacts in the /dist directory created by this project contain third party material. For licensing and other copyright information, see dist/licenses.txt.
