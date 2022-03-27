import { run } from './script.js'
import core from '@actions/core'

const filename = core.getInput('sitemap_filename')
const sitemapBaseUrl = core.getInput('sitemap_baseurl')
const sitemapBasePath = core.getInput('sitemap_basepath')
const bucket = core.getInput('s3_bucket_name')
const key = core.getInput('output_urllist_filename')

run(filename, sitemapBaseUrl, sitemapBasePath, bucket, key)
